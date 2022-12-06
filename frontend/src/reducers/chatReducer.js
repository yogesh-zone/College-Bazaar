import {
  ALL_CHATS_FAILS,
  ALL_CHATS_REQUEST,
  ALL_CHATS_SUCCESS,
  MESSAGE_FAILS,
  MESSAGE_REQUEST,
  MESSAGE_SUCCESS,
  SELECTED_CHAT_FAILS,
  SELECTED_CHAT_REQUEST,
  SELECTED_CHAT_SUCCESS,
} from "../constants";

export const selectedChatReducer = (state = { selectedChat: null }, action) => {
  switch (action.type) {
    case SELECTED_CHAT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SELECTED_CHAT_SUCCESS:
      return {
        loding: false,
        selectedChat: action.payload,
      };
    case SELECTED_CHAT_FAILS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const allChatsReducer = (state = { chats: [] }, action) => {
  switch (action.type) {
    case ALL_CHATS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_CHATS_SUCCESS:
      return {
        loding: false,
        chats: action.payload,
      };
    case ALL_CHATS_FAILS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const allMessageReducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MESSAGE_SUCCESS:
      return {
        loding: false,
        messages: action.payload,
      };
    case MESSAGE_FAILS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
