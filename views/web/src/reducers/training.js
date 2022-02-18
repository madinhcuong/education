import * as types from "../constants/actionType";
// import { findIndex } from "../helpers/base.helper";

var intialState = {
  dataTraining: [],
  ListTrainingById: {},
  loading: false,
  error: ""
};

let myReducer = (state = intialState, action) => {
  // let index = null;
  switch (action.type) {
    case types.LOADING_TRAINING:
      return {
        ...state,
        loading: true,
        error: ""
      };

    case types.LIST_TRAINING:
      state = {
        ...state,
        dataTraining: action.data,
        loading: false,
        error: ""
      };
      return state;

    case types.LIST_TRAINING_BY_ID:
      state = {
        ...state,
        ListTrainingById: action.data,
        loading: false,
        error: ""
      };
      return state;

    case types.ERROR_TRAINING: {
      console.log("ERROR_TRAINING", action.data);
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
