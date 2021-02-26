import { combineReducers } from "redux";
import { threadsReducer } from "./threads";
import { commentsReducer } from "./comments";

export default combineReducers({
  threads: threadsReducer,
  comments: commentsReducer,
});
