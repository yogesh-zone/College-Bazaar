import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./reducers/userReducer";
import {
  allChatsReducer,
  allMessageReducer,
  selectedChatReducer,
} from "./reducers/chatReducer";

const reducer = combineReducers({
  user: userReducer,
  chat: selectedChatReducer,
});
const middleware = [thunk];
const store = createStore(
  reducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
