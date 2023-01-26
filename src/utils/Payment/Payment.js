/**
 * Copyright © 2021 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package @multisafepay/multisafepay-payment-integration
 * @link https://github.com/MultiSafepay/pwastudio-multisafepay-payment-integration
 *
 */

/**
 * @param {String} paymentCode
 */
export const isMultisafepayPayment = (paymentCode) => {
    return !!(paymentCode && (paymentCode.includes('multisafepay_') || paymentCode === 'multisafepay'));
};

/**
 * @param {String} paymentCode
 */
export const isMultisafepayRecurringPayment = (paymentCode) => {
    return paymentCode && paymentCode.includes('multisafepay_')
        && (paymentCode.includes('_recurring') || paymentCode.includes('_vault'));
};

/**
 * @param {String} paymentCode
 */
export const validatePaymentMethod = (paymentCode) => {
    switch (paymentCode) {
        case 'multisafepay_applepay':
            try {
                return !!(window.ApplePaySession && window.ApplePaySession.canMakePayments());
            } catch (e) {
                return false;
            }
        default:
            return true;
    }
};
