import { combineReducers } from "redux";

import { resellersReducer } from "./resellers";

export default combineReducers({
  resellers: resellersReducer,
});
