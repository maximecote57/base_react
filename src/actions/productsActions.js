import { FETCH_PRODUCTS_START, FETCH_PRODUCTS_FETCHED, FETCH_PRODUCTS_ERROR, UPDATE_PRODUCTS_OFFSET, UPDATE_NB_OF_VISIBLE_PRODUCTS_IN_LAZY_LOAD_MODE, UPDATE_NB_OF_PRODUCTS_PER_PAGE, UPDATE_SORT_MODE } from "./types";
import { settings } from "../settings";
import axios from "axios";

export const fetchProducts = () => dispatch => {
        dispatch({
            type: FETCH_PRODUCTS_START
        });
        return axios.get(settings.apiUrlProducts)
            .then(response => {
                dispatch({
                    type: FETCH_PRODUCTS_FETCHED,
                    payload: response.data
                })
            })
            .catch(error => {
                dispatch({
                    type: FETCH_PRODUCTS_ERROR,
                    payload: error
                })
            })
};

export const updateProductsOffset = (offset) => dispatch => {

    dispatch({
        type: UPDATE_PRODUCTS_OFFSET,
        payload: offset
    });

};

export const updateNbOfVisibleProductsInLazyLoadMode = () => dispatch => {

    dispatch({
        type: UPDATE_NB_OF_VISIBLE_PRODUCTS_IN_LAZY_LOAD_MODE
    });

};

export const updateNbOfProductsPerPage = (nbOfProductsPerPage) => dispatch => {

    dispatch({
        type: UPDATE_NB_OF_PRODUCTS_PER_PAGE,
        payload: nbOfProductsPerPage
    });

};

export const updateSortMode = (sortMode) => dispatch => {

    dispatch({
        type: UPDATE_SORT_MODE,
        payload: sortMode
    });

};