/**
 * Custom intercept file for the extension
 * By default you can only use target of @magento/pwa-buildpack.
 *
 * If do want extend @magento/peregrine or @magento/venia-ui
 * you should add them to peerDependencies to your package.json
 *
 * If you want to add overwrites for @magento/venia-ui components you can use
 * moduleOverrideWebpackPlugin and componentOverrideMapping
 */
const moduleOverrideWebpackPlugin = require('./moduleOverrideWebpackPlugin');
const componentOverrideMapping = require('./componentOverrideMapping')

module.exports = targets => {
    const peregrineTargets = targets.of('@magento/peregrine');
    const talonsTarget = peregrineTargets.talons;

    targets.of('@magento/pwa-buildpack').specialFeatures.tap(flags => {
        /**
         *  Wee need to activated esModules and cssModules to allow build pack to load our extension
         * {@link https://magento.github.io/pwa-studio/pwa-buildpack/reference/configure-webpack/#special-flags}.
         */
        flags[targets.name] = {esModules: true, cssModules: true, graphqlQueries: true};
    });

    talonsTarget.tap(talonWrapperConfig => {
        talonWrapperConfig.CheckoutPage.useCheckoutPage.wrapWith(
            '@multisafepay/multisafepay-payment-integration/src/plugins/checkoutPageTalonPlugin'
        );
    });

    talonsTarget.tap(talonWrapperConfig => {
        talonWrapperConfig.CartPage.useCartPage.wrapWith(
            '@multisafepay/multisafepay-payment-integration/src/plugins/cartPageTalonPlugin'
        );
    })

    const regularPaymentMethods = [
        'multisafepay',
        'multisafepay_visa',
        'multisafepay_mastercard',
        'multisafepay_cbc'
    ];

    const giftcardsPaymentMethods = [
        'multisafepay_babygiftcard'
    ];

    const gatewaysPath = '@multisafepay/multisafepay-payment-integration/src/components/gateways/',
        giftcardsPath = '@multisafepay/multisafepay-payment-integration/src/components/giftcards/';

    regularPaymentMethods.map((method) =>
        targets.of('@magento/venia-ui').checkoutPagePaymentTypes.tap(
            checkoutPagePaymentTypes => checkoutPagePaymentTypes.add({
                paymentCode: method,
                importPath: gatewaysPath + method
            }),
        )
    );

    giftcardsPaymentMethods.map((method) =>
        targets.of('@magento/venia-ui').checkoutPagePaymentTypes.tap(
            checkoutPagePaymentTypes => checkoutPagePaymentTypes.add({
                paymentCode: method,
                importPath: giftcardsPath + method
            }),
        )
    );

    targets.of('@magento/pwa-buildpack').webpackCompiler.tap(compiler => {
        new moduleOverrideWebpackPlugin(componentOverrideMapping).apply(compiler);
    })
};
