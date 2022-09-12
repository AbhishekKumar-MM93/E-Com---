import { httpGet } from "../../Config/Config";
import {
  FETCH_PRODUCT_FAILED,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAILED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
} from "../constants/productConstants";

const listProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_PRODUCT_REQUEST,
    });
    const { data } = await httpGet("api/products");
    dispatch({
      type: FETCH_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCT_FAILED,
      payload: error.message,
    });
  }
};

const singleProduct = (id) => async (dispacth) => {
  try {
    dispacth({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const { data } = await httpGet(`/api/products/${id}`);
    dispacth({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispacth({
      type: PRODUCT_DETAILS_FAILED,
      payload: error.message,
    });
  }
};

export { listProduct, singleProduct };
