import {PRODUCTS_START_FETCH, PRODUCTS_END_FETCH, PRODUCTS_FETCH_ERROR, PRODUCTS_UPDATE_OFFSET, PRODUCTS_UPDATE_NB_OF_VISIBLE_PRODUCTS_LAZY_LOAD, PRODUCTS_UPDATE_NB_OF_PRODUCTS_PER_PAGE, PRODUCTS_UPDATE_SORT_MODE } from "../actions/types";

const initalState = {
    items: [],
    error: null,
    areItemsFetching: false,
    offset: 0,
    nbOfVisibleItemsLazyLoad: 25,
    nbOfProductsPerPage: 12,
    sortMode: "alphabetical-asc",
    isFiltersMobileMenuVisible: false

}

export default function (state = initalState, action) {
    switch(action.type) {
        case PRODUCTS_START_FETCH:
            return {
                ...state,
                areItemsFetching: true
            };
        case PRODUCTS_END_FETCH:
            return {
                ...state,
                items: action.payload,
                areItemsFetching: false
            };
        case PRODUCTS_FETCH_ERROR:
            return {
                ...state,
                error: action.payload,
                areItemsFetching: false
            };
        case PRODUCTS_UPDATE_OFFSET:
            return {
                ...state,
                offset: action.payload
            };
        case PRODUCTS_UPDATE_NB_OF_VISIBLE_PRODUCTS_LAZY_LOAD:
            return {
                ...state,
                nbOfVisibleItemsLazyLoad: state.nbOfVisibleItemsLazyLoad + state.nbOfProductsPerPage
            };
        case PRODUCTS_UPDATE_NB_OF_PRODUCTS_PER_PAGE:
            return {
                ...state,
                nbOfProductsPerPage: action.payload
            };
        case PRODUCTS_UPDATE_SORT_MODE:
            return {
                ...state,
                sortMode: action.payload
            };
        default:
            return state;
    }
}