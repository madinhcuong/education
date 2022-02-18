import * as types from "../constants/actionType";

var intialState = {
  dataIntroContact: [],
  success: false,
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOADING_INTRO_CONTACT:
      return {
        ...state,
        success: true,
      };

    case types.GET_LIST_INTRO_CONTACT:
      state = { ...state, dataIntroContact: action.data, success: false };
      return state;

    default:
      return state;
  }
};

export default myReducer;
