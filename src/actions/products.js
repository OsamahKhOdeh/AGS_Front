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
    // if (data.data2) {
    //  console.log(data.data2);
    // }
    dispatch(fetchFilterd(data.data));

    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = (id, product) => async (dispatch) => {
  console.log("here");
  console.log(id);

  try {
    const { data } = await api.updateProduct(id, product);
    console.log(data);
    //  dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
