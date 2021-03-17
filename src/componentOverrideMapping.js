/**
 * Mappings for overwrites
 * example: [`@magento/venia-ui/lib/components/Main/main.js`]: './lib/components/Main/main.js'
 */
module.exports = componentOverride = {
    [`@magento/venia-ui/lib/components/CheckoutPage/PaymentInformation/paymentMethods.js`]:
        '@multisafepay/multisafepay-payment-integration/src/override/CheckoutPage/PaymentInformation/paymentMethods.js'
};
