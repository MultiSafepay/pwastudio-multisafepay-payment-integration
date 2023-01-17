/**
 * Copyright © 2021 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package @multisafepay/multisafepay-payment-integration
 * @link https://github.com/MultiSafepay/pwastudio-multisafepay-payment-integration
 *
 */
import {gql} from '@apollo/client';

export const PLACE_ORDER = gql`
    mutation placeOrder($cartId: String!, $applicationName: String, $applicationVersion: String, $pluginVersion: String) {
        placeOrder(
            input: { cart_id: $cartId,  application_name: $applicationName, application_version: $applicationVersion, plugin_version: $pluginVersion }
        ) @connection(key: "placeOrder") {
            order {
                order_number
                multisafepay_payment_url {
                    payment_url
                    error
                }
            }
        }
    }
`;

export const RESTORE_QUOTE = gql`
    mutation restoreQuote($cartId: String!) {
        restoreQuote(input: { cart_id: $cartId })
    }
`;

export default {
    placeMultisafepayOrderMutation: PLACE_ORDER,
    restoreQuoteMutation: RESTORE_QUOTE
};
