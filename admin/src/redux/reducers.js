import { combineReducers } from "redux";
import { userReducer } from "./user";
import forumReducers from "./forum/reducers";
import blogReducers from "./blog/reducers";
import kBeautyReducers from "./k-beauty/reducers";
import { skinfluencersReducer } from "./skinfluencers";

export default combineReducers({
  user: userReducer,
  blog: blogReducers,
  forum: forumReducers,
  skinfluencers: skinfluencersReducer,
  kBeauty: kBeautyReducers,
});
