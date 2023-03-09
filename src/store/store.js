import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import filtersSlice from "./filtersSlice";
import piSlice from "./piSlice";
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
    cart: cartSlice,
    pi: piSlice,
    // products: productReducer,
    show: showingSlice,
    filters: filtersSlice,
    warranty: warrantySlice,
  },
});
