import * as types from "../constants/actionType";

var intialState = {
  infoClient: {},
  discountClient: [],
  loading: false,
  error: ""
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.INFOR_CLIENT_LOADING:
      return {
        ...state,
        loading: true,
        error: ""
      };

    case types.INFOR_CLIENT:
      state = { ...state, infoClient: action.data, loading: false, error: "" };
      return state;

    case types.INFOR_DISCOUNT_CLIENT:
      state = {
        ...state,
        discountClient: action.data,
        loading: false,
        error: ""
      };
      return state;

    case types.ERROR_INFOR_CLIENT:
      console.log("ERROR_INFOR_CLIENT", action.data);
      state = { ...state, error: action.data, loading: false };
      return state;

    case types.RESET_ERROR_INFOR_CLIENT:
      state = { ...state, error: "", loading: false };
      return state;

    default:
      return state;
  }
};

export default myReducer;
