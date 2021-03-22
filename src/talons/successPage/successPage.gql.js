import { gql } from '@apollo/client';
import { OrderConfirmationPageFragment } from '@magento/peregrine/lib/talons/CheckoutPage/OrderConfirmationPage/orderConfirmationPageFragments.gql';


export const GET_ORDER_DETAILS = gql`
    query getOrderDetails($cartId: String!) {
        multisafepayCart(cart_id: $cartId) {
            id
            ...OrderConfirmationPageFragment
        }
    }
    ${OrderConfirmationPageFragment}
`;


export default {
    getOrderDetailsQuery: GET_ORDER_DETAILS
};
