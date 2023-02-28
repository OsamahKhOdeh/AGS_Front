import { createSlice } from "@reduxjs/toolkit";

export const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    filters: { categories: ["All"], countries: ["All"] },
    usdToAedRate: 3.62,
    currency: "USD",
    location: "freezone",
  },
  reducers: {
    setFiltersState: (state, action) => {
      state.filters = action.payload;
    },
    setUsdToAedRate(state, action) {
      state.usdToAedRate = action.payload;
    },
    changeCurrency(state, action) {
      state.currency = action.payload;
    },
    changeLocation(state, action) {
      state.location = action.payload;
    },
  },
});

export const { setFiltersState, setUsdToAedRate, changeCurrency, changeLocation } = filtersSlice.actions;

export default filtersSlice.reducer;
