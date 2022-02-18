import * as types from "../constants/actionType";

var intialState = {
  resultStatus: false,
  resultData: {},
  loading: false,
  error: "",
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOADING_PAGE_PAYMENT:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case types.RESET_CHECKOUT_PAYMENT:
      return {
        ...state,
        resultStatus: false,
        loading: false,
        resultData: "",
        error: "",
      };

    case types.RESULT_DATA_PAYMENT:
      return {
        ...state,
        resultStatus: true,
        resultData: action.data,
        error: "",
        loading: false,
      };

    default:
      return state;
  }
};

export default myReducer;
