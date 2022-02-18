import * as types from "../constants/actionType";
import { findIndex, sort_array_list_day } from "../helpers/base.helper";

var intialState = {
  dataClassALL: [],
  dataClassNoPermission: [],
  classAll_ByID: {},
  date_time_by_week: [],
  listClassByIdTeacher: [],
  listStudentByIdClass: [],
  inforStudentClass: {},
  statisticByIdClass: [],
  statisticClassAll: [],
  success: false,
  error: "",
};

let myReducer = (state = intialState, action) => {
  let index = null;
  switch (action.type) {
    case types.LOADING_CLASS:
      return {
        ...state,
        success: true,
        error: "",
      };

    case types.LIST_CLASSALL:
      state = {
        ...state,
        dataClassALL: action.data,
        success: false,
        error: "",
      };
      return state;

    case types.INFOR_CLASS_All_BY_ID:
      state = {
        ...state,
        classAll_ByID: action.data,
        listClassByIdTeacher: [],
        success: false,
        error: "",
      };
      return state;

    case types.LIST_CLASS_NO_PERMISSION:
      state = {
        ...state,
        dataClassNoPermission: action.data,
        success: false,
        error: "",
      };
      return state;

    case types.GET_LIST_CLASS_BYID_TEACHER:
      state = {
        ...state,
        listClassByIdTeacher: action.data,
        success: false,
        error: "",
      };
      return state;

    // infor student class
    case types.INFOR_STUDENT_CLASS:
      state = {
        ...state,
        inforStudentClass: action.data,
        success: false,
        error: "",
      };
      return state;

    // Statistic ById Class
    case types.STATISTIC_BYID_CLASS:
      state = {
        ...state,
        statisticByIdClass: action.data,
        success: false,
        error: "",
      };
      return state;

    // Statistic  Class all
    case types.STATISTIC_CLASS_ALL:
      state = {
        ...state,
        statisticClassAll: action.data,
        success: false,
        error: "",
      };
      return state;

    case types.LIST_STUDENT_BYID_CLASS:
      state = {
        ...state,
        listStudentByIdClass: action.data,
        success: false,
        error: "",
      };
      return state;

    case types.ADD_TIME_DAY_BY_WEEK:
      if (Array.isArray(action.data)) {
        state.date_time_by_week = action.data;
        state.date_time_by_week.sort(sort_array_list_day);
        return { ...state };
      }

      if (action.data.delete_day_week) {
        state.date_time_by_week = [];
        return { ...state };
      }

      if (typeof action.data) {
        state.date_time_by_week.push(action.data);
        state.date_time_by_week.sort(sort_array_list_day);
        return { ...state };
      }
      return { ...state };

    case types.DELETE_DAY_BY_WEEK:
      index = findIndex(state.date_time_by_week, action.id);
      state.date_time_by_week.splice(index, 1);
      return { ...state };

    case types.DELETE_All_DAY_BY_WEEK:
      state.date_time_by_week.splice(0, state.date_time_by_week.length);
      return { ...state };

    case types.RESET_STORE_CLASSALL:
      state.classAll_ByID = {};
      state.date_time_by_week = [];
      return { ...state };

    case types.ERROR_CLASS: {
      return {
        ...state,
        success: false,
        error: action.data,
      };
    }

    default:
      return state;
  }
};

export default myReducer;
