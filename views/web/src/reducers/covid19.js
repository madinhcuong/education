import * as types from "../constants/actionType";

var intialState = {
  inforCovid19Vi: {},
  inforCovid19WD: {},
  loading: false,
  error: "",
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOADING_COVID19:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case types.DATA_COVID19_VI:
      state = {
        ...state,
        inforCovid19Vi: action.data,
        loading: false,
        error: "",
      };
      return state;

    case types.DATA_COVID19_WD:
      state = {
        ...state,
        inforCovid19WD: action.data,
        loading: false,
        error: "",
      };
      return state;

    case types.ERROR_COVID19: {
      console.log("ERROR_COVID19", action.data);
      return {
        ...state,
        loading: false,
        error: action.data,
      };
    }

    default:
      return state;
  }
};

export default myReducer;
