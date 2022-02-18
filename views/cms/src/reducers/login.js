import * as types from "../constants/actionType";

var intialState = {
  error: ""
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOGIN_CMS:
      localStorage.setItem(
        "access_token",
        JSON.stringify(action.body.access_token)
      );
      return { ...state, error: "" };

    case types.ERROR_LOGIN_CMS:
      state = {
        error: action.data
      };
      return { ...state };
    default:
      return state;
  }
};

export default myReducer;
