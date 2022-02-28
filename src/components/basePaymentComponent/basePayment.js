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

import {useBasePayment} from '../../talons/useBasePayment';
import defaultClasses from './basePayment.css';
import {FormattedMessage} from 'react-intl';

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const BasePayment = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const {
        resetShouldSubmit,
        onPaymentSuccess,
        onPaymentError,
        currentSelectedPaymentMethod
    } = props;

    const {
        onBillingAddressChangedError,
        onBillingAddressChangedSuccess
    } = useBasePayment({
        resetShouldSubmit,
        onPaymentSuccess,
        onPaymentError,
        currentSelectedPaymentMethod
    });

    return (
        <div className={classes.root}>
            <p className={classes.note}>
                <FormattedMessage
                    id={'multiSafepayPayment.note'}
                    defaultMessage={'Note: You will be redirected to the payment page.'}
                />
            </p>
            <BillingAddress
                shouldSubmit={props.shouldSubmit}
                resetShouldSubmit={resetShouldSubmit}
                onBillingAddressChangedError={onBillingAddressChangedError}
                onBillingAddressChangedSuccess={onBillingAddressChangedSuccess}
            />
        </div>
    );
};

BasePayment.propTypes = {
    classes: shape({root: string}),
    shouldSubmit: bool.isRequired,
    onPaymentSuccess: func,
    onPaymentError: func,
    resetShouldSubmit: func.isRequired
};

export default BasePayment;
