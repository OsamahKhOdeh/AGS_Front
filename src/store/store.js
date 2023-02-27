import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filtersSlice from "./filtersSlice";
import priceListSlice from "./priceListSlice";
import productReducer from "./productSlice";
import productsSlice from "./productsSlice";
import showingSlice from "./showingSlice";
import warrantySlice from "./warrantySlice";

export default configureStore({
  reducer: {
    priceList: priceListSlice,
    products: productsSlice,
    products1: productReducer,
    show: showingSlice,
    filters: filtersSlice,
    warranty: warrantySlice,
  },
});
