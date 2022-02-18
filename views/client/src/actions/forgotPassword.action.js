import * as types from "../constants/actionType";
import errorCode from "../config/errorCode";
import API from "../utils/callApi";
import { Modal } from "antd";
const callApi = new API();

export const actRequestSendEmailResetPass = (body, history, cb) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token_client"));
    return callApi
      .callApiPost("client/api/send-mail-reset-password", token, body)
      .then((res) => {
        if (res && res.status === 200) {
          cb(true);
          return Modal.success({
            title: "Gửi email thành công",
            content: "",
            onOk: () => {
              history.push("/client/reset-mat-khau");
            },
            className: "modal-success",
            centered: true,
            okButtonProps: { type: "primary", ghost: true },
          });
        }
      })
      .catch((err) => {
        cb(false);
        dispatch(
          ErrorForGotPass(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const actRequestResetPassWord = (body, history) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token_client"));
    return callApi
      .callApiPost("client/api/reset-password", token, body)
      .then((res) => {
        if (res && res.status === 200) {
          return Modal.success({
            title: "Đổi mật khẩu thành công",
            content: "",
            onOk: () => {
              history.push("/client/dang-nhap");
            },
            className: "modal-success",
            centered: true,
            okButtonProps: { type: "primary", ghost: true },
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
          ErrorForGotPass(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const ResetForGotPass = () => {
  return {
    type: types.RESET_FORGOT_PASSWORD,
  };
};

export const ErrorForGotPass = (data) => {
  return {
    type: types.ERROR_FORGOT_PASSWORD,
    data,
  };
};
