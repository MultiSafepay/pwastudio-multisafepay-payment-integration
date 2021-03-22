import { useUserContext } from '@magento/peregrine/lib/context/user';
import mergeOperations from "@magento/peregrine/lib/util/shallowMerge";
import DEFAULT_OPERATIONS from "./successPage.gql";
import {
    useQuery
} from '@apollo/client';

export const flatten = data => {
    const { cart } = data;
    const { shipping_addresses } = cart;
    const address = shipping_addresses[0];

    const shippingMethod = `${
        address.selected_shipping_method.carrier_title
    } - ${address.selected_shipping_method.method_title}`;

    return {
        city: address.city,
        country: address.country.label,
        email: cart.email,
        firstname: address.firstname,
        lastname: address.lastname,
        postcode: address.postcode,
        region: address.region.label,
        shippingMethod,
        street: address.street,
        totalItemQuantity: cart.total_quantity
    };
};

export const useSuccessPage = props => {
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const { orderNumber, maskedId: cartId } = props;

    const {
        getOrderDetailsQuery
    } = operations;

    console.log(orderNumber, cartId);

    const {
        data: orderDetailsData,
        loading: orderDetailsLoading
    } = useQuery(getOrderDetailsQuery, {
        skip: !cartId,
        variables: {
            cartId
        }
    });

    const { data } = props;
    const [{ isSignedIn }] = useUserContext();

    return {
        flatData: flatten(data),
        orderDetailsLoading,
        isLoading: true
    };
};
