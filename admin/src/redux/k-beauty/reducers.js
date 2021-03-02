import { combineReducers } from "redux";
import { brandsReducer } from "./brands";

import { resellersReducer } from "./resellers";

export default combineReducers({
  brands: brandsReducer,
  resellers: resellersReducer,
});
