/**
 * Copyright © 2021 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package @multisafepay/multisafepay-payment-integration
 * @link https://github.com/MultiSafepay/pwastudio-multisafepay-payment-integration
 *
 */
import React from 'react';
import {mergeClasses} from '@magento/venia-ui/lib/classify';
import {shape, string, bool, func} from 'prop-types';
import BillingAddress from '@magento/venia-ui/lib/components/CheckoutPage/BillingAddress';

import {useAfterpayIn3Payment} from '../../talons/useAfterpayIn3Payment';
import defaultClasses from '../basePaymentComponent/basePayment.css';
import {FormattedMessage, useIntl} from 'react-intl';
import Select from '@magento/venia-ui/lib/components/Select';
import Label from "@magento/venia-ui/lib/components/Checkout/label";
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import {hasLengthAtLeast, isRequired} from "@magento/venia-ui/lib/util/formValidators";
import {validateDateOfBirth} from "../../utils/paymentFormValidator";
import combine from "@magento/venia-ui/lib/util/combineValidators";

const AfterpayIn3Payment = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {formatMessage} = useIntl();
    const genders = [
        {
            "value": "mr",
            "label": "Mr.",
        },
        {
            "value": "mrs",
            "label": "Mrs."
        }
    ];

    const {
        resetShouldSubmit,
        onPaymentSuccess,
        onPaymentError,
        currentSelectedPaymentMethod
    } = props;

    if (currentSelectedPaymentMethod === 'multisafepay_afterpay') {
        genders.push({
            value: "miss",
            label: 'Miss',
        })
    }

    const {
        onBillingAddressChangedError,
        onBillingAddressChangedSuccess,
        handleGenderSelection,
        handleDobInputChange
    } = useAfterpayIn3Payment({
        resetShouldSubmit,
        onPaymentSuccess,
        onPaymentError,
        currentSelectedPaymentMethod
    });

    const genderSelectLabel = 'Gender';
    const dobInputLabel = 'Date of Birth';

    return (
        <div className={classes.root}>
            <Label htmlFor={classes.multisafepayAfterpayIn3Gender}>
                {genderSelectLabel}
            </Label>
            <Select
                field="multisafepayAfterpayIn3Gender"
                items={genders}
                onValueChange={handleGenderSelection}
            />

            <Label htmlFor={classes.multisafepayAfterpayIn3Dob}>
                {dobInputLabel}
            </Label>
            <TextInput
                field="multisafepayAfterpayIn3Dob"
                validate={combine([
                    isRequired,
                    [hasLengthAtLeast, 8],
                    validateDateOfBirth
                ])}
                placeholder={formatMessage({
                    id: 'multisafepayAfterpayIn3Dob.enterDob',
                    defaultMessage: 'dd-mm-yyyy'
                })}
                onValueChange={handleDobInputChange}
            />
            <p className={classes.note}>
                <FormattedMessage
                    id={'multiSafepayPayment.note'}
                    defaultMessage={
                        'Note: You will be redirected to the payment page.'
                    }
                />
            </p>
            <BillingAddress
                shouldSubmit={props.shouldSubmit}
                onBillingAddressChangedError={onBillingAddressChangedError}
                onBillingAddressChangedSuccess={onBillingAddressChangedSuccess}
            />
        </div>
    );
};

AfterpayIn3Payment.propTypes = {
    classes: shape({root: string}),
    shouldSubmit: bool.isRequired,
    onPaymentSuccess: func,
    onPaymentError: func,
    resetShouldSubmit: func.isRequired
};

export default AfterpayIn3Payment;
