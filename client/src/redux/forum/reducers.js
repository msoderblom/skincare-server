import { combineReducers } from "redux";
import { threadsReducer } from "./threads";

export default combineReducers({
  threads: threadsReducer,
});
