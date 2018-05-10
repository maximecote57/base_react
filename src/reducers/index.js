import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import productsCategoriesReducer from "./productsCategoriesReducer";
import dropdownReducer from "./dropdownReducer";

export default combineReducers({
    products: productsReducer,
    productsCategories: productsCategoriesReducer,
    dropdown: dropdownReducer
});