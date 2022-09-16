import axios from "axios";
import { httpGet, httpPost } from "../../Config/Config";
import {
  USER_DETAILS_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAILURE,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
  USER_GET_BY_ADMIN_REQUEST,
  USER_GET_BY_ADMIN_SUCCESS,
  USER_GET_BY_ADMIN_FAILURE,
  USER_UPDATE_BY_ADMIN_REQUEST,
  USER_UPDATE_BY_ADMIN_FAILURE,
  USER_UPDATE_BY_ADMIN_SUCCESS,
} from "../constants/userConstants";
import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";
export const login = (DATA) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const { data } = await httpPost.post("/api/users/login", DATA);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispacth) => {
  localStorage.removeItem("userInfo");
  dispacth({ type: USER_LOGOUT }), (document.location.href = "/login");
  dispacth({ type: ORDER_LIST_MY_RESET });
  dispacth({ type: USER_DETAILS_RESET });
  dispacth({ type: USER_LIST_RESET });
};

export const register = (DATA) => async (dispacth) => {
  try {
    dispacth({
      type: USER_REGISTER_REQUEST,
    });

    const { data } = await httpPost.post("/api/users/createuser", DATA);

    dispacth({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispacth({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispacth({
      type: USER_REGISTER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispacth, getState) => {
  // in the form of id we take profile --underStand in profileScreen--
  try {
    dispacth({
      type: USER_DETAILS_REQUEST,
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

    const { data } = await httpPost.get(`/api/users/${id}`, config); //we pass profile as id in profileScreen
    dispacth({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispacth({
      type: USER_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispacth, getState) => {
  // in the form of id we take profile --underStand in profileScreen--
  try {
    dispacth({
      type: USER_UPDATE_PROFILE_REQUEST,
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

    const { data } = await httpPost.put(`/api/users/profile`, user, config);
    dispacth({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispacth({
      type: USER_UPDATE_PROFILE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUsers = () => async (dispacth, getState) => {
  // in the form of id we take profile --underStand in profileScreen--
  try {
    dispacth({
      type: USER_LIST_REQUEST,
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

    const { data } = await httpPost.get(`/api/users`, config);
    dispacth({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispacth({
      type: USER_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUsers = (id) => async (dispacth, getState) => {
  try {
    dispacth({
      type: USER_DELETE_REQUEST,
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

    const { data } = await httpPost.delete(
      `/api/users/deletebyadmin/${id}`,
      config
    );
    dispacth({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispacth({
      type: USER_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserByAdmin = (id) => async (dispacth, getState) => {
  // in the form of id we take profile --underStand in profileScreen--
  try {
    dispacth({
      type: USER_GET_BY_ADMIN_REQUEST,
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

    const { data } = await httpGet(`/api/users/getuserbyidadmin/${id}`, config); //we pass profile as id in profileScreen
    dispacth({
      type: USER_GET_BY_ADMIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispacth({
      type: USER_GET_BY_ADMIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserByAdmin =
  (id, userData) => async (dispacth, getState) => {
    try {
      dispacth({
        type: USER_UPDATE_BY_ADMIN_REQUEST,
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

      const { data } = await httpPost.put(
        `/api/users/updateuserbyadmin/${id}`,
        userData,
        config
      );
      dispacth({ type: USER_UPDATE_BY_ADMIN_SUCCESS });

      dispacth({
        type: USER_GET_BY_ADMIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispacth({
        type: USER_UPDATE_BY_ADMIN_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
