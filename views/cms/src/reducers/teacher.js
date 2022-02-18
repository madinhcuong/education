import * as types from "../constants/actionType";

var intialState = {
  list_Teacher: [],
  teacher_By_id: {},
  listTeachByIdClass: [],
  success: false
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOADING_TEACHER:
      return {
        ...state,
        success: true
      };

    case types.LIST_TEACHER:
      return { ...state, list_Teacher: action.data, success: false };

    case types.INFOR_TEACHER_BY_ID:
      state = { ...state, teacher_By_id: action.data, success: false };
      return state;

      case types.LIST_TEACHER_BY_ID_CLASS:
        state = { ...state, listTeachByIdClass: action.data, success: false };
        return state;

    default:
      return state;
  }
};

export default myReducer;
