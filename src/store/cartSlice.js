import { createSlice } from "@reduxjs/toolkit";
export const addToCart = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    total: 0,
  },
  reducers: {
    addProducttocart: (state, action) => {
      state.cart.push(action.payload);
    },
    deletProductformCart: (state, action) => {
      const index = Object.keys(state.cart).indexOf(action.payload);
      state.cart.splice(index, 1);
    },
    deleteAll: (state, action) => {
      state.cart = [];
    },
  },
});

export const { addProducttocart, deletProductformCart, deleteAll } =
  addToCart.actions;

export default addToCart.reducer;
