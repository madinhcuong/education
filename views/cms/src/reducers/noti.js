import * as types from "../constants/actionType";

var intialState = {
  listNoti: {},
  success: false,
  error: "",
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOADING_NOTI:
      return {
        ...state,
        success: true,
      };

    case types.GET_LIST_NOTI:
      state = {
        ...state,
        listNoti: action.data,
        success: false,
        error: "",
      };
      return state;

    case types.ERROR_NOTI:
      console.log("ERROR_NOTI", action.data);
      state = { ...state, error: action.data, success: false };
      return state;

    default:
      return state;
  }
};

export default myReducer;
