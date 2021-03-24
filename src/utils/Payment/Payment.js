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
    if (paymentCode
        && (paymentCode.includes('multisafepay_') || paymentCode === 'multisafepay')
    ) {
        return true;
    }

    return false;
};

/**
 * @param {String} paymentCode
 */
export const isMultisafepayRecurringPayment = (paymentCode) => {
    if (paymentCode
        && paymentCode.includes('multisafepay_')
        && (paymentCode.includes('_recurring') || paymentCode.includes('_vault'))
    ) {
        return true;
    }

    return false;
};
