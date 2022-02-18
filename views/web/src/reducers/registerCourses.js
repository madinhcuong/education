import * as types from "../constants/actionType";

var intialState = {
  dataClass: {},
  loading: false,
  loadPagePayment: false,
  loadingButton: false,
  error: "",
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOADING_REGISTER_COURSES:
      return {
        ...state,
        loading: true,
        loadingButton: false,
        loadPagePayment: false,
        error: "",
      };

    // loading button
    case types.LOAD_BUTTON_REGISTER:
      return {
        ...state,
        loading: false,
        loadingButton: true,
        loadPagePayment: false,
        error: "",
      };

    case types.LIST_REGISTER_COURSES:
      state = {
        ...state,
        dataClass: action.data,
        loading: false,
        loadingButton: false,
        loadPagePayment: false,
        error: "",
      };
      return state;

    // load page payment
    case types.LOAD_PAGE_PAYMENT:
      state = {
        ...state,
        loadPagePayment: true,
        loading: false,
        loadingButton: false,
        error: "",
      };
      return state;

    case types.ERROR_REGISTER_COURSES: {
      console.log("ERROR_REGISTER_COURSES", action.data);
      return {
        ...state,
        loading: false,
        loadingButton: false,
        loadPagePayment: false,
        error: action.data,
      };
    }

    case types.RESET_REGISTER_COURSES: {
      state = { ...state, error: "", loadPagePayment: false };
      return state;
    }

    default:
      return state;
  }
};

export default myReducer;
