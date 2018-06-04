import {FETCH_PRODUCTS_CATEGORIES_START, FETCH_PRODUCTS_CATEGORIES_FETCHED, FETCH_PRODUCTS_CATEGORIES_ERROR, TOGGLE_PRODUCT_CATEGORY} from "../actions/types";

const initalState = {
    items: [],
    activeItemsCategories: [],
    error: null,
    areItemsFetching: false
};

export default function (state = initalState, action) {
    switch(action.type) {
        case FETCH_PRODUCTS_CATEGORIES_START:
            return {
                ...state,
                areItemsFetching: true
            };
        case FETCH_PRODUCTS_CATEGORIES_FETCHED:
            return {
                ...state,
                items: action.payload,
                areItemsFetching: false
            };
        case FETCH_PRODUCTS_CATEGORIES_ERROR:
            return {
                ...state,
                error: action.payload,
                areItemsFetching: false
            };

        case TOGGLE_PRODUCT_CATEGORY:

            const categoryId = action.payload;
            const indexOfFilterId = state.activeItemsCategories.indexOf(categoryId);

            return {
                ...state,
                activeItemsCategories : (indexOfFilterId === -1 ? [...state.activeItemsCategories, categoryId] : [...state.activeItemsCategories.slice(0, indexOfFilterId), ...state.activeItemsCategories.slice(indexOfFilterId + 1)])
            };

        default:
            return state;
    }
}