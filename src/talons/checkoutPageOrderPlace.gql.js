import { gql } from '@apollo/client';

export const PLACE_ORDER = gql`
    mutation placeOrder($cartId: String!) {
        placeOrder(input: { cart_id: $cartId }) @connection(key: "placeOrder") {
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
