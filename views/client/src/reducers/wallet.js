import * as types from "../constants/actionType";

var intialState = {
  listAff: {},
  historyChangeScore: {},
  loading: false,
  success: false,
  error: "",
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.WALLET_LOADING:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case types.SUCCESS_WALLET:
      state = { ...state, success: true, error: "", loading: false };
      return state;

    case types.LIST_AFF_WALLET:
      state = {
        ...state,
        listAff: action.data,
        success: true,
        error: "",
        loading: false,
      };
      return state;

    case types.ERROR_WALLET:
      console.log("ERROR_WALLET", action.data);
      state = { ...state, error: action.data, loading: false };
      return state;

    case types.HISTORY_CHANGE_SCORE:
      state = { ...state, historyChangeScore: action.data, loading: false };
      return state;

    case types.RESET_ERROR_WALLET:
      state = { ...state, success: false, error: "", loading: false };
      return state;

    default:
      return state;
  }
};

export default myReducer;
