import * as types from "../constants/actionType";
import { findIndex } from "../helpers/base.helper";

var intialState = {
  dataTeacher: [],
  teacherById: {},
  loading: false,
  error: ""
};

let myReducer = (state = intialState, action) => {
  let index = null;
  switch (action.type) {
    case types.LOADING_TEACHER:
      return {
        ...state,
        loading: true,
        error: ""
      };

    case types.LIST_TEACHER:
      state = {
        ...state,
        dataTeacher: action.data,
        loading: false,
        error: ""
      };
      return state;

    case types.TEACHER_BY_ID:
      let id = action.data;
      index = findIndex(state.dataTeacher, id);
      state = {
        ...state,
        teacherById: state.dataTeacher[index],
        loading: false,
        error: ""
      };
      return state;

    case types.ERROR_TEACHER: {
      console.log("ERROR_TEACHER", action.data);
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
