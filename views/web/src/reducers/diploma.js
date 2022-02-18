import * as types from "../constants/actionType";

var intialState = {
  listDiploma: {},
  loading: false,
  error: "",
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOADING_DIPLOMA:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case types.LIST_DIPLOMA:
      state = {
        ...state,
        listDiploma: action.data,
        loading: false,
        error: "",
      };
      return state;

    case types.ERROR_DIPLOMA: {
      console.log("ERROR_DIPLOMA", action.data);
      return {
        ...state,
        listDiploma: {},
        loading: false,
        error: action.data,
      };
    }

    case types.RESET_DIPLOMA:
      state = {
        listDiploma: {},
        loading: false,
        error: "",
      };
      return state;

    default:
      return state;
  }
};

export default myReducer;
