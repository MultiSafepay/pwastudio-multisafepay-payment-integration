const SUCCESS = undefined;

export const validateDateOfBirth = value => {
    let pattern = new RegExp('^[0-3]?[0-9]-[0-3]?[0-9]-(?:[0-9]{2})?[0-9]{2}$')

    if (!pattern.test(value)) {
        const message = {
            id: 'validation.validateDateOfBirth',
            defaultMessage:
                'Date of birth not valid'
        };

        return message;
    }

    return SUCCESS;
};

