import * as types from "../constants/actionType";

var intialState = "";

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.INFOR_ADMIN:
      return action.infor;

    default:
      return state;
  }
};

export default myReducer;
