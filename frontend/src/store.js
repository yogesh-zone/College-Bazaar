import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./reducers/userReducer";
import { adReducer, allAdsReducer } from "./reducers/adReducer";
import {
  allChatsReducer,
  allMessageReducer,
  selectedChatReducer,
} from "./reducers/chatReducer";

const reducer = combineReducers({
  user: userReducer,
  ads: allAdsReducer,
  ad: adReducer,
  chat: selectedChatReducer,
  chats: allChatsReducer,
  messages: allMessageReducer,
});
const middleware = [thunk];
const store = createStore(
  reducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
