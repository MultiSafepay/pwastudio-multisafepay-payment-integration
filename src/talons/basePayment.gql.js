import { gql } from '@apollo/client';

export const SelectedPaymentMethodsFragment = gql`
    fragment SelectedPaymentMethodsFragment on Cart {
        id
        selected_payment_method {
            code
            title
        }
    }
`;


export const SET_PAYMENT_METHOD_ON_CART = gql`
    mutation setPaymentMethodOnCart($cartId: String!, $selectedMethod: String!) {
        setPaymentMethodOnCart(
            input: { cart_id: $cartId, payment_method: { code: $selectedMethod } }
        ) @connection(key: "setPaymentMethodOnCart") {
            cart {
                ...SelectedPaymentMethodsFragment
            }
        }
    }
    ${SelectedPaymentMethodsFragment}
`;

export const SET_IDEAL_PAYMENT_METHOD_ON_CART = gql`
    mutation setPaymentMethodOnCart($cartId: String!, $selectedMethod: String!, $issuer: String!) {
        setPaymentMethodOnCart(
            input: {
                cart_id: $cartId
                payment_method: {
                    code: $selectedMethod
                    multisafepay_ideal: {
                        issuer_id: $issuer
                    }
                }
            }
        ) @connection(key: "setPaymentMethodOnCart") {
            cart {
                ...SelectedPaymentMethodsFragment
            }
        }
    }
    ${SelectedPaymentMethodsFragment}
`;

export const SET_AFTERPAY_PAYMENT_METHOD_ON_CART = gql`
    mutation setPaymentMethodOnCart(
        $cartId: String!,
        $selectedMethod: String!,
        $gender: String!,
        $dateOfBirth: String!
    ) {
        setPaymentMethodOnCart(
            input: {
                cart_id: $cartId
                payment_method: {
                    code: $selectedMethod
                    multisafepay_afterpay: {
                        date_of_birth: $dateOfBirth
                        gender: $gender
                    }
                }
            }
        ) @connection(key: "setPaymentMethodOnCart") {
            cart {
                ...SelectedPaymentMethodsFragment
            }
        }
    }
    ${SelectedPaymentMethodsFragment}
`;

export const SET_IN3_PAYMENT_METHOD_ON_CART = gql`
    mutation setPaymentMethodOnCart(
        $cartId: String!,
        $selectedMethod: String!,
        $gender: String!,
        $dateOfBirth: String!
    ) {
        setPaymentMethodOnCart(
            input: {
                cart_id: $cartId
                payment_method: {
                    code: $selectedMethod
                    multisafepay_in3: {
                        date_of_birth: $dateOfBirth
                        gender: $gender
                    }
                }
            }
        ) @connection(key: "setPaymentMethodOnCart") {
            cart {
                ...SelectedPaymentMethodsFragment
            }
        }
    }
    ${SelectedPaymentMethodsFragment}
`;

export default {
    setPaymentMethodOnCartMutation: SET_PAYMENT_METHOD_ON_CART,
    setIdealPaymentMethodOnCartMutation: SET_IDEAL_PAYMENT_METHOD_ON_CART,
    setAfterpayPaymentMethodOnCartMutation: SET_AFTERPAY_PAYMENT_METHOD_ON_CART,
    setIn3PaymentMethodOnCartMutation: SET_IN3_PAYMENT_METHOD_ON_CART,
};
