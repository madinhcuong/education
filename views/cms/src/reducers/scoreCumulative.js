import * as types from "../constants/actionType";
//import { findIndex } from "../helpers/base.helper";

var intialState = {
  list_score: [],
  scoreById: {},
  listAff: {},
  success: false,
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOADING_SCORE_CUMULATIVE:
      return {
        ...state,
        success: true,
      };

    case types.LIST_SCORE_CUMULATIVE:
      state = { ...state, list_score: action.data, success: false };
      return state;

    case types.GET_SCORE_CUMULATIVE_BY_ID:
      state = {
        ...state,
        scoreById: action.data,
        success: false,
      };
      return state;

    case types.LIST_AFF_BY_ID:
      state = {
        ...state,
        listAff: action.data,
        success: false,
      };
      return state;

    default:
      return state;
  }
};

export default myReducer;
