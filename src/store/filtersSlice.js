import { createSlice } from "@reduxjs/toolkit";

export const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    filters: { categories: ["all"], counties: ["all"] },
  },
  reducers: {
    setFiltersState: (state, action) => {
      console.log(action.payload);
      state.filters = action.payload;
    },
  },
});

export const { setFiltersState } = filtersSlice.actions;

export default filtersSlice.reducer;
