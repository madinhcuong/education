import * as types from "../constants/actionType";

var intialState = {
  list_Staff: [],
  staff_By_id: {},
  success: false
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOADING_STAFF:
      return {
        ...state,
        success: true
      };

    case types.LIST_STAFF:
      return { ...state, list_Staff: action.data, success: false };

    case types.INFOR_STAFF_BYID:
      state = { ...state, staff_By_id: action.data,  success: false };
      return state;

    default:
      return state;
  }
};

export default myReducer;
