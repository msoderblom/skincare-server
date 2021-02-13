import { combineReducers } from "redux";
import { userReducer } from "./user";
import forumReducers from "./forum/reducers";

export default combineReducers({
  user: userReducer,
  forum: forumReducers,
});
