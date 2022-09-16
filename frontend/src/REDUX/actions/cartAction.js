import {
  ADD_CART_ITEM,
  CART_PAYMENT_METHOD,
  CART_SHIPPING_ADDRESS,
  REMOVE_CART_ITEM,
} from "../constants/cartConstants";
import { httpGet } from "../../Config/Config";

const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await httpGet(`/api/products/getproduct/${id}`);

  dispatch({
    type: ADD_CART_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

const addShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: CART_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

const addPaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: CART_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

export { addToCart, removeFromCart, addShippingAddress, addPaymentMethod };
