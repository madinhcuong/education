import * as types from "../constants/actionType";
// import { findIndex } from "../helpers/base.helper";

var intialState = {
  dataTopic: [],
  loading: false,
  error: ""
};

let myReducer = (state = intialState, action) => {
  // let index = null;
  switch (action.type) {
    case types.LOADING_TOPIC:
      return {
        ...state,
        loading: true,
        error: ""
      };

    case types.LIST_TOPIC:
      state = {
        ...state,
        dataTopic: action.data,
        loading: false,
        error: ""
      };
      return state;

    case types.ERROR_TOPIC: {
      console.log("ERROR_TOPIC", action.data);
      return {
        ...state,
        loading: false,
        error: action.data
      };
    }

    default:
      return state;
  }
};

export default myReducer;
