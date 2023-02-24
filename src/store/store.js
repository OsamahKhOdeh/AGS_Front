import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filtersSlice from "./filtersSlice";
import productReducer from "./productSlice";
import showingSlice from "./showingSlice";
import warrantySlice from "./warrantySlice";

export default configureStore({
  reducer: {
    products: productReducer,
    show: showingSlice,
    filters: filtersSlice,
    warranty: warrantySlice,
  },
});
