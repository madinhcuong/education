import * as types from "../constants/actionType";
// import { findIndex } from "../helpers/base.helper";

var intialState = {
  ListTrainingById: {},
  GetInforTrainingById: {},
  loading: false,
  error: ""
};

let myReducer = (state = intialState, action) => {
  // let index = null;
  switch (action.type) {
    case types.LOADING_INFORTRAINING:
      return {
        ...state,
        loading: true,
        error: ""
      };

    case types.LIST_INFORTRAINING:
      state = {
        ...state,
        ListTrainingById: action.data,
        loading: false,
        error: ""
      };
      return state;

    case types.GET_BYID_INFORTRAINING:
      state = {
        ...state,
        GetInforTrainingById: action.data,
        loading: false,
        error: ""
      };
      return state;

    case types.ERROR_INFORTRAINING: {
      console.log("ERROR_INFORTRAINING", action.data);
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
