import * as types from "../constants/actionType";
import { Modal } from "antd";
import errorCode from "../config/errorCode";
import { Delay_History_Goback } from "../helpers/base.helper";
import { message } from "antd";
import API from "../utils/callApi";
import * as socket from "../utils/socket_Client";
const callApi = new API();

export const actRequestInforClient = (loading) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token_client"));

    if (loading) dispatch({ type: types.INFOR_CLIENT_LOADING });
    return callApi
      .callApiGet("client/api/infor-student", token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(inforClient(res.data));

          // Gửi socket
          socket.url_socket.emit("room", res.data._id);
        } else {
          return Modal.warning({
            title: `${errorCode(0)}`,
            content: "",
          });
        }
      })
      .catch((err) => {
        if (err.response && err.response.data.errcode === 999) {
          localStorage.removeItem("access_token_client");
          return (window.location = "/client/dang-nhap");
        }
        dispatch(
          ErrorrInforClient(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const inforClient = (data) => {
  return {
    type: types.INFOR_CLIENT,
    data,
  };
};

export const actRequestUpdatePassWord = (body, history) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token_client"));
    return callApi
      .callApiPut("client/api/update-password", token, body)
      .then((res) => {
        if (res && res.status === 200) {
          return Modal.success({
            content: "Thay đổi mật khẩu thành công",
            className: "modal-success",
            centered: true,
            okButtonProps: { type: "primary", ghost: true },
            onOk: () => {
              localStorage.clear();
              history.push("/client/dang-nhap");
            },
          });
        } else {
          return Modal.warning({
            title: `${errorCode(0)}`,
            content: "",
          });
        }
      })
      .catch((err) => {
        dispatch(
          ErrorrInforClient(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const actRequestListInforDiscountClient = (loading) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token_client"));

    if (loading) dispatch({ type: types.INFOR_CLIENT_LOADING });
    return callApi
      .callApiGet("client/api/get-list-discount", token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(inforDiscountClient(res.data));
        } else {
          return Modal.warning({
            title: `${errorCode(0)}`,
            content: "",
          });
        }
      })
      .catch((err) => {
        dispatch(
          ErrorrInforClient(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const inforDiscountClient = (data) => {
  return {
    type: types.INFOR_DISCOUNT_CLIENT,
    data,
  };
};

export const actRequestUpDateInfoClient = (data, history) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token_client"));
    return callApi
      .callApiPut(`client/api/update-infor`, token, data)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestInforClient(false));
          message.success("Sửa thành công", 3);
          Delay_History_Goback(history);
        } else {
          return Modal.warning({
            title: `${errorCode(0)}`,
            content: "",
          });
        }
      })
      .catch((err) => {
        dispatch(
          ErrorrInforClient(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const ResetErrorInforClient = () => {
  return {
    type: types.RESET_ERROR_INFOR_CLIENT,
  };
};

export const ErrorrInforClient = (data) => {
  return {
    type: types.ERROR_INFOR_CLIENT,
    data,
  };
};
