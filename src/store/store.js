import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filtersSlice from "./filtersSlice";
import productReducer from "./productSlice";
import showingSlice from "./showingSlice";

const rootReducer = combineReducers({ products: productReducer, show: showingSlice });

export default configureStore({
  reducer: {
    products: productReducer,
    show: showingSlice,
    filters: filtersSlice,
  },
});
