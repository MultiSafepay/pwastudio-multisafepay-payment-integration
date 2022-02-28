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

import {useIdealPayment} from '../../talons/useIdealPayment';
import defaultClasses from '../basePaymentComponent/basePayment.css';
import {FormattedMessage} from 'react-intl';
import Select from '@magento/venia-ui/lib/components/Select';

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const IdealPayment = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const {
        resetShouldSubmit,
        onPaymentSuccess,
        onPaymentError,
        currentSelectedPaymentMethod,
        paymentIssuers
    } = props;

    const issuers = [];

    const {
        onBillingAddressChangedError,
        onBillingAddressChangedSuccess,
        handleIssuerSelection
    } = useIdealPayment({
        resetShouldSubmit,
        onPaymentSuccess,
        onPaymentError,
        currentSelectedPaymentMethod
    });

    paymentIssuers.map((issuer, index) => (
        issuers.push({
            label: issuer.description,
            value: issuer.code,
            key: issuer.code + index
        })
    ));

    return (
        <div className={classes.root}>
            <Select
                field="multisafepayIdealIssuer"
                items={issuers}
                onValueChange={handleIssuerSelection}
            />
            <p className={classes.note}>
                <FormattedMessage
                    id={'multiSafepayPayment.note'}
                    defaultMessage={'Note: You will be redirected to the payment page.'}
                />
            </p>
            <BillingAddress
                resetShouldSubmit={resetShouldSubmit}
                shouldSubmit={props.shouldSubmit}
                onBillingAddressChangedError={onBillingAddressChangedError}
                onBillingAddressChangedSuccess={onBillingAddressChangedSuccess}
            />
        </div>
    );
};

IdealPayment.propTypes = {
    classes: shape({root: string}),
    shouldSubmit: bool.isRequired,
    onPaymentSuccess: func,
    onPaymentError: func,
    resetShouldSubmit: func.isRequired
};

export default IdealPayment;
