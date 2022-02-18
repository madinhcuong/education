import * as types from "../constants/actionType";

var intialState = {
  listCourse: [],
  loading: false,
  error: ""
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOADING_COURSES:
      return {
        ...state,
        loading: true,
        error: ""
      };

    case types.LIST_COURSES:
      state = {
        ...state,
        listCourse: action.data,
        loading: false,
        error: ""
      };
      return state;

    case types.ERROR_COURSES: {
      console.log("ERROR_COURSES", action.data);
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
