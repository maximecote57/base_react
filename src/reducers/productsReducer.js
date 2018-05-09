import {FETCH_PRODUCTS_START, FETCH_PRODUCTS_FETCHED, FETCH_PRODUCTS_ERROR, UPDATE_PRODUCTS_OFFSET, UPDATE_NB_OF_VISIBLE_PRODUCTS_IN_LAZY_LOAD_MODE, UPDATE_NB_OF_PRODUCTS_PER_PAGE, UPDATE_SORT_MODE } from "../actions/types";

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
        case FETCH_PRODUCTS_START:
            return {
                ...state,
                areItemsFetching: true
            };
        case FETCH_PRODUCTS_FETCHED:
            return {
                ...state,
                items: action.payload,
                areItemsFetching: false
            };
        case FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                error: action.payload,
                areItemsFetching: false
            };
        case UPDATE_PRODUCTS_OFFSET:
            return {
                ...state,
                offset: action.payload
            };
        case UPDATE_NB_OF_VISIBLE_PRODUCTS_IN_LAZY_LOAD_MODE:
            return {
                ...state,
                nbOfVisibleItemsLazyLoad: state.nbOfVisibleItemsLazyLoad + state.nbOfProductsPerPage
            };
        case UPDATE_NB_OF_PRODUCTS_PER_PAGE:
            return {
                ...state,
                nbOfProductsPerPage: action.payload
            };
        case UPDATE_SORT_MODE:
            return {
                ...state,
                sortMode: action.payload
            };
        default:
            return state;
    }
}