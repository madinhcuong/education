import * as types from "../constants/actionType";
//import { findIndex } from "../helpers/base.helper";

var intialState = {
  list_student: [],
  studentById: {},
  classStudentById: [],
  success: false
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOADING_STUDENT:
      return {
        ...state,
        success: true
      };

    case types.LIST_STUDENT:
      state = { ...state, list_student: action.data, success: false };
      return state;

    case types.GET_STUDENT_BY_ID:
      state = {
        ...state,
        studentById: action.data,
        success: false
      };
      return state;

    case types.GET_CLASS_STUDENT:
      state = {
        ...state,
        classStudentById: action.data,
        success: false
      };
      return state;

    default:
      return state;
  }
};

export default myReducer;
