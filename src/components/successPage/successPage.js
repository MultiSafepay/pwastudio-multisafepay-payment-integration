import React, { useEffect } from 'react';
import {mergeClasses} from '@magento/venia-ui/lib/classify';
import {shape, string} from 'prop-types';
import {useParams} from 'react-router';

import defaultClasses from './successPage.css';
import {StoreTitle} from "@magento/venia-ui/lib/components/Head";
import {FormattedMessage, useIntl} from "react-intl";
import ItemsReview from "@magento/venia-ui/lib/components/CheckoutPage/ItemsReview";
import confirmationPageClasses from "@magento/venia-ui/lib/components/CheckoutPage/OrderConfirmationPage/orderConfirmationPage.css";
import {useSuccessPage} from "../../talons/successPage/useSuccessPage";
import LoadingIndicator from "@magento/venia-ui/lib/components/LoadingIndicator";

const SuccessPage = props => {
    const { order: orderNumber, maskedId } = useParams();
    const { formatMessage } = useIntl();
    const classes = mergeClasses(defaultClasses, props.classes, confirmationPageClasses);

    if (!orderNumber || !maskedId) {
        return (
            <LoadingIndicator>
                <FormattedMessage
                    id={'checkoutPage.fetchingItemsInYourOrder'}
                    defaultMessage={'Fetching Items in your Order'}
                />
            </LoadingIndicator>
        );
    }

    const talonProps = useSuccessPage({
        orderNumber,
        maskedId
    });
    const { flatData, isSignedIn, isLoading } = talonProps;

    useEffect(() => {
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    if (isLoading) {
        return (
            <LoadingIndicator>
                <FormattedMessage
                    id={'checkoutPage.fetchingItemsInYourOrder'}
                    defaultMessage={'Fetching Items in your Order'}
                />
            </LoadingIndicator>
        );
    }

    return (
        <div className={classes.root}>
            <StoreTitle>
                {formatMessage({
                    id: 'checkoutPage.titleReceipt',
                    defaultMessage: 'Receipt'
                })}
            </StoreTitle>
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
                        values={{ orderNumber }}
                    />
                </div>
                <div className={classes.shippingInfoHeading}>
                    <FormattedMessage
                        id={'global.shippingInformation'}
                        defaultMessage={'Shipping Information'}
                    />
                </div>
                {/*<div className={classes.shippingInfo}>*/}
                {/*    <span className={classes.email}>{email}</span>*/}
                {/*    <span className={classes.name}>{nameString}</span>*/}
                {/*    {streetRows}*/}
                {/*    <span className={classes.addressAdditional}>*/}
                {/*        {additionalAddressString}*/}
                {/*    </span>*/}
                {/*</div>*/}
                {/*<div className={classes.shippingMethodHeading}>*/}
                {/*    <FormattedMessage*/}
                {/*        id={'global.shippingMethod'}*/}
                {/*        defaultMessage={'Shipping Method'}*/}
                {/*    />*/}
                {/*</div>*/}
                {/*<div className={classes.shippingMethod}>{shippingMethod}</div>*/}
                {/*<div className={classes.itemsReview}>*/}
                {/*    <ItemsReview data={data} />*/}
                {/*</div>*/}
                <div className={classes.additionalText}>
                    <FormattedMessage
                        id={'checkoutPage.additionalText'}
                        defaultMessage={
                            'You will also receive an email with the details and we will let you know when your order has shipped.'
                        }
                    />
                </div>
            </div>
            {/*<div className={classes.sidebarContainer}>{createAccountForm}</div>*/}
        </div>
    );
}

SuccessPage.propTypes = {
    classes: shape({root: string})
};

SuccessPage.defaultProps = {};

export default SuccessPage;
