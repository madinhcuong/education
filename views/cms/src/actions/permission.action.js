import * as types from "../constants/actionType";
import { Response_Error } from "../helpers/base.helper";
import API from "../utils/callApi";
const callApi = new API();

export const actRequestListPermission = () => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiGet(`cms/api/get-list-add-permission`, token)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(ListPermission(res.data));
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

export const ListPermission = data => {
  return {
    type: types.LIST_PERMISSION,
    data
  };
};
