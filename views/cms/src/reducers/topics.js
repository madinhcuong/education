import * as types from "../constants/actionType";

var intialState = {
  topics: [],
  listTopicByNews: [],
  topicById: {},
  success: false
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOADING_TOPIC:
      return {
        ...state,
        success: true
      };

    case types.LIST_TOPIC:
      return { ...state, topics: action.data, success: false };

    case types.LIST_TOPIC_BY_NEWS:
      return { ...state, listTopicByNews: action.data, success: false };

    case types.GETBYID_TOPIC:
      return { ...state, topicById: action.data, success: false };

    default:
      return state;
  }
};

export default myReducer;
