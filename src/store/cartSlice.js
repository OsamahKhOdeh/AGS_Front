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
  },
});

export const { addProducttocart, deletProductformCart } = addToCart.actions;

export default addToCart.reducer;
