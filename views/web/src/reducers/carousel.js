import * as types from "../constants/actionType";

var intialState = {
  listCarousel: [],
  loading: false,
  error: ""
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOADING_CAROUSEL:
      return {
        ...state,
        loading: true,
        error: ""
      };

    case types.GET_LIST_CAROUSEL:
      state = {
        ...state,
        listCarousel: action.data,
        loading: false,
        error: ""
      };
      return state;

    case types.ERROR_CAROUSEL: {
      console.log("ERROR_CAROUSEL", action.data);
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
