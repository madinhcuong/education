import * as types from "../constants/actionType";

var intialState = {
  error: ""
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOGIN_CLIENT:
      localStorage.setItem(
        "access_token_client",
        JSON.stringify(action.data.access_token)
      );
      return { ...state, error: "" };

    case types.ERROR_LOGIN_CLIENT:
      state = {
        error: action.data
      };
      return { ...state };
    default:
      return state;
  }
};

export default myReducer;
