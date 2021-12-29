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
import {shape, string, bool, func} from 'prop-types';
import {RadioGroup} from 'informed';
import {useIntl} from 'react-intl';
import {usePaymentMethods} from '@magento/peregrine/lib/talons/CheckoutPage/PaymentInformation/usePaymentMethods';
import {useStyle} from '@magento/venia-ui/lib/classify';
import {isMultisafepayPayment} from '../../../utils/Payment';
import Radio from '@magento/venia-ui/lib/components/RadioGroup/radio';
import paymentMethodOperations from './paymentMethods.gql';
import defaultClasses from '@magento/venia-ui/lib/components/CheckoutPage/PaymentInformation/paymentMethods.module.css';
import payments from '@magento/venia-ui/lib/components/CheckoutPage/PaymentInformation/paymentMethodCollection';
import Image from '@magento/venia-ui/lib/components/Image';

const PaymentMethods = props => {
    const {
        classes: propClasses,
        onPaymentError,
        onPaymentSuccess,
        resetShouldSubmit,
        shouldSubmit
    } = props;

    const {formatMessage} = useIntl();
    const classes = useStyle(defaultClasses, propClasses);

    const talonProps = usePaymentMethods({
        operations: paymentMethodOperations.queries
    });

    const {
        availablePaymentMethods,
        currentSelectedPaymentMethod,
        initialSelectedMethod,
        isLoading
    } = talonProps;

    let multisafepayPreselectedMethod = null;

    if (isLoading) {
        return null;
    }

    const radios = availablePaymentMethods
        .map(({code, title}, index) => {
            // If we don't have an implementation for a method type, ignore it.
            if (!Object.keys(payments).includes(code)) {
                return;
            }

            const multisafepayPaymentAdditionalData = availablePaymentMethods[index].multisafepay_additional_data || {};

            if (isMultisafepayPayment(code) && multisafepayPaymentAdditionalData.is_preselected) {
                multisafepayPreselectedMethod = code;
            }

            const id = `paymentMethod--${code}`;
            const isSelected = currentSelectedPaymentMethod === code;
            const PaymentMethodComponent = payments[code];

            const paymentComponent = isMultisafepayPayment(code) ? (
                <PaymentMethodComponent
                    onPaymentSuccess={onPaymentSuccess}
                    onPaymentError={onPaymentError}
                    resetShouldSubmit={resetShouldSubmit}
                    shouldSubmit={shouldSubmit}
                    currentSelectedPaymentMethod={currentSelectedPaymentMethod}
                    paymentIssuers={availablePaymentMethods[index].multisafepay_available_issuers}
                />
            ) : (
                <PaymentMethodComponent
                    onPaymentSuccess={onPaymentSuccess}
                    onPaymentError={onPaymentError}
                    resetShouldSubmit={resetShouldSubmit}
                    shouldSubmit={shouldSubmit}
                />
            )

            const renderedComponent = isSelected ? paymentComponent : null;
            const {image: imageSrc} = multisafepayPaymentAdditionalData;

            return isMultisafepayPayment(code) && imageSrc ? (
                <div key={id} className={classes.payment_method}>
                    <Image
                        alt={title}
                        classes={{image: classes.image}}
                        src={imageSrc}
                        width={'50px'}
                        height={'auto'}
                    />
                    <Radio
                        id={id}
                        label={title}
                        value={code}
                        classes={{
                            label: classes.radio_label
                        }}
                        checked={isSelected}
                    />
                    {renderedComponent}
                </div>
            ) : (
                <div key={id} className={classes.payment_method}>
                    <Radio
                        id={id}
                        label={title}
                        value={code}
                        classes={{
                            label: classes.radio_label
                        }}
                        checked={isSelected}
                    />
                    {renderedComponent}
                </div>
            );
        })
        .filter(paymentMethod => !!paymentMethod);

    const noPaymentMethodMessage = !radios.length ? (
        <div className={classes.payment_errors}>
            <span>
                {formatMessage({
                    id: 'checkoutPage.paymentLoadingError',
                    defaultMessage: 'There was an error loading payments.'
                })}
            </span>
            <span>
                {formatMessage({
                    id: 'checkoutPage.refreshOrTryAgainLater',
                    defaultMessage: 'Please refresh or try again later.'
                })}
            </span>
        </div>
    ) : null;

    return (
        <div className={classes.root}>
            <RadioGroup
                classes={{ root: classes.radio_group }}
                field="selectedPaymentMethod"
                initialValue={multisafepayPreselectedMethod ? multisafepayPreselectedMethod : initialSelectedMethod}
            >
                {radios}
            </RadioGroup>
            {noPaymentMethodMessage}
        </div>
    );
};

export default PaymentMethods;

PaymentMethods.propTypes = {
    classes: shape({
        root: string,
        payment_method: string,
        radio_label: string
    }),
    onPaymentSuccess: func,
    onPaymentError: func,
    resetShouldSubmit: func,
    selectedPaymentMethod: string,
    shouldSubmit: bool
};
