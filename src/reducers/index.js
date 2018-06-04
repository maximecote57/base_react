import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import productsCategoriesReducer from "./productsCategoriesReducer";

export default combineReducers({
    products: productsReducer,
    productsCategories: productsCategoriesReducer
});