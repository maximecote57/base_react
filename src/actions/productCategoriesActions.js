import { FETCH_PRODUCTS_CATEGORIES_START, FETCH_PRODUCTS_CATEGORIES_FETCHED, TOGGLE_PRODUCT_CATEGORY } from "./types";
import { settings } from "../settings";

export const fetchProductsCategories = () => dispatch => {
        dispatch({
            type: FETCH_PRODUCTS_CATEGORIES_START
        });
        return fetch(settings.apiUrlProductsCategories)
            .then((response) => response.json())
            .then(productsCategories => dispatch({
                type: FETCH_PRODUCTS_CATEGORIES_FETCHED,
                payload: productsCategories
            }))
};

export const toggleProductCategory = (categoryId) => dispatch => {

    dispatch({
        type: TOGGLE_PRODUCT_CATEGORY,
        payload: categoryId
    })

};