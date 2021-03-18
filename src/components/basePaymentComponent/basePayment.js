import React from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { shape, string, bool, func } from 'prop-types';
import BillingAddress from '@magento/venia-ui/lib/components/CheckoutPage/BillingAddress';

import { useBasePayment } from '../../talons/useBasePayment';
import defaultClasses from './basePayment.css';
import { FormattedMessage } from 'react-intl';

/**
 * The component renders all information to handle payment.
 *
 * @param {String} props.payableTo shop owner name where you need to send.
 * @param {Boolean} props.shouldSubmit boolean value which represents if a payment nonce request has been submitted
 * @param {Function} props.onPaymentSuccess callback to invoke when the a payment nonce has been generated
 * @param {Function} props.onDropinReady callback to invoke when the braintree dropin component is ready
 * @param {Function} props.onPaymentError callback to invoke when component throws an error
 * @param {Function} props.resetShouldSubmit callback to reset the shouldSubmit flag
 */
const BasePayment = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const {
        resetShouldSubmit,
        onPaymentSuccess,
        onPaymentError,
        currentSelectedPaymentMethod,
        paymentIssuers
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
                    defaultMessage={
                        'Note: Your will be redirected to the payment page.'
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

BasePayment.propTypes = {
    classes: shape({ root: string }),
    payableTo: string,
    shouldSubmit: bool.isRequired,
    onPaymentSuccess: func,
    onDropinReady: func,
    onPaymentError: func,
    resetShouldSubmit: func.isRequired
};

export default BasePayment;
