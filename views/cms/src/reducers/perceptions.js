import * as types from "../constants/actionType";

var intialState = {
  dataPerceptions: {},
  perceptionsById: {},
  success: false,
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOADING_PERCEPTIONS:
      return {
        ...state,
        success: true,
      };

    case types.GET_LIST_PERCEPTIONS:
      state = { ...state, dataPerceptions: action.data, success: false };
      return state;

    case types.GET_PERCEPTIONS_BY_ID:
      state = { ...state, perceptionsById: action.data, success: false };
      return state;

    default:
      return state;
  }
};

export default myReducer;
