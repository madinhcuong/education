import * as types from "../constants/actionType";
import { message } from "antd";
import { Delay_History_Goback } from "../helpers/base.helper";
import { Response_Error } from "../helpers/base.helper";
import API from "../utils/callApi";
const callApi = new API();

export const actRequestListTeacher = (
  seach_name,
  seach_email,
  seach_status,
  check_seach
) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    if (check_seach) dispatch({ type: types.LOADING_TEACHER });
    return callApi
      .callApiGet(
        `cms/api/get-infor-teacher?seach_name=${seach_name}&seach_email=${seach_email}&seach_status=${seach_status}`,
        token
      )
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(ListTeacher(res.data));
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

export const ListTeacher = (data) => {
  return {
    type: types.LIST_TEACHER,
    data,
  };
};

export const actRequestTeacherById = (id) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    dispatch({ type: types.LOADING_TEACHER });
    return callApi
      .callApiGet(`cms/api/get-teacher-by-id/${id}`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(GetTeacherById(res.data));
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

export const GetTeacherById = (data) => {
  return {
    type: types.INFOR_TEACHER_BY_ID,
    data,
  };
};

export const actRequestTeacherByIdClass = (id) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    dispatch({ type: types.LOADING_TEACHER });
    return callApi
      .callApiGet(`cms/api/get-list-teacher-by-id-class/${id}`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(GetTeacherByIdClass(res.data));
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

export const GetTeacherByIdClass = (data) => {
  return {
    type: types.LIST_TEACHER_BY_ID_CLASS,
    data,
  };
};

export const actRequestUpDateTeacher = (id, data, history) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPut(`cms/api/update-teacher/${id}`, token, data)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestListTeacher("", "", "", false));
          message.success("Sửa thành công", 3);
          Delay_History_Goback(history);
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

export const actRequestUpDateStatusTeacher = (id, data) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPut(`cms/api/update-status-teacher/${id}`, token, data)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestListTeacher("", "", "", false));
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

export const actRequestCreateTeacher = (body, history) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPost("cms/api/create-teacher", token, body)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestListTeacher("", "", "", false));
          message.success("Thêm mới thành công", 3);
          Delay_History_Goback(history);
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
