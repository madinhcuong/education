import * as types from "../constants/actionType";
import { Modal, notification } from "antd";
import errorCode from "../config/errorCode";
import API from "../utils/callApi";
const callApi = new API();

export const actRequestLoginClient = (body, history, cb) => {
  return (dispatch) => {
    return callApi
      .callApiPost("client/api/login", null, body)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(loginClient(res.data));
          history.push("/client");

          notification.success({
            className: "noti-login-success",
            message: "Đăng nhập thành công",
            description: "Chào mừng quay trở lại với Trí Nguyễn",
            //  duration: 0,
          });

          cb(true);
        } else {
          cb(false);
          return Modal.warning({
            title: `${errorCode(0)}`,
            content: "",
          });
        }
      })
      .catch((err) => {
        cb(false);
        dispatch(
          ErrorrLoginClient(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const loginClient = (data) => {
  return {
    type: types.LOGIN_CLIENT,
    data,
  };
};

export const ErrorrLoginClient = (data) => {
  return {
    type: types.ERROR_LOGIN_CLIENT,
    data,
  };
};
