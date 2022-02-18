import * as types from "../constants/actionType";
import { message } from "antd";
import { Delay_History_Goback } from "../helpers/base.helper";
import { Response_Error } from "../helpers/base.helper";
import API from "../utils/callApi";
const callApi = new API();

export const actRequestListStaff = (
  seach_name,
  seach_email,
  seach_status,
  check_seach
) => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    if (check_seach) dispatch({ type: types.LOADING_STAFF });
    return callApi
      .callApiGet(
        `cms/api/get-infor-staff?seach_name=${seach_name}&seach_email=${seach_email}&seach_status=${seach_status}`,
        token
      )
      .then(res => {
        if (res && res.status === 200) {
          dispatch(ListStaff(res.data));
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

export const ListStaff = data => {
  return {
    type: types.LIST_STAFF,
    data
  };
};

export const actRequestUpDateStatusStaff = (id, data) => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPut(`cms/api/update-status-staff/${id}`, token, data)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(actRequestListStaff("", "", "", false));
          message.success("Cập nhật trạng thái thành công", 3);
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

export const actRequestCreateStaff = (body, history) => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPost("cms/api/create-staff", token, body)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(actRequestListStaff("", "", "", true));
          message.success("Thêm mới thành công", 3);
          Delay_History_Goback(history);
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

export const actRequestStaffById = id => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    dispatch({ type: types.LOADING_STAFF });
    return callApi
      .callApiGet(`cms/api/get-staff-by-id/${id}`, token)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(GetStaffById(res.data));
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

export const GetStaffById = data => {
  return {
    type: types.INFOR_STAFF_BYID,
    data
  };
};

export const actRequestUpDateStaff = (id, data, history) => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPut(`cms/api/update-staff/${id}`, token, data)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(actRequestListStaff("", "", "", false));
          message.success("Sửa thành công", 3);
          Delay_History_Goback(history);
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
