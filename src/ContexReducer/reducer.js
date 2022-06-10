export const reducer = (state, action) => {
  switch (action.type) {
    case "search":
      state.search = action.payload;
      return { ...state };
    case "searchtype":
      state.searchtype = action.payload;
      return { ...state };
    case "filter":
      state.filter[action.payload].value = !state.filter[action.payload].value;
      return { ...state };
    case "all":
      state.all = action.payload;
      return { ...state };
    case "modal":
      state.modal.value = !state.modal.value;
      if (action.payload) {
        state.modal.id = action.payload.id;
        state.modal.media_type = action.payload.media_type;
        state.modal.date = action.payload.date;
        state.modal.details = action.payload.details;
      }
      return { ...state };
    default:
      return state;
  }
};
