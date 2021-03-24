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
export const useAfterpayIn3Payment = props => {
    const defaultGender = 'mr';
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);

    const {
        setAfterpayPaymentMethodOnCartMutation,
        setIn3PaymentMethodOnCartMutation
    } = operations;

    const [{cartId}] = useCartContext();
    const {currentSelectedPaymentMethod: selectedMethod} = props;
    const [gender, setGender] = useState(defaultGender);
    const [dateOfBirth, setDateOfBirth] = useState(null);

    const {resetShouldSubmit, onPaymentSuccess, onPaymentError} = props;
    const [
        updatePaymentMethod,
        {
            error: paymentMethodMutationError,
            called: paymentMethodMutationCalled,
            loading: paymentMethodMutationLoading
        }
    ] = useMutation(
        selectedMethod === 'multisafepay_afterpay'
            ? setAfterpayPaymentMethodOnCartMutation : setIn3PaymentMethodOnCartMutation);

    /**
     * This function will be called if cant not set address.
     */
    const onBillingAddressChangedError = useCallback(() => {
        resetShouldSubmit();
    }, [resetShouldSubmit]);

    const handleGenderSelection = useCallback(
        value => {
            setGender(value);
        },
        [cartId, setGender]
    );

    const handleDobInputChange = useCallback(
        value => {
            setDateOfBirth(value);
        },
        [cartId, setDateOfBirth]
    );

    /**
     * This function will be called if address was successfully set.
     */
    const onBillingAddressChangedSuccess = useCallback(() => {
        updatePaymentMethod({
            variables: {cartId, selectedMethod, gender, dateOfBirth}
        });
    }, [updatePaymentMethod, cartId, dateOfBirth, gender]);

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
        handleGenderSelection,
        handleDobInputChange
    };
};
