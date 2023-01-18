/**
 * Copyright © 2021 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package @multisafepay/multisafepay-payment-integration
 * @link https://github.com/MultiSafepay/pwastudio-multisafepay-payment-integration
 *
 */
const moduleOverrideWebpackPlugin = require('./moduleOverrideWebpackPlugin');
const componentOverrideMapping = require('./componentOverrideMapping');

module.exports = targets => {
    const peregrineTargets = targets.of('@magento/peregrine');
    const veniaTargets = targets.of('@magento/venia-ui');
    const buildpackTargets = targets.of('@magento/pwa-buildpack');
    const talonsTarget = peregrineTargets.talons;
    const paymentMethods = [
        'multisafepay',
        'multisafepay_visa',
        'multisafepay_mastercard',
        'multisafepay_cbc',
        'multisafepay_ideal',
        'multisafepay_afterpay',
        'multisafepay_in3',
        'multisafepay_klarna',
        'multisafepay_bancontact',
        'multisafepay_amex',
        'multisafepay_applepay',
        'multisafepay_belfius',
        'multisafepay_creditcard',
        'multisafepay_dotpay',
        'multisafepay_eps',
        'multisafepay_giropay',
        'multisafepay_idealqr',
        'multisafepay_maestro',
        'multisafepay_paysafecard',
        'multisafepay_sofort',
        'multisafepay_trustpay',
        'multisafepay_alipay',
        'multisafepay_santander',
        'multisafepay_banktransfer',
        'multisafepay_inghomepay',
        'multisafepay_kbc',
        'multisafepay_paypal',
        'multisafepay_trustly',
        'multisafepay_genericgateway_1',
        'multisafepay_genericgateway_2',
        'multisafepay_genericgateway_3',
        'multisafepay_googlepay'
    ];

    const giftcardMethods = [
        'multisafepay_babygiftcard',
        'multisafepay_beautyandwellness',
        'multisafepay_boekenbon',
        'multisafepay_fashioncheque',
        'multisafepay_fashiongiftcard',
        'multisafepay_fietsenbon',
        'multisafepay_gezondheidsbon',
        'multisafepay_givacard',
        'multisafepay_good4fun',
        'multisafepay_goodcard',
        'multisafepay_nationaletuinbon',
        'multisafepay_parfumcadeaukaart',
        'multisafepay_podiumcadeaukaart',
        'multisafepay_sportenfit',
        'multisafepay_vvvcadeaukaart',
        'multisafepay_webshopgiftcard',
        'multisafepay_wellnessgiftcard',
        'multisafepay_wijncadeau',
        'multisafepay_winkelcheque',
        'multisafepay_yourgift',
        'multisafepay_genericgateway_4',
        'multisafepay_genericgateway_5',
        'multisafepay_genericgateway_6'
    ];

    targets.of('@magento/pwa-buildpack').specialFeatures.tap(flags => {
        flags[targets.name] = {
            esModules: true,
            cssModules: true,
            graphqlQueries: true,
            i18n: true
        };
    });

    veniaTargets.routes.tap(routesArray => {
        routesArray.push({
            name: 'Checkout Success Page',
            pattern:
                '/multisafepay/checkout/success/:order?/maskedId/:maskedId?',
            path:
                '@multisafepay/multisafepay-payment-integration/src/components/successPage'
        });

        return routesArray;
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
    });

    const gatewaysPath =
            '@multisafepay/multisafepay-payment-integration/src/components/gateways/',
        giftcardsPath =
            '@multisafepay/multisafepay-payment-integration/src/components/giftcards/';

    paymentMethods.map(method =>
        veniaTargets.checkoutPagePaymentTypes.tap(checkoutPagePaymentTypes =>
            checkoutPagePaymentTypes.add({
                paymentCode: method,
                importPath: gatewaysPath + method
            })
        )
    );

    giftcardMethods.map(method =>
        veniaTargets.checkoutPagePaymentTypes.tap(checkoutPagePaymentTypes =>
            checkoutPagePaymentTypes.add({
                paymentCode: method,
                importPath: giftcardsPath + method
            })
        )
    );

    buildpackTargets.webpackCompiler.tap(compiler => {
        new moduleOverrideWebpackPlugin(componentOverrideMapping).apply(
            compiler
        );
    });
};
