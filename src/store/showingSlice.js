import { createSlice } from "@reduxjs/toolkit";

export const showingSlice = createSlice({
  name: "show",
  initialState: {
    isLoading: false,
    showPrice: true,
    showStock: true,
    showDatasheet: true,
  },
  reducers: {
    changeShowPrice: (state, action) => {
      state.showPrice = action.payload;
    },
    changeShowStock: (state, action) => {
      state.showStock = action.payload;
    },
    changeShowDatasheet: (state, action) => {
      state.showDatasheet = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { changeShowPrice, changeShowStock, changeShowDatasheet, setIsLoading } = showingSlice.actions;

export default showingSlice.reducer;
