import * as types from "../constants/actionType";

var intialState = {
  scheduleClass: [],
  scoreClass: {},
  loading: false,
  error: ""
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.CLASS_LOADING:
      return {
        ...state,
        loading: true,
        error: ""
      };

    case types.SCHEDULE_CLASS:
      state = {
        ...state,
        scheduleClass: action.data,
        loading: false,
        error: ""
      };
      return state;

    case types.SCORE_CLASS:
      state = {
        ...state,
        scoreClass: action.data,
        loading: false,
        error: ""
      };
      return state;

    case types.ERROR_CLASS:
      console.log("ERROR_CLASS", action.data);
      state = { ...state, error: action.data, loading: false };
      return state;

    default:
      return state;
  }
};

export default myReducer;
