/**
 * Copyright © 2021 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package @multisafepay/multisafepay-payment-integration
 * @link https://github.com/MultiSafepay/pwastudio-multisafepay-payment-integration
 *
 */
module.exports = componentOverride = {
    [`@magento/venia-ui/lib/components/CheckoutPage/PaymentInformation/paymentMethods.js`]:
        '@multisafepay/multisafepay-payment-integration/src/override/CheckoutPage/PaymentInformation/paymentMethods.js',
    [`@magento/peregrine/lib/talons/CheckoutPage/PaymentInformation/usePaymentMethods.js`]:
        '@multisafepay/multisafepay-payment-integration/src/override/CheckoutPage/PaymentInformation/usePaymentMethods.js',
};
