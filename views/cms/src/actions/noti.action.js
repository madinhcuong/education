import * as types from "../constants/actionType";
import { Response_Error } from "../helpers/base.helper";
import errorCode from "../config/errorCode";
import API from "../utils/callApi";
const callApi = new API();

export const actRequestGetListNoti = (page, limit, loading) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    if (loading) dispatch({ type: types.LOADING_NOTI });
    return callApi
      .callApiGet(`cms/api/get-list-noti?page=${page}&limit=${limit}`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(GetListNoti(res.data));
        } else {
          let err = "";
          return Response_Error(err);
        }
      })
      .catch((err) => {
        dispatch(
          ErrorrNoti(`${errorCode(err.response && err.response.data.errcode)}`)
        );
      });
  };
};

export const GetListNoti = (data) => {
  return {
    type: types.GET_LIST_NOTI,
    data,
  };
};

// ckeck click noti
export const actRequestCheckClickNoti = () => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPut("cms/api/check-click-noti", token, {})
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestGetListNoti(1, 10, false));
        } else {
           let err = "";
          return Response_Error(err);
        }
      })
      .catch((err) => {
        dispatch(
          ErrorrNoti(`${errorCode(err.response && err.response.data.errcode)}`)
        );
      });
  };
};

export const ErrorrNoti = (data) => {
  return {
    type: types.ERROR_NOTI,
    data,
  };
};
