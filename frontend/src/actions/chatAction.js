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
import axios from "axios";
export const selecetedChat =
  (chat = null, id = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: SELECTED_CHAT_REQUEST });
      if (id) {
        const { data } = await axios.post(`/api/chat/${id}`);
        dispatch({ type: SELECTED_CHAT_SUCCESS, payload: data.chat });
      } else {
        dispatch({ type: SELECTED_CHAT_SUCCESS, payload: chat });
      }
    } catch (error) {
      dispatch({
        type: SELECTED_CHAT_FAILS,
        payload: error.response.data.error,
      });
    }
  };

export const allChats = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CHATS_REQUEST });
    const { data } = await axios.get("/api/chat");
    console.log("chats ", data.chats);
    dispatch({ type: ALL_CHATS_SUCCESS, payload: data.chats });
  } catch (error) {
    dispatch({ type: ALL_CHATS_FAILS, payload: error.response.data.error });
  }
};

export const allMessages = (chatId) => async (dispatch) => {
  try {
    dispatch({ type: MESSAGE_REQUEST });
    const { data } = await axios.get(`/api/message/all/${chatId}`);
    dispatch({ type: MESSAGE_SUCCESS, payload: data.msg });
  } catch (error) {
    dispatch({ type: MESSAGE_FAILS, payload: error.response.data.error });
  }
};
