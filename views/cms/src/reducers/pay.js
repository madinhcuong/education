import * as types from "../constants/actionType";

var intialState = {
  listPay: {},
  success: false,
  getPayById: {},
  error: "",
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOADING_PAY:
      return {
        ...state,
        success: true,
      };

    case types.GET_LIST_PAY:
      state = {
        ...state,
        listPay: action.data,
        success: false,
        error: "",
      };
      return state;

    case types.GET_PAY_BY_ID:
      state={
        ...state,
        getPayById: action.data,
        success: false,
        error: "",
      }
      return state;

    default:
      return state;
  }
};

export default myReducer;
