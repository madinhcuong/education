import * as types from "../constants/actionType";

var intialState = {
  listPermission: [],
  error: "",
  success: false
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOADING_INFOR_USER:
      return {
        ...state,
        success: true,
        error: ""
      };

    case types.LIST_PERMISSION:
      state = {
        ...state,
        listPermission: action.data,
        success: false,
        error: ""
      };
      return state;

    case types.ERROR_INFOR_USER:
      state = { ...state, error: action.data, success: false };
      return state;

    case types.RESET_INFOR_USER:
      state = { listPermission: [], error: "", success: false };
      return state;

    default:
      return state;
  }
};

export default myReducer;
