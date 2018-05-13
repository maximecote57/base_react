import {PRODUCTS_CATEGORIES_START_FETCH, PRODUCTS_CATEGORIES_END_FETCH, PRODUCTS_CATEGORIES_FETCH_ERROR, PRODUCTS_TOGGLE_PRODUCT_CATEGORY} from "../actions/types";

const initalState = {
    items: [],
    activeItemsCategories: [],
    error: null,
    areItemsFetching: false
};

export default function (state = initalState, action) {
    switch(action.type) {
        case PRODUCTS_CATEGORIES_START_FETCH:
            return {
                ...state,
                areItemsFetching: true
            };
        case PRODUCTS_CATEGORIES_END_FETCH:
            return {
                ...state,
                items: action.payload,
                areItemsFetching: false
            };
        case PRODUCTS_CATEGORIES_FETCH_ERROR:
            return {
                ...state,
                error: action.payload,
                areItemsFetching: false
            };

        case PRODUCTS_TOGGLE_PRODUCT_CATEGORY:

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