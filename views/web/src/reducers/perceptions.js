import * as types from "../constants/actionType";

var intialState = {
  listPerceptions: [],
  loading: false,
  error: ""
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOADING_PERCEPTIONS:
      return {
        ...state,
        loading: true,
        error: ""
      };

    case types.GET_LIST_PERCEPTIONS:
      state = {
        ...state,
        listPerceptions: action.data,
        loading: false,
        error: ""
      };
      return state;

    case types.ERROR_PERCEPTIONS: {
      console.log("ERROR_PERCEPTIONS", action.data);
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
