import {
  ALL_ITEMS_FAILS,
  ALL_ITEMS_REQUEST,
  ALL_ITEMS_SUCCESS,
  AN_ITEM_FAILS,
  AN_ITEM_REQUEST,
  AN_ITEM_SUCCESS,
} from "../constants";

// get all restaurants
export const getAllItems = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ITEMS_REQUEST });
    const { data } = await axios.get("/restaurant/api/y1/all");
    console.log("daaaaataaaaa", data);
    dispatch({ type: ALL_ITEMS_SUCCESS, payload: data.ads });
  } catch (error) {
    console.log("error", error.response.data);
    dispatch({
      type: ALL_ITEMS_FAILS,
      payload: error.response.data.error,
    });
  }
};

// get an item or a restauarant
export const getAnItem = (id, type) => async (dispatch) => {
  try {
    dispatch({ type: AN_ITEM_REQUEST });
    const { data } = await axios.get(`/items/api/y1/update/${id}`);
    dispatch({ type: AN_ITEM_SUCCESS, payload: data.item });
  } catch (error) {
    dispatch({ type: AN_ITEM_FAILS, payload: error.response.data.error });
  }
};
