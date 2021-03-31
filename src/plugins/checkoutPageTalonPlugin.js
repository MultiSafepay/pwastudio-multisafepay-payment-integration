/**
 * Copyright © 2021 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package @multisafepay/multisafepay-payment-integration
 * @link https://github.com/MultiSafepay/pwastudio-multisafepay-payment-integration
 *
 */
import React, {useCallback, useEffect, useState} from 'react';
import {AlertCircle as AlertCircleIcon} from 'react-feather';

import {useCartContext} from '@magento/peregrine/lib/context/cart';
import MULTISAFEPAY_OPERATIONS from '../talons/checkoutPageOrderPlace.gql.js';
import DEFAULT_OPERATIONS from '@magento/peregrine/lib/talons/CheckoutPage/checkoutPage.gql.js';
import {useToasts} from '@magento/peregrine';

import {
    useApolloClient,
    useLazyQuery,
    useMutation
} from '@apollo/client';

import {clearCartDataFromCache} from "@magento/peregrine/lib/Apollo/clearCartDataFromCache";
import {CHECKOUT_STEP} from "@magento/peregrine/lib/talons/CheckoutPage/useCheckoutPage";
import mergeOperations from "@magento/peregrine/lib/util/shallowMerge";
import Icon from "@magento/venia-ui/lib/components/Icon";

const wrapUseCheckoutPage = (original) => {
    return function useCheckoutPage(...args) {
        const operations = mergeOperations(DEFAULT_OPERATIONS, MULTISAFEPAY_OPERATIONS);
        const result = original(...args);
        const errorIcon = <Icon src={AlertCircleIcon} size={20}/>;

        const {
            activeContent,
            availablePaymentMethods,
            cartItems,
            checkoutStep,
            customer,
            error,
            hasError,
            isCartEmpty,
            isGuestCheckout,
            isLoading,
            isUpdating,
            setCheckoutStep,
            setIsUpdating,
            setShippingInformationDone,
            setShippingMethodDone,
            setPaymentInformationDone,
            resetReviewOrderButtonClicked,
            handleReviewOrder,
            reviewOrderButtonClicked,
            toggleAddressBookContent,
            toggleSignInContent
        } = result;

        const {
            createCartMutation,
            getOrderDetailsQuery,
            restoreQuoteMutation,
            placeMultisafepayOrderMutation
        } = operations;

        const [, {addToast}] = useToasts();

        const [{cartId}, {createCart, removeCart}] = useCartContext();
        const apolloClient = useApolloClient();
        const [fetchCartId] = useMutation(createCartMutation);

        let [
            placeOrder,
            {
                data: placeOrderData,
                error: placeOrderError,
                loading: placeOrderLoading,
                called: placeOrderCalled
            }
        ] = useMutation(placeMultisafepayOrderMutation);

        const [orderButtonPress, setOrderButtonPress] = useState();

        const [
            restoreQuote,
            {
                data: restoreQuoteData,
                error: restoreQuoteError,
                loading: restoreQuoteLoading,
                called: restoreQuoteCalled
            }
        ] = useMutation(restoreQuoteMutation);

        let [
            getOrderDetails,
            {
                data: orderDetailsData,
                loading: orderDetailsLoading
            }
        ] = useLazyQuery(getOrderDetailsQuery, {
            fetchPolicy: 'no-cache'
        });

        const handlePlaceOrder = useCallback(async () => {
            setOrderButtonPress(true);
            getOrderDetails({
                variables: {
                    cartId
                }
            });
        }, [cartId, getOrderDetails, setOrderButtonPress]);

        useEffect(() => {
            async function placeOrderAndCleanup() {
                try {
                    setOrderButtonPress(false);
                    const result = await placeOrder({
                        variables: {
                            cartId
                        }
                    });

                    if (result) {
                        const orderData = result.data;
                        const orderMultisafepayUrlData =
                            (orderData && orderData.placeOrder.order.multisafepay_payment_url) || null;

                        if (orderMultisafepayUrlData
                            && (orderMultisafepayUrlData.payment_url || orderMultisafepayUrlData.error)
                        ) {
                            const {
                                error: paymentErrors,
                                payment_url: paymentRedirectUrl
                            } = orderMultisafepayUrlData;

                            if (!paymentErrors && paymentRedirectUrl !== '') {
                                await removeCart();
                                await clearCartDataFromCache(apolloClient);
                                await createCart({
                                    fetchCartId
                                });

                                return window.location = paymentRedirectUrl;
                            } else {
                                if (paymentErrors) {
                                    const restoredQuoteData = await restoreQuote({
                                        variables: {
                                            cartId
                                        }
                                    });

                                    if (restoredQuoteData) {
                                        addToast({
                                            type: 'error',
                                            icon: errorIcon,
                                            message: paymentErrors,
                                            dismissable: true,
                                            timeout: 7000
                                        });

                                        if (process.env.NODE_ENV !== 'production') {
                                            console.error(paymentErrors);
                                        }
                                        resetReviewOrderButtonClicked();
                                        setCheckoutStep(CHECKOUT_STEP.PAYMENT);
                                    }
                                }
                            }
                        } else {
                            await removeCart();
                            await clearCartDataFromCache(apolloClient);

                            await createCart({
                                fetchCartId
                            });
                        }
                    }
                } catch (err) {
                    console.error(
                        'An error occurred during when placing the order',
                        err
                    );
                    resetReviewOrderButtonClicked();
                    setCheckoutStep(CHECKOUT_STEP.PAYMENT);
                }
            }

            if (orderDetailsData && orderButtonPress) {
                placeOrderAndCleanup();
            }
        }, [
            apolloClient,
            cartId,
            createCart,
            fetchCartId,
            orderDetailsData,
            placeOrder,
            placeOrderCalled,
            removeCart,
            orderButtonPress,
            setOrderButtonPress,
            placeOrderData,
            addToast,
            errorIcon,
            resetReviewOrderButtonClicked,
            setCheckoutStep
        ]);

        const orderMultisafepayUrlData =
            (placeOrderData && placeOrderData.placeOrder.order.multisafepay_payment_url) || null;

        if (orderMultisafepayUrlData && (orderMultisafepayUrlData.payment_url || orderMultisafepayUrlData.error)) {
            return restoreQuoteData && !restoreQuoteLoading ?
                Object.assign({}, result, {isLoading: false, orderNumber: null, handlePlaceOrder: handlePlaceOrder})
                : Object.assign({}, result, {isLoading: true, orderNumber: null, handlePlaceOrder: handlePlaceOrder});
        }

        return {
            activeContent,
            availablePaymentMethods,
            cartItems,
            checkoutStep,
            customer,
            error,
            handlePlaceOrder,
            hasError,
            isCartEmpty,
            isGuestCheckout,
            isLoading,
            isUpdating,
            orderDetailsData,
            orderDetailsLoading,
            orderNumber:
                (placeOrderData && placeOrderData.placeOrder.order.order_number) ||
                null,
            placeOrderLoading,
            setCheckoutStep,
            setIsUpdating,
            setShippingInformationDone,
            setShippingMethodDone,
            setPaymentInformationDone,
            resetReviewOrderButtonClicked,
            handleReviewOrder,
            reviewOrderButtonClicked,
            toggleAddressBookContent,
            toggleSignInContent
        };
    }
}

export default wrapUseCheckoutPage;
