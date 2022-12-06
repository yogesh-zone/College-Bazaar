import {
  ALL_ITEMS_FAILS,
  ALL_ITEMS_REQUEST,
  ALL_ITEMS_SUCCESS,
  AN_ITEM_FAILS,
  AN_ITEM_REQUEST,
  AN_ITEM_SUCCESS,
} from "../constants";

export const allAdsReducer = (state = { ads: null }, action) => {
  switch (action.type) {
    case ALL_ITEMS_REQUEST:
      return {
        loding: true,
        ads: null,
      };
    case ALL_ITEMS_SUCCESS:
      return {
        ...state,
        loding: false,
        ads: action.payload,
      };
    case ALL_ITEMS_FAILS:
      return {
        ...state,
        loding: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const adReducer = (state = { ad: null }, action) => {
  switch (action.payload) {
    case AN_ITEM_REQUEST:
      return {
        loading: true,
        ad: null,
      };
    case AN_ITEM_SUCCESS:
      return {
        laoding: false,
        ad: action.paylaod,
      };
    case AN_ITEM_FAILS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
