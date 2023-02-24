/**
 * Copyright © 2021 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package @multisafepay/multisafepay-payment-integration
 * @link https://github.com/MultiSafepay/pwastudio-multisafepay-payment-integration
 *
 */
import React from 'react';
import {mergeClasses} from '@magento/venia-ui/lib/classify';
import {object, shape, string} from 'prop-types';
import {useParams} from 'react-router';

import defaultClasses from './successPage.css';
import {Title} from "@magento/venia-ui/lib/components/Head";
import {FormattedMessage, useIntl} from "react-intl";
import ItemsReview from "@magento/venia-ui/lib/components/CheckoutPage/ItemsReview";
import confirmationPageClasses
    from "@magento/venia-ui/lib/components/CheckoutPage/OrderConfirmationPage/orderConfirmationPage.css";
import {useSuccessPage} from "../../talons/successPage/useSuccessPage";
import LoadingIndicator from "@magento/venia-ui/lib/components/LoadingIndicator";
import CreateAccount from "@magento/venia-ui/lib/components/CheckoutPage/OrderConfirmationPage/createAccount";
import { Redirect } from 'react-router-dom';


const SuccessPage = props => {
    const {order: orderNumber, maskedId} = useParams();
    const {formatMessage} = useIntl();
    const classes = mergeClasses(defaultClasses, props.classes, confirmationPageClasses);
    const talonProps = useSuccessPage({
        orderNumber,
        maskedId
    });
    const commonComponent = (
        <div className={classes.root}>
            <Title>
                {formatMessage({
                    id: 'checkoutPage.titleReceipt',
                    defaultMessage: 'Receipt'
                })}
            </Title>
            <div className={classes.mainContainer}>
                <h2 className={classes.heading}>
                    <FormattedMessage
                        id={'checkoutPage.thankYou'}
                        defaultMessage={'Thank you for your order!'}
                    />
                </h2>
                <div className={classes.orderNumber}>
                    <FormattedMessage
                        id={'checkoutPage.orderNumber'}
                        defaultMessage={'Order Number'}
                        values={{orderNumber}}
                    />
                </div>
            </div>
        </div>
    );

    const {flatData, data, isSignedIn, isLoading, hasError} = talonProps;

    if (hasError) {
        return <Redirect to="/"/>;
    }

    if (isLoading || !flatData || !data) {
        return (
            <>
                {commonComponent}
                <LoadingIndicator>
                    <FormattedMessage
                        id={'checkoutPage.fetchingItemsInYourOrder'}
                        defaultMessage={'Fetching data in your Order'}
                    />
                </LoadingIndicator>
            </>
        );
    }

    const {
        city,
        country,
        email,
        firstname,
        lastname,
        postcode,
        region,
        shippingMethod,
        street
    } = flatData;

    const streetRows = street.map((row, index) => {
        return (
            <span key={index} className={classes.addressStreet}>
                {row}
            </span>
        );
    });

    window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
    });

    const createAccountForm = !isSignedIn ? (
        <CreateAccount
            firstname={firstname}
            lastname={lastname}
            email={email}
        />
    ) : null;

    const nameString = `${firstname} ${lastname}`;
    const additionalAddressString = `${city}, ${region} ${postcode} ${country}`;

    return (
        <>
            {commonComponent}
            <div className={classes.root}>
                <div className={classes.mainContainer}>
                    <div className={classes.shippingInfoHeading}>
                        <FormattedMessage
                            id={'global.shippingInformation'}
                            defaultMessage={'Shipping Information'}
                        />
                    </div>
                    <div className={classes.shippingInfo}>
                        <span className={classes.email}>{email}</span>
                        <span className={classes.name}>{nameString}</span>
                        {streetRows}
                        <span className={classes.addressAdditional}>
                            {additionalAddressString}
                        </span>
                    </div>
                    <div className={classes.shippingMethodHeading}>
                        <FormattedMessage
                            id={'global.shippingMethod'}
                            defaultMessage={'Shipping Method'}
                        />
                    </div>
                    <div className={classes.shippingMethod}>{shippingMethod}</div>
                    <div className={classes.itemsReview}>
                        <ItemsReview data={data}/>
                    </div>
                    <div className={classes.additionalText}>
                        <FormattedMessage
                            id={'checkoutPage.additionalText'}
                            defaultMessage={
                                'You will also receive an email with the details and we will let you know when your order has shipped.'
                            }
                        />
                    </div>
                </div>
                <div className={classes.sidebarContainer}>{createAccountForm}</div>
            </div>
        </>
    );
}

SuccessPage.propTypes = {
    classes: shape({
        addressStreet: string,
        mainContainer: string,
        heading: string,
        orderNumber: string,
        shippingInfoHeading: string,
        shippingInfo: string,
        email: string,
        name: string,
        addressAdditional: string,
        shippingMethodHeading: string,
        shippingMethod: string,
        itemsReview: string,
        additionalText: string,
        sidebarContainer: string
    }),
    data: object,
    orderNumber: string
};

SuccessPage.defaultProps = {};

export default SuccessPage;
