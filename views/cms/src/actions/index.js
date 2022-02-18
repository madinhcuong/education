import * as types from "../constants/actionType";
import { Modal, notification } from "antd";
import errorCode from "../config/errorCode";
import API from "../utils/callApi";
const callApi = new API();

export const actRequestLogin = (body, history, cb) => {
  return (dispatch) => {
    return callApi
      .callApiPost("cms/api/login", null, body)
      .then((res) => {
        if (res && res.status === 200) {
          cb(true);

          dispatch(loginCms(res.data));
          history.push("/admin");

          notification.success({
            message: "Đăng nhập thành công",
            description: "Chào mừng quay trở lại với Trí Nguyễn",
          });
        } else {
          cb(false);
          return Modal.warning({
            title: `${errorCode(0)}`,
            content: "",
            className: "modal-error",
            okButtonProps: { type: "primary", ghost: true },
            centered: true,
          });
        }
      })
      .catch((err) => {
        cb(false);
        dispatch(
          ErrorrLoginCms(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const loginCms = (body) => {
  return {
    type: types.LOGIN_CMS,
    body,
  };
};

export const ErrorrLoginCms = (data) => {
  return {
    type: types.ERROR_LOGIN_CMS,
    data,
  };
};
