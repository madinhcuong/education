import * as types from "../constants/actionType";

var intialState = {
  statistic_obj: {},
  statistic_ByMonth: {},
  total_statistic: {},
  statisticByDate: {},
  success: false,
  error: "",
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOADING_STATISTIC:
      return {
        ...state,
        success: true,
      };

    case types.GET_STATISTIC_BY_YEAR:
      state = {
        ...state,
        statistic_obj: action.data,
        success: false,
        error: "",
      };
      return state;

    case types.GET_STATISTIC_BY_MONTH:
      state = {
        ...state,
        statistic_ByMonth: action.data,
        success: false,
        error: "",
      };
      return state;

    case types.GET_TOTAL_STATISTIC:
      state = {
        ...state,
        total_statistic: action.data,
        success: false,
        error: "",
      };
      return state;

    case types.GET_STATISTIC_BY_DATE:
      state = {
        ...state,
        statisticByDate: action.data,
        success: false,
        error: "",
      };
      return state;

    case types.ERROR_STATISTIC:
      console.log("ERROR_STATISTIC", action.data);
      state = { ...state, error: action.data, success: false };
      return state;

    case types.RESET_STATISTIC:
      state = { ...state, statisticByDate: {}, success: false };
      return state;

    default:
      return state;
  }
};

export default myReducer;
