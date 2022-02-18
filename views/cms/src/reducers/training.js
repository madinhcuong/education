import * as types from "../constants/actionType";

var findIndex = (data, id) => {
  let local = null;
  data.forEach((item, key) => {
    if (item._id === id) {
      local = key;
    }
    return local;
  });
  return local;
};

var intialState = {
  list_training: [],
  listTrainingByTeacher: [],
  success: false
};

let myReducer = (state = intialState, action) => {
  let index = null;
  switch (action.type) {
    case types.LOADING_TRAINING:
      return {
        ...state,
        success: true
      };

    case types.LIST_TRAINING:
      return { ...state, list_training: action.data, success: false };

    case types.LIST_TRAINING_TEACHER:
      return { ...state, listTrainingByTeacher: action.data, success: false };

    case types.CREATE_TRAINING:
      state.unshift(action.data);
      return [...state];

    case types.UPDATE_TRAINING:
      index = findIndex(state, action.data._id);
      state[index] = action.data;
      return [...state];

    default:
      return state;
  }
};

export default myReducer;
