/* eslint-disable no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";
export const addToCart = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    total: 0,
  },
  reducers: {
    addProducttocart: (state, action) => {
      state.cart.some((item) => item._id === action.payload._id)
        ? null
        : state.cart.push(action.payload);
    },
    deletProductformCart: (state, action) => {

      let index = state.cart.findIndex( obj => obj._id === action.payload._id); 
      if(index != -1 ){ 
        state.cart.splice(index,1)
      }

      
    },
    deleteAll: (state, action) => {
      state.cart = [];
    },
  },
});

export const { addProducttocart, deletProductformCart, deleteAll } =
  addToCart.actions;

export default addToCart.reducer;
