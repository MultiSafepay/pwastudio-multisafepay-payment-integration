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
import {OrderConfirmationPageFragment} from '@magento/peregrine/lib/talons/CheckoutPage/OrderConfirmationPage/orderConfirmationPageFragments.gql';


export const GET_ORDER_DETAILS = gql`
    query getOrderDetails($cartId: String!) {
        multisafepayCart(cart_id: $cartId) {
            id
            selected_payment_method {
                purchase_order_number
                title
                code
            }
            ...OrderConfirmationPageFragment
        }
    }
    ${OrderConfirmationPageFragment}
`;


export default {
    getOrderDetailsQuery: GET_ORDER_DETAILS
};
