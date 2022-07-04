/**
 * Copyright © 2021 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package @multisafepay/multisafepay-payment-integration
 * @link https://github.com/MultiSafepay/pwastudio-multisafepay-payment-integration
 *
 */
import {useCallback, useEffect, useState} from 'react';
import {useMutation} from '@apollo/client';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import {useCartContext} from '@magento/peregrine/lib/context/cart';

import DEFAULT_OPERATIONS from './basePayment.gql';

/**
 *
 * @param props
 * @returns {{onBillingAddressChangedError: (function(): void), onBillingAddressChangedSuccess: (function(): void), handleIssuerSelection: (function(*=): void)}}
 */

const DEFAULT_ISSUER = '0761';

export const useIdealPayment = props => {
    const defaultIssuer = props.defaultIssuer || DEFAULT_ISSUER;
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);

    const {
        setIdealPaymentMethodOnCartMutation
    } = operations;

    const [{cartId}] = useCartContext();
    const {currentSelectedPaymentMethod: selectedMethod} = props;
    const [issuer, setIssuer] = useState(defaultIssuer);

    const {resetShouldSubmit, onPaymentSuccess, onPaymentError} = props;

    const [
        updatePaymentMethod,
        {
            error: paymentMethodMutationError,
            called: paymentMethodMutationCalled,
            loading: paymentMethodMutationLoading
        }
    ] = useMutation(setIdealPaymentMethodOnCartMutation);

    /**
     * This function will be called if cant not set address.
     */
    const onBillingAddressChangedError = useCallback(() => {
        resetShouldSubmit();
    }, [resetShouldSubmit]);

    const handleIssuerSelection = useCallback(
        value => {
            setIssuer(value);
        },
        [setIssuer]
    );

    /**
     * This function will be called if address was successfully set.
     */
    const onBillingAddressChangedSuccess = useCallback(() => {
        updatePaymentMethod({
            variables: {cartId, selectedMethod, issuer}
        });
    }, [updatePaymentMethod, cartId, selectedMethod, issuer]);

    useEffect(() => {
        const paymentMethodMutationCompleted =
            paymentMethodMutationCalled && !paymentMethodMutationLoading;

        if (paymentMethodMutationCompleted && !paymentMethodMutationError) {
            onPaymentSuccess();
        }

        if (paymentMethodMutationCompleted && paymentMethodMutationError) {
            onPaymentError();
        }
    }, [
        paymentMethodMutationError,
        paymentMethodMutationLoading,
        paymentMethodMutationCalled,
        onPaymentSuccess,
        onPaymentError,
        resetShouldSubmit
    ]);

    return {
        onBillingAddressChangedError,
        onBillingAddressChangedSuccess,
        handleIssuerSelection,
        issuer
    };
};
