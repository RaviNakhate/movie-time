import { searchObj, filterObj, dataObj } from "./object";

const searchState = (state = searchObj, { type, payload }) => {
  switch (type) {
    case "search":
      state.search = payload;
      return { ...state };
    default:
      return { ...state };
  }
};

const filterState = (state = filterObj, { type, payload }) => {
  switch (type) {
    case "filter":
      state.filter[payload].value = !state.filter[payload].value;
      return { ...state };
    case "filtertoggle":
      state.filtertoggle = !state.filtertoggle;
      return { ...state };
    default:
      return { ...state };
  }
};

const dataState = (state = dataObj, { type, payload }) => {
  switch (type) {
    case "modal":
      if (payload) {
        state.id = payload.id;
        state.media_type = payload.media_type;
        state.date = payload.date;
        state.details = payload.details;
      }
  state.value = !state.value;
      return { ...state };
    default:
      return { ...state };
  }
};

export { searchState, filterState, dataState };
