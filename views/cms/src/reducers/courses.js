import * as types from "../constants/actionType";

var intialState = {
  data: [],
  data_no_premission: [],
  courses_ByID: {},
  success: false
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOADING_COURSES:
      return {
        ...state,
        success: true
      };

    case types.LIST_COURSES:
      state = { ...state, data: action.data , success: false};
      return state;

    case types.LIST_COURSES_NO_PERMISSION:
      state = { ...state, data_no_premission: action.data,  success: false };
      return state;

    case types.GET_COURSES_BY_ID:
      state = { ...state, courses_ByID: action.data,  success: false };
      return state;

    default:
      return state;
  }
};

export default myReducer;
