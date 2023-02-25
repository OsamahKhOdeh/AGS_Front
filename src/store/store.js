import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import filtersSlice from "./filtersSlice";
import productReducer from "./productSlice";
import showingSlice from "./showingSlice";
import warrantySlice from "./warrantySlice";

export default configureStore({
  reducer: {
    cart: cartSlice,
    products: productReducer,
    show: showingSlice,
    filters: filtersSlice,
    warranty: warrantySlice,
  },
});
