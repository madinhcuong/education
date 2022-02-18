import * as types from "../constants/actionType";
import { Response_Error } from "../helpers/base.helper";
import API from "../utils/callApi";
const callApi = new API();

export const actRequestListLogs = () => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    dispatch({ type: types.LOADING_LOGS });
    return callApi
      .callApiGet(`cms/api/get-list-logs`, token)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(ListLogs(res.data));
        } else {
          let err = "";
          return Response_Error(err);
        }
      })
      .catch(err => {
        Response_Error(err);
      });
  };
};

export const ListLogs = data => {
  return {
    type: types.LIST_LOGS,
    data
  };
};
