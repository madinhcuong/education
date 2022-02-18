import * as types from "../constants/actionType";

var intialState = {
  list_role: [],
  roleById: {},
  listRoleByTeacherStaff: [],
  success: false
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOADING_ROLE:
      return {
        ...state,
        success: true
      };

    case types.LIST_ROLE:
      return { ...state, list_role: action.data, success: false };

    case types.GET_PERMISSION_ROLE:
      return { ...state, roleById: action.data, success: false };

    case types.LIST_ROLE_BY_TEACHER_STAFF:
      return { ...state, listRoleByTeacherStaff: action.data, success: false };

    default:
      return state;
  }
};

export default myReducer;
