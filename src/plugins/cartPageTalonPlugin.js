import React, {useEffect} from "react";
import {useLocation, useHistory} from 'react-router-dom';
import BrowserPersistence from '@magento/peregrine/lib/util/simplePersistence';
import MULTISAFEPAY_OPERATIONS from '../talons/checkoutPageOrderPlace.gql.js';
import {
    useMutation,
    useApolloClient
} from '@apollo/client';
import {useCartContext} from "@magento/peregrine/lib/context/cart";
import {clearCartDataFromCache} from "@magento/peregrine/lib/Apollo/clearCartDataFromCache";
import Icon from "@magento/venia-ui/lib/components/Icon";
import {useToasts} from "@magento/peregrine";
import {AlertCircle as AlertCircleIcon} from 'react-feather';

const wrapUseCartPage = (original) => {
    return function useCartPage(...args) {
        const location = useLocation();
        const history = useHistory();
        const params = new URLSearchParams(location.search);
        const result = original(...args);
        const storage = new BrowserPersistence();
        const errorIcon = <Icon src={AlertCircleIcon} size={20}/>;

        const {setIsCartUpdating} = result;

        const {
            restoreQuoteMutation
        } = MULTISAFEPAY_OPERATIONS;

        const [
            restoreQuote,
            {
                data: restoreQuoteData,
                error: restoreQuoteError,
                loading: restoreQuoteLoading,
                called: restoreQuoteCalled
            }
        ] = useMutation(restoreQuoteMutation);

        if (params.get('multisafepayRestore') && params.get('maskedId')) {
            const restoreCartId = params.get('maskedId');
            const restoredCartId = storage.getItem('restoredCart');
            const [{cartId} , {createCart, clearCartId, saveCartId}] = useCartContext();
            const [, {addToast}] = useToasts();
            const apolloClient = useApolloClient();

            useEffect(() => {
                async function restoreQuoteProcess() {
                    try {
                        await createCart({
                            restoreCartId
                        });

                        const restoredQuoteResult = await restoreQuote({
                            variables: {
                                cartId: restoreCartId
                            }
                        });

                        if (restoredQuoteResult) {
                            const {restoreQuote} = restoredQuoteResult.data;
                            storage.setItem('cartId', restoreQuote);
                            storage.setItem('restoredCart', restoreQuote);
                        }
                    } catch (err) {
                        console.error(
                            'An error occurred during when placing the order',
                            err
                        );

                        addToast({
                            type: 'error',
                            icon: errorIcon,
                            message: err.message,
                            dismissable: true,
                            timeout: 5000
                        });
                    }
                }

                if (restoreCartId !== restoredCartId && !restoreQuoteCalled) {
                    restoreQuoteProcess();
                }
            }, [
                apolloClient,
                restoreCartId,
                restoredCartId,
                restoreQuoteCalled,
                createCart,
                clearCartId,
                saveCartId
            ]);

            if (restoreCartId !== restoredCartId && !restoreQuoteData) {
                return {
                    cartItems: [],
                    hasItems: false,
                    isCartUpdating: true,
                    setIsCartUpdating,
                    shouldShowLoadingIndicator: true
                };
            }
        }

        return result;
    }
}

export default wrapUseCartPage;
