import * as types from "../constants/actionType";
//import { findIndex } from "../helpers/base.helper";

var intialState = {
  list_student: [],
  list_student_register: [],
  studentRegisterById: {},
  inforTuitionIdClass: {},
  statisticRegis: [],
  statisticRegisPayment: [],
  success: false,
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOADING_STUDENT_REGISTER:
      return {
        ...state,
        success: true,
      };

    case types.LIST_STUDENT_REGISTER_LEARN:
      state = {
        ...state,
        list_student_register: action.data,
        success: false,
        inforTuitionIdClass: {},
      };
      return state;

    case types.GET_INFOR_TUITION_BY_ID_CLASS:
      state = { ...state, inforTuitionIdClass: action.data, success: false };
      return state;

    case types.GET_STUDENT_REGISTER_BY_ID:
      state = {
        ...state,
        studentRegisterById: action.data,
        success: false,
      };
      return state;

    case types.STATISTIC_REGIS:
      state = {
        ...state,
        statisticRegis: action.data,
        success: false,
      };
      return state;

    case types.STATISTIC_REGIS_PAYMENT:
      state = {
        ...state,
        statisticRegisPayment: action.data,
        success: false,
      };
      return state;

    default:
      return state;
  }
};

export default myReducer;
