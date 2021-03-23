import { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { useCartContext } from '@magento/peregrine/lib/context/cart';

import DEFAULT_OPERATIONS from './basePayment.gql';

/**
 *
 * @param props
 * @returns {{onBillingAddressChangedError: (function(): void), onBillingAddressChangedSuccess: (function(): void), handleIssuerSelection: (function(*=): void)}}
 */
export const useIdealPayment = props => {
    const defaultIssuer = '3151';
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);

    const {
        setIdealPaymentMethodOnCartMutation
    } = operations;

    const [{ cartId }] = useCartContext();
    const { currentSelectedPaymentMethod: selectedMethod  } = props;
    const [issuer, setIssuer] = useState(defaultIssuer);

    const { resetShouldSubmit, onPaymentSuccess, onPaymentError } = props;

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
        [cartId, setIssuer]
    );

    /**
     * This function will be called if address was successfully set.
     */
    const onBillingAddressChangedSuccess = useCallback(() => {
        updatePaymentMethod({
            variables: { cartId, selectedMethod, issuer }
        });
    }, [updatePaymentMethod, cartId, issuer]);

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
        handleIssuerSelection
    };
};
