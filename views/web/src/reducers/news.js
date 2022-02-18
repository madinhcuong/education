import * as types from "../constants/actionType";
// import { findIndex } from "../helpers/base.helper";

var intialState = {
  dataNews: [],
  listNewsByIdTopic: {},
  newById: {},
  listNewsHome: [],
  loading: false,
  error: ""
};

let myReducer = (state = intialState, action) => {
  // let index = null;
  switch (action.type) {
    case types.LOADING_NEWS:
      return {
        ...state,
        loading: true,
        error: ""
      };

    case types.LIST_NEWS:
      state = {
        ...state,
        dataNews: action.data,
        loading: false,
        error: ""
      };
      return state;

    case types.LIST_NEWS_BYIY_TOPIC:
      state = {
        ...state,
        listNewsByIdTopic: action.data,
        loading: false,
        error: ""
      };
      return state;

    case types.NEWS_BYIY:
      state = {
        ...state,
        newById: action.data,
        loading: false,
        error: ""
      };
      return state;

    case types.LIST_NEWS_HOME:
      state = {
        ...state,
        listNewsHome: action.data,
        loading: false,
        error: ""
      };
      return state;

    case types.ERROR_NEWS: {
      console.log("ERROR_NEWS", action.data);
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
