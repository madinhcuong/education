import * as types from "../constants/actionType";
import { Response_Error } from "../helpers/base.helper";
import API from "../utils/callApi";
import { message } from "antd";
const callApi = new API();

export const actRequestGetListPay = (name, email, page, limit, loading) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    if (loading) dispatch({ type: types.LOADING_PAY });
    return callApi
      .callApiGet(
        `cms/api/get-list-pay?name=${name}&email=${email}&page=${page}&limit=${limit}`,
        token
      )
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(ListPay(res.data));
        } else {
          let err = "";
          return Response_Error(err);
        }
      })
      .catch((err) => {
        Response_Error(err);
      });
  };
};

export const ListPay = (data) => {
  return {
    type: types.GET_LIST_PAY,
    data,
  };
};

export const actRequestUpDatePay = (id) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPut(`cms/api/update-pay/${id}`, token, {})
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestGetListPay("", "", false));
          message.success("Cập nhật trạng thái thành công", 3);
        } else {
          let err = "";
          return Response_Error(err);
        }
      })
      .catch((err) => {
        Response_Error(err);
      });
  };
};

// get infor pay
export const actRequestGetPayById = (id_pay, callback) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiGet(
        `cms/api/get-pay-byId/${id_pay}`,
        token
      )
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(GetPayById(res.data));
          callback(true)
        } else {
          let err = "";
          callback(false)
          return Response_Error(err);
        }
      })
      .catch((err) => {
        callback(false)
        Response_Error(err);
      });
  };
};

export const GetPayById = (data) => {
  return {
    type: types.GET_PAY_BY_ID,
    data,
  };
};