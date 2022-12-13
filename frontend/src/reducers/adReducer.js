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

export const allAdsReducer = (state = { ads: [] }, action) => {
  switch (action.type) {
    case ALL_ITEMS_REQUEST:
      return {
        loading: true,
        ads: [],
      };
    case ALL_FILTERS_SUCCESS:
      return {
        ...state,
        loading: false,
        ads: action.payload,
      };
    case ALL_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        ads: action.payload,
      };
    case ALL_ITEMS_FAILS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const adReducer = (state = { ad: null }, action) => {
  switch (action.type) {
    case AN_ITEM_REQUEST:
      console.log("AN_ITEM_REQUEST");
      return {
        loading: true,
        ad: null,
      };
    case AN_ITEM_SUCCESS:
      console.log("AN_ITEM_SUCCESS");
      return {
        ...state,
        loading: false,
        ad: action.payload,
      };
    case AN_ITEM_FAILS:
      console.log("AN_ITEM_FAILS");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
