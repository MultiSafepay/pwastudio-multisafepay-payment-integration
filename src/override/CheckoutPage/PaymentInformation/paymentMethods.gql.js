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

export const GET_PAYMENT_METHODS = gql`
    query getPaymentMethods($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            available_payment_methods {
                code
                title
                multisafepay_available_issuers {
                    code
                    description
                }
                multisafepay_additional_data {
                    image
                    is_preselected
                }
            }
        }
    }
`;

export default {
    queries: {
        getPaymentMethodsQuery: GET_PAYMENT_METHODS
    },
    mutations: {}
};
