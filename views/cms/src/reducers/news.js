import * as types from "../constants/actionType";

var intialState = {
  new: [],
  newById: {},
  success: false
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOADING_NEW:
      return {
        ...state,
        success: true
      };

    case types.LIST_NEWS:
      return { ...state, new: action.data, success: false };

    case types.INFOR_NEWS_BY_ID:
      return { ...state, newById: action.data, success: false };

    default:
      return state;
  }
};

export default myReducer;
