import { PRODUCTS_START_FETCH, PRODUCTS_END_FETCH, PRODUCTS_FETCH_ERROR, PRODUCTS_UPDATE_OFFSET, PRODUCTS_UPDATE_NB_OF_VISIBLE_PRODUCTS_LAZY_LOAD, PRODUCTS_UPDATE_NB_OF_PRODUCTS_PER_PAGE, PRODUCTS_UPDATE_SORT_MODE } from "./types";
import { settings } from "../settings";
import axios from "axios";

export const fetchProducts = () => dispatch => {
        dispatch({
            type: PRODUCTS_START_FETCH
        });
        return axios.get(settings.apiUrlProducts)
            .then(response => {
                dispatch({
                    type: PRODUCTS_END_FETCH,
                    payload: response.data
                })
            })
            .catch(error => {
                dispatch({
                    type: PRODUCTS_FETCH_ERROR,
                    payload: error
                })
            })
};

export const updateProductsOffset = (offset) => dispatch => {

    dispatch({
        type: PRODUCTS_UPDATE_OFFSET,
        payload: offset
    });

};

export const updateNbOfVisibleProductsInLazyLoadMode = () => dispatch => {

    dispatch({
        type: PRODUCTS_UPDATE_NB_OF_VISIBLE_PRODUCTS_LAZY_LOAD
    });

};

export const updateNbOfProductsPerPage = (nbOfProductsPerPage) => dispatch => {

    dispatch({
        type: PRODUCTS_UPDATE_NB_OF_PRODUCTS_PER_PAGE,
        payload: nbOfProductsPerPage
    });

};

export const updateSortMode = (sortMode) => dispatch => {

    dispatch({
        type: PRODUCTS_UPDATE_SORT_MODE,
        payload: sortMode
    });

};