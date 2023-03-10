import { createStore } from "redux";
import { combineReducers } from "redux";
import { searchState, dataState, filterState } from "./reducer";

const rootReducer = combineReducers({
  searchState,
  dataState,
  filterState,
});

export const store = createStore(rootReducer);
