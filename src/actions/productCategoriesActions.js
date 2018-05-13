import { PRODUCTS_CATEGORIES_START_FETCH, PRODUCTS_CATEGORIES_END_FETCH, PRODUCTS_TOGGLE_PRODUCT_CATEGORY } from "./types";
import { settings } from "../settings";

export const fetchProductsCategories = () => dispatch => {
        dispatch({
            type: PRODUCTS_CATEGORIES_START_FETCH
        });
        return fetch(settings.apiUrlProductsCategories)
            .then((response) => response.json())
            .then(productsCategories => dispatch({
                type: PRODUCTS_CATEGORIES_END_FETCH,
                payload: productsCategories
            }))
};

export const toggleProductCategory = (categoryId) => dispatch => {

    dispatch({
        type: PRODUCTS_TOGGLE_PRODUCT_CATEGORY,
        payload: categoryId
    })

};