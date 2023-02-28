import { setIsLoading } from "../store/showingSlice";

import * as api from "../api/index.js";
import { fetchAll, fetchFilterd } from "../store/productsSlice";

export const getProducts = (page) => async (dispatch) => {
  try {
    // console.log("page : " + page);
    dispatch(setIsLoading(true));
    const data = await api.fetchProducts(page);
    //  console.log(data);
    dispatch(fetchAll(data.data, data.currentPage, data.numberOfPages));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};

export const getFilteredProducts = (filters) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const data = await api.fetchFilteredProducts(filters);
    dispatch(fetchFilterd(data.data));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};
