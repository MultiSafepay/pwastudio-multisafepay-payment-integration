import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useHistory ,useLocation } from 'react-router-dom';
import BrowserPersistence from '@magento/peregrine/lib/util/simplePersistence';

const wrapUseCartPage = (original) => {
    return function useCartPage(...args) {
        const location = useLocation();
        const params = new URLSearchParams(location.search);
        const [{cartId}, {createCart, removeCart}] = useCartContext();

        console.log(location, params.get('multisafepayRestore'), params.get('maskedId'));

        if (params.get('multisafepayRestore') && params.get('maskedId')) {
            // const storage = new BrowserPersistence();
            // const previousCartId = storage.getItem('cartId');
            // const restoredCartId = params.get('maskedId');
            //
            // if (previousCartId != restoredCartId) {
            //     storage.setItem('cartId', restoredCartId);
            // }

        }

        return original(...args);
    }
}

export default wrapUseCartPage;
