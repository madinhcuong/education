import * as types from "../constants/actionType";

var intialState = {
  inforAgentCode: {},
  loading: false,
  error: ""
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.INFOR_AGENT_CODE_LOADING:
      return {
        ...state,
        loading: true,
        error: ""
      };

    case types.INFOR_AGENT_CODE:
      state = { ...state, inforAgentCode: action.data, loading: false, error: "" };
      return state;

    case types.ERROR_INFOR_AGENT_CODE:
      console.log("ERROR_INFOR_AGENT_CODE", action.data);
      state = { ...state, error: action.data, loading: false };
      return state;

    default:
      return state;
  }
};

export default myReducer;
