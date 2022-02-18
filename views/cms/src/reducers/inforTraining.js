import * as types from "../constants/actionType";

var intialState = {
  data: [],
  infoTraining: {},
  success: false
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOADING_INFOR_TRAINING:
      return {
        ...state,
        success: true
      };

    case types.LIST_INFOR_TRAINING:
      state = { ...state, data: action.data, success: false };
      return state;

    case types.GET_INFOR_TRAINING_BY_ID:
      state = { ...state, infoTraining: action.data, success: false };
      return state;

    default:
      return state;
  }
};

export default myReducer;
