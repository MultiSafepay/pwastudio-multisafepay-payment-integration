import React from 'react';
import {mergeClasses} from '@magento/venia-ui/lib/classify';
import {shape, string} from 'prop-types';

import defaultClasses from './index.css';

const Page1 = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    return (<div className={classes.root}>Route</div>);
}

Page1.propTypes = {
    classes: shape({root: string})
};
Page1.defaultProps = {};
export default Page1;
