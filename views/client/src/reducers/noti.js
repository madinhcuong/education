import * as types from "../constants/actionType";

var intialState = {
  listNoti: {},
  inforNoti: {},
  loading: false,
  error: "",
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.NOTI_LOADING:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case types.GET_LIST_NOTI:
      state = { ...state, listNoti: action.data, error: "", loading: false };
      return state;

    case types.INFOR_NOTI:
      state = { ...state, inforNoti: action.data, error: "", loading: false };
      return state;

    case types.ERROR_NOTI:
      console.log("ERROR_WALLET", action.data);
      state = { ...state, error: action.data, loading: false };
      return state;

    default:
      return state;
  }
};

export default myReducer;
