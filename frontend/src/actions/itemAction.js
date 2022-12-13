import {
  ALL_FILTERS_SUCCESS,
  ALL_ITEMS_FAILS,
  ALL_ITEMS_REQUEST,
  ALL_ITEMS_SUCCESS,
  AN_ITEM_FAILS,
  AN_ITEM_REQUEST,
  AN_ITEM_SUCCESS,
} from "../constants";
import axios from "axios";

// get all restaurants
export const getAllItems =
  (url, isFilter = false) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_ITEMS_REQUEST });
      const { data } = await axios.get(url);
      console.log(url);
      console.log("dataaaaaaa", data);
      if (isFilter) {
        dispatch({ type: ALL_FILTERS_SUCCESS, payload: data.ads });
        return;
      }
      dispatch({ type: ALL_ITEMS_SUCCESS, payload: data.ads });
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: ALL_ITEMS_FAILS,
        payload: error.response.data.error,
      });
    }
  };

// get an item or a restauarant
export const getAnItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: AN_ITEM_REQUEST });
    const { data } = await axios.get(`/api/adCard/${id}`);
    dispatch({ type: AN_ITEM_SUCCESS, payload: data.ad[0] });
  } catch (error) {
    dispatch({ type: AN_ITEM_FAILS, payload: error.response.data.error });
  }
};
