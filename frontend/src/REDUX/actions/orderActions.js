import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from "../constants/orderConstants";

import { httpGet, httpPost } from "../../Config/Config";

export const createOrder = (order) => async (dispacth, getState) => {
  // in the form of id we take profile --underStand in profileScreen--
  try {
    dispacth({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        // 'Content-Type': "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await httpPost.post(`/api/orders`, order, config);
    dispacth({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispacth({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispacth, getState) => {
  // in the form of id we take profile --underStand in profileScreen--
  try {
    dispacth({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        // 'Content-Type': "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await httpGet.get(`/api/orders/${id}`, config);
    dispacth({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispacth({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder =
  (orderID, paymentResult) => async (dispacth, getState) => {
    try {
      dispacth({
        type: ORDER_PAY_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          // 'Content-Type': "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await httpGet.put(
        `/api/orders/${orderID}/pay`,
        paymentResult,
        config
      );
      dispacth({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispacth({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listMyOrder = () => async (dispacth, getState) => {
  try {
    dispacth({
      type: ORDER_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        // 'Content-Type': "application/json",      do not need content-type in this action
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await httpGet.get(`/api/orders/myorders`, config);
    dispacth({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispacth({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
