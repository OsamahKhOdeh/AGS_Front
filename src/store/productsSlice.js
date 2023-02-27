import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    chosenProducts: [],
  },
  reducers: {
    fetchAll: (state, action) => {
      const { data, currentPage, numberOfPages } = action.payload;
      state.products = data;
      state.currentPage = currentPage;
      state.numberOfPages = numberOfPages;
    },
    fetchFilterd: (state, action) => {
      console.log("Setting filtered");
      console.log(state.products);
      const { data } = action.payload;
      state.products = data;
    },
  },
});

export const { fetchAll, fetchFilterd } = productsSlice.actions;

export default productsSlice.reducer;
