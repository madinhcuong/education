import * as types from "../constants/actionType";
import { Modal } from "antd";
import errorCode from "../config/errorCode";
import { message } from "antd";
import API from "../utils/callApi";
import { actRequestInforClient } from "./inforClient.action";
import { actRequestGetListNoti } from "./notification";
const callApi = new API();

export const actRequestChangeScoreByMoney = (body, cb) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token_client"));
    return callApi
      .callApiPost("client/api/score-money", token, body)
      .then((res) => {
        if (res && res.status === 200) {
          message.success("Đổi điểm thành công", 3);
          dispatch(actRequestInforClient(false));
          dispatch(SuccessWallet());

          cb();
        } else {
          return Modal.warning({
            title: `${errorCode(0)}`,
            content: "",
          });
        }
      })
      .catch((err) => {
        dispatch(
          ErrorrWallet(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
        cb();
      });
  };
};

export const actRequestChangeScoreByDiscount = (body, cb) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token_client"));
    return callApi
      .callApiPost("client/api/score-discount", token, body)
      .then((res) => {
        if (res && res.status === 200) {
          message.success("Đổi điểm thành công", 3);
          dispatch(actRequestInforClient(false));
          dispatch(SuccessWallet());

          cb();
        } else {
          return Modal.warning({
            title: `${errorCode(0)}`,
            content: "",
          });
        }
      })
      .catch((err) => {
        dispatch(
          ErrorrWallet(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
        cb();
      });
  };
};

// chuyển tiền
export const actRequestTransferScore = (body, cb) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token_client"));
    return callApi
      .callApiPost("client/api/score-transfer", token, body)
      .then((res) => {
        if (res && res.status === 200) {
          message.success("Chuyển điểm thành công", 3);
          dispatch(actRequestInforClient(false));
          dispatch(SuccessWallet());

          cb(true);
        } else {
          return Modal.warning({
            title: `${errorCode(0)}`,
            content: "",
          });
        }
      })
      .catch((err) => {
        dispatch(
          ErrorrWallet(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
        cb(false);
      });
  };
};

export const SuccessWallet = () => {
  return {
    type: types.SUCCESS_WALLET,
  };
};

export const ErrorrWallet = (data) => {
  return {
    type: types.ERROR_WALLET,
    data,
  };
};

export const ResetErrorrWallet = () => {
  return {
    type: types.RESET_ERROR_WALLET,
  };
};

// list aff
export const actRequestListAff = (name, email, loading) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token_client"));

    if (loading) dispatch({ type: types.WALLET_LOADING });
    return callApi
      .callApiGet(`client/api/get-list-aff?name=${name}&email=${email}`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(ListAff(res.data));
        } else {
          return Modal.warning({
            title: `${errorCode(0)}`,
            content: "",
          });
        }
      })
      .catch((err) => {
        dispatch(
          ErrorrWallet(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const ListAff = (data) => {
  return {
    type: types.LIST_AFF_WALLET,
    data,
  };
};

// history change score
export const actRequestHistoryChangeScore = (page, limit, loading) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token_client"));

    if (loading) dispatch({ type: types.WALLET_LOADING });
    return callApi
      .callApiGet(
        `client/api/history-change-score?page=${page}&limit=${limit}`,
        token
      )
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(HistoryChangeScore(res.data));
        } else {
          return Modal.warning({
            title: `${errorCode(0)}`,
            content: "",
          });
        }
      })
      .catch((err) => {
        dispatch(
          ErrorrWallet(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const HistoryChangeScore = (data) => {
  return {
    type: types.HISTORY_CHANGE_SCORE,
    data,
  };
};

// tu chối, xác nhận chuyển tiền
export const actRequestUpdateVeriTransferScore = (id_noti, body) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token_client"));
    return callApi
      .callApiPut(`client/api/veri-score-transfer/${id_noti}`, token, body)
      .then((res) => {
        if (res && res.status === 200) {
          message.success(
            `${
              body.type === "APPROVE"
                ? "Xác nhận đổi điểm"
                : "Từ chối chuyển điểm"
            } thành công`,
            3
          );
          dispatch(actRequestInforClient(false));
          dispatch(actRequestGetListNoti(1, 10, false));
        } else {
          return Modal.warning({
            title: `${errorCode(0)}`,
            content: "",
          });
        }
      })
      .catch((err) => {
        return Modal.warning({
          title: `${errorCode(err.response && err.response.data.errcode)}`,
          content: "",
          className: "modal-error",
          okButtonProps: { type: "primary", ghost: true },
          centered: true,
        });
      });
  };
};
