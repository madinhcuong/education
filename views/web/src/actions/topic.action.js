import * as types from "../constants/actionType";
import swal from "sweetalert";
import errorCode from "../config/errorCode";
import API from "../utils/callApi";
const callApi = new API();

export const actRequestGetListTopicHome = loading => {
  return dispatch => {
    if (loading) dispatch({ type: types.LOADING_TOPIC });
    return callApi
      .callApiGet(`web/api/get-infor-topic`)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(GetListTopicMenu(res.data));
        } else {
          return swal(`${errorCode(0)}`, "", "error");
        }
      })
      .catch(err => {
        dispatch(ErrorTopic(`${errorCode(err.response && err.response.data.errcode)}`));
      });
  };
};

export const GetListTopicMenu = data => {
  return {
    type: types.LIST_TOPIC,
    data
  };
};

export const ErrorTopic = data => {
  return {
    type: types.ERROR_TOPIC,
    data
  };
};
