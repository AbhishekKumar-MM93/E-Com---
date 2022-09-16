import axios from "axios";
import { httpGet } from "../../Config/Config";
import {
  FETCH_PRODUCT_FAILED,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  PRODUCT_DELETE_FAILED,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAILED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
} from "../constants/productConstants";

const listProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_PRODUCT_REQUEST,
    });
    const { data } = await httpGet("api/products/getallproduct");
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
  console.log(id);
  try {
    dispacth({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const { data } = await httpGet(`/api/products/getproduct/${id}`);
    dispacth({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispacth({
      type: PRODUCT_DETAILS_FAILED,
      payload: error.message,
    });
  }
};
const deleteProduct = (id) => async (dispacth, getState) => {
  try {
    dispacth({
      type: PRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        // 'Content-Type': "application/json",       // no need of content-type
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await httpGet.delete(
      `/api/products/deletebyadminproduct/${id}`,
      config
    );
    dispacth({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispacth({
      type: PRODUCT_DELETE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export { listProduct, singleProduct, deleteProduct };
