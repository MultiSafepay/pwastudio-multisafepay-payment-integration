/**
 * Copyright © 2021 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package @multisafepay/multisafepay-payment-integration
 * @link https://github.com/MultiSafepay/pwastudio-multisafepay-payment-integration
 *
 */
const SUCCESS = undefined;

export const validateDateOfBirth = value => {
    const pattern = new RegExp('^[0-3]?[0-9]-[0-3]?[0-9]-(?:[0-9]{2})?[0-9]{2}$')

    if (!pattern.test(value)) {
        return {
            id: 'validation.validateDateOfBirth',
            defaultMessage:
                'Date of birth not valid'
        };
    }

    return SUCCESS;
};

