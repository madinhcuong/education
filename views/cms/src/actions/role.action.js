import * as types from "../constants/actionType";
import { Delay_History_Goback } from "../helpers/base.helper";
import { message } from "antd";
import { Response_Error } from "../helpers/base.helper";
import API from "../utils/callApi";
const callApi = new API();

export const actRequestListRole = (seach, check_seach) => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    if (check_seach) dispatch({ type: types.LOADING_ROLE });
    return callApi
      .callApiGet(`cms/api/get-list-permission?seach_name=${seach}`, token)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(ListRole(res.data));
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

export const ListRole = data => {
  return {
    type: types.LIST_ROLE,
    data
  };
};

export const actRequestCreateRole = (body, history) => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPost("cms/api/create-permission", token, body)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(actRequestListRole("", false));
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

export const actRequestPermissionRole = id => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    dispatch({ type: types.LOADING_ROLE });
    return callApi
      .callApiGet(`cms/api/get-permission-by-id/${id}`, token)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(GetRoleById(res.data));
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

export const GetRoleById = data => {
  return {
    type: types.GET_PERMISSION_ROLE,
    data
  };
};

export const actRequestUpDateRole = (id, data, history) => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPut(`cms/api/update-permission/${id}`, token, data)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(actRequestListRole("", false));
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

export const actRequestListRoleByTeacher_Staff = () => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    dispatch({ type: types.LOADING_ROLE });
    return callApi
      .callApiGet(`cms/api/get-list-role-by-teacher-staff`, token)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(ListRoleByTeacher_Staff(res.data));
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

export const ListRoleByTeacher_Staff = data => {
  return {
    type: types.LIST_ROLE_BY_TEACHER_STAFF,
    data
  };
};
