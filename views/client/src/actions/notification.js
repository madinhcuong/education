import * as types from "../constants/actionType";
import { Modal } from "antd";
import errorCode from "../config/errorCode";
import API from "../utils/callApi";
const callApi = new API();

export const actRequestGetListNoti = (page, limit, loading) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token_client"));

    if (loading) dispatch({ type: types.NOTI_LOADING });
    return callApi
      .callApiGet(`client/api/get-list-noti?page=${page}&limit=${limit}`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(ListNoti(res.data));
        } else {
          return Modal.warning({
            title: `${errorCode(0)}`,
            content: "",
          });
        }
      })
      .catch((err) => {
        dispatch(
          ErrorrNoti(`${errorCode(err.response && err.response.data.errcode)}`)
        );
      });
  };
};

export const ListNoti = (data) => {
  return {
    type: types.GET_LIST_NOTI,
    data,
  };
};

// ckeck click noti
export const actRequestCheckClickNoti = () => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token_client"));
    return callApi
      .callApiPut("client/api/check-click-noti", token, {})
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestGetListNoti(1, 10, false));
        } else {
          return Modal.warning({
            title: `${errorCode(0)}`,
            content: "",
          });
        }
      })
      .catch((err) => {
        dispatch(
          ErrorrNoti(`${errorCode(err.response && err.response.data.errcode)}`)
        );
      });
  };
};

// change status noti
export const actRequestChangeStatusNoti = (id) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token_client"));
    return callApi
      .callApiPut(`client/api/change-status-noti/${id}`, token, {})
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestGetListNoti(1, 10, false));
        } else {
          return Modal.warning({
            title: `${errorCode(0)}`,
            content: "",
          });
        }
      })
      .catch((err) => {
        dispatch(
          ErrorrNoti(`${errorCode(err.response && err.response.data.errcode)}`)
        );
      });
  };
};

// infor noti
export const actRequestGetInforNoti = (id, loading) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token_client"));

    if (loading) dispatch({ type: types.NOTI_LOADING });
    return callApi
      .callApiGet(`client/api/info-noti/${id}`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(InforNoti(res.data));
        } else {
          return Modal.warning({
            title: `${errorCode(0)}`,
            content: "",
          });
        }
      })
      .catch((err) => {
        dispatch(
          ErrorrNoti(`${errorCode(err.response && err.response.data.errcode)}`)
        );
      });
  };
};

export const InforNoti = (data) => {
  return {
    type: types.INFOR_NOTI,
    data,
  };
};

export const ErrorrNoti = (data) => {
  return {
    type: types.ERROR_NOTI,
    data,
  };
};
