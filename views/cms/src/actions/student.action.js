import * as types from "../constants/actionType";
import { message } from "antd";
import { Delay_History_Goback } from "../helpers/base.helper";
import { Response_Error } from "../helpers/base.helper";
import API from "../utils/callApi";
const callApi = new API();

export const actRequestListStudent = (seach_name, seach_email, seach) => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    if (!seach) dispatch({ type: types.LOADING_STUDENT });
    return callApi
      .callApiGet(
        `cms/api/get-list-student?&name=${seach_name}&email=${seach_email}`,
        token
      )
      .then(res => {
        if (res && res.status === 200) {
          dispatch(ListStudent(res.data));
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

export const ListStudent = data => {
  return {
    type: types.LIST_STUDENT,
    data
  };
};

export const actRequestGetStudentById = id => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    dispatch({ type: types.LOADING_STUDENT });
    return callApi
      .callApiGet(`cms/api/get-student-by-id/${id}`, token)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(GetStudentById(res.data));
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

export const GetStudentById = data => {
  return {
    type: types.GET_STUDENT_BY_ID,
    data
  };
};

export const actRequestGetClassStudentById = id => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    dispatch({ type: types.LOADING_STUDENT });
    return callApi
      .callApiGet(`cms/api/get-class-student-by-id/${id}`, token)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(GetClassStudentById(res.data));
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

export const GetClassStudentById = data => {
  return {
    type: types.GET_CLASS_STUDENT,
    data
  };
};

export const actRequestUpDateStudent = (id, data, history) => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPut(`cms/api/update-student/${id}`, token, data)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(actRequestListStudent("", "", true));
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
