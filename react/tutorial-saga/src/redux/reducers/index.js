import { combineReducers } from "redux";
import list from "./list";
import filter from "./filter";
import loading from "./loading";

export default combineReducers({
  list,
  filter,
  loading,
});
