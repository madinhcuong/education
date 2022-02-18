import * as types from "../constants/actionType";

var intialState = {
  data: [],
  infoLogs: {},
  success:false
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOADING_LOGS:
      return {
        ...state,
        success: true
      };

    case types.LIST_LOGS:
      state = { ...state, data: action.data, success:false };
      return state;

    default:
      return state;
  }
};

export default myReducer;
