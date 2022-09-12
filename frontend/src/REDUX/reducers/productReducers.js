import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAILS_FAILED,
} from "../constants/productConstants";

const productlistReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case FETCH_PRODUCT_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case FETCH_PRODUCT_FAILED:
      return { ...state, loading: false, products: [], error: action.payload };
    default:
      return state;
  }
};

const productDetailReducer = (state = { product: [] }, action ) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAIL_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAILED:
      return { ...state, loading: false, product: [], error: action.payload };
    default:
      return state;
  }
};

export { productlistReducer, productDetailReducer };
