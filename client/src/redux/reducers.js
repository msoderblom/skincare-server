import { combineReducers } from "redux";
import { userReducer } from "./user";
import forumReducers from "./forum/reducers";
import { skinfluencersReducer } from "./skinfluencers";

export default combineReducers({
  user: userReducer,
  forum: forumReducers,
  skinfluencers: skinfluencersReducer,
});
