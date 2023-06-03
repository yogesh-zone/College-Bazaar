import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILS,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILS,
  CLEAR_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILS,
  SENDER_USER_FAILS,
  SENDER_USER_REQUEST,
} from "../constants";
import axios from "axios";
const config = { headers: { "Content-Type": "application/json" } };

// user login action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await axios.post(
      `/api/user/login`,
      { email, password },
      config
    );
    console.log("data", data);
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    console.log("error ", error);
    dispatch({ type: LOGIN_FAILS, payload: error.response.data.error });
  }
};

// user register action
export const registerUserLogin =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      console.log("allaction ", name, email, password);
      dispatch({ type: REGISTER_USER_REQUEST });
      const { data } = await axios.post(
        `/users/api/y1/register`,
        { name, email, password },
        config
      );
      console.log("data ", data);
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
      console.log(error.response.data.error);
      dispatch({
        type: REGISTER_USER_FAILS,
        payload: error.response.data.error,
      });
    }
  };

// log out User
export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get(`/api/user/logout`);
    console.log("logout success");
    dispatch({ type: LOGOUT_USER_SUCCESS });
  } catch (error) {
    console.log("logout ", error.response.data.error);
    dispatch({ type: LOGOUT_USER_FAILS, payload: error.response.data.error });
  }
};

// load user (jwt)
export const loadUser = () => async (dispatch) => {
  try {
    // dispatch({ type: LOAD_USER_REQUEST });
    console.log("load user before");
    const { data } = await axios.get(`/api/user`);
    console.log("load user ", data);
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    console.log("error is ", error);
    dispatch({ type: LOAD_USER_FAILS, payload: error.response.data.error });
  }
};

// update user details
export const updateUser = (obj) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    const { data } = await axios.put(`/api/user/update_User`, obj, config);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
  } catch (error) {
    console.log("error in update ", error);
    dispatch({ type: UPDATE_USER_FAILS, payload: error.response.data.error });
  }
};

// update user Password
export const updatePassword = (obj) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    await axios.put(`/users/api/y1/update`, obj, config);
    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: "Password is Updated Successfully",
    });
  } catch (error) {
    console.log("error message is ", error.response.data.error);
    dispatch({
      type: UPDATE_PASSWORD_FAILS,
      payload: error.response.data.error,
    });
  }
};

// get sender details
// export const sender = (senderID) => async (dispatch) => {
//   try {
//     dispatch({ type: SENDER_USER_REQUEST });

//     const data = await axios.get(`/api/user`);
//   } catch (error) {
//     dispatch({ type: SENDER_USER_FAILS, payload: error.response.data.error });
//   }
// };

// clearing all errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
