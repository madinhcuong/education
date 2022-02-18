import * as types from "../constants/actionType";

var intialState = {
  listDiploma: {},
  diploma_ByID: {},
  success: false,
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOADING_DIPLOMA:
      return {
        ...state,
        success: true,
      };

    case types.GET_LIST_DIPLOMA:
      state = { ...state, listDiploma: action.data, success: false };
      return state;

    case types.GET_DIPLOMA_BY_ID:
      state = { ...state, diploma_ByID: action.data, success: false };
      return state;

    default:
      return state;
  }
};

export default myReducer;
