import * as types from "../constants/actionType";

var intialState = {
  dataCarousel: {},
  success: false,
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOADING_CAROUSEL:
      return {
        ...state,
        success: true,
      };

    case types.GET_LIST_CAROUSEL:
      state = { ...state, dataCarousel: action.data, success: false };
      return state;

    default:
      return state;
  }
};

export default myReducer;
