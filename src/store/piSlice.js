/* eslint-disable no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";
export const piSlice = createSlice({
  name: "pi",
  initialState: {
    piProducts: [],
    piInfo: {
      invoiceNo: 0,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" }),
      exporter: "",
      buyerAdress: "",
      consignee: "",
      notifyParty: "",
      partyOfDischarge: "",
      finalDistination: "",
    },
  },
  reducers: {
    setPiProudcts: (state, action) => {
      state.piProducts = action.payload;
    },
    setPiInfo: (state, action) => {
      state.piInfo = action.payload;
    },

    addProducttocart: (state, action) => {
      state.cart.some((item) => item._id === action.payload._id) ? null : state.cart.push(action.payload);
    },
  },
});

export const { setPiInfo, setPiProudcts } = piSlice.actions;

export default piSlice.reducer;
