import * as types from "../constants/actionType";
import { Modal } from "antd";
import errorCode from "../config/errorCode";
import API from "../utils/callApi";
import { message } from "antd";
const callApi = new API();

export const actRequestSendPay = (body, callback) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token_client"));
    return callApi
      .callApiPost("client/api/send-pay", token, body)
      .then((res) => {
        if (res && res.status === 200) {
          message.success("Gửi yêu cầu thành công", 3);
          callback(true);
        } else {
          return Modal.warning({
            title: `${errorCode(0)}`,
            content: "",
          });
        }
      })
      .catch((err) => {
        dispatch(
          ErrorPay(`${errorCode(err.response && err.response.data.errcode)}`)
        );
        callback(false);
      });
  };
};

export const ErrorPay = (data) => {
  return {
    type: types.ERROR_PAY,
    data,
  };
};
