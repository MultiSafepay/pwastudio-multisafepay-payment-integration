/**
 * Copyright © 2021 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package @multisafepay/multisafepay-payment-integration
 * @link https://github.com/MultiSafepay/pwastudio-multisafepay-payment-integration
 *
 */
import {useUserContext} from '@magento/peregrine/lib/context/user';
import mergeOperations from "@magento/peregrine/lib/util/shallowMerge";
import DEFAULT_OPERATIONS from "./successPage.gql";
import {
    useQuery,
    useApolloClient
} from '@apollo/client';
import {useToasts} from "@magento/peregrine";
import {AlertCircle as AlertCircleIcon} from 'react-feather';
import Icon from "@magento/venia-ui/lib/components/Icon";
import React from "react";
import {clearCartDataFromCache} from "@magento/peregrine/lib/Apollo/clearCartDataFromCache";

export const flatten = data => {
    const {multisafepayCart: cart} = data;
    const {shipping_addresses} = cart;
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
        region: address.region.label || '',
        shippingMethod,
        street: address.street,
        totalItemQuantity: cart.total_quantity
    };
};

export const useSuccessPage = props => {
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const {getOrderDetailsQuery} = operations;
    const {maskedId: cartId} = props;
    const [, {addToast}] = useToasts();
    const errorIcon = <Icon src={AlertCircleIcon} size={20}/>;
    const [{isSignedIn}] = useUserContext();
    const apolloClient = useApolloClient();

    const {
        data: orderDetailsData,
        error: orderDetailsError,
        loading: orderDetailsLoading
    } = useQuery(getOrderDetailsQuery, {
        fetchPolicy: 'cache-and-network',
        skip: !cartId,
        variables: {
            cartId
        },
        errorPolicy: 'ignore'
    });

    if (orderDetailsError) {
        addToast({
            type: 'error',
            icon: errorIcon,
            message: orderDetailsError.message,
            dismissable: true,
            timeout: 7000
        });
    }

    if (!orderDetailsData || orderDetailsLoading) {
        return {
            flatData: null,
            isSignedIn,
            isLoading: true,
            hasError: orderDetailsError
        };
    }

    clearCartDataFromCache(apolloClient);

    if (!orderDetailsData.multisafepayCart) {
        return {
            flatData: null,
            isSignedIn,
            isLoading: orderDetailsLoading,
            hasError: orderDetailsError
        };
    }

    return {
        flatData: flatten(orderDetailsData),
        data: {cart: orderDetailsData.multisafepayCart},
        isSignedIn,
        isLoading: false,
        hasError: orderDetailsError
    };
};
