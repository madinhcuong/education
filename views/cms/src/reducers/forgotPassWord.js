import * as types from "../constants/actionType";

var intialState = {
  success: false,
  error: ""
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.RESET_FORGOT_PASSWORD:
      return {
        ...state,
        success: false,
        error: ""
      };

    case types.ERROR_FORGOT_PASSWORD:
      return {
        ...state,
        success: false,
        error: action.data
      };

    default:
      return state;
  }
};

export default myReducer;
