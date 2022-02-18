import * as types from "../constants/actionType";
import swal from "sweetalert";
import errorCode from "../config/errorCode";
//import { Delay_History_Goback } from "../helpers/base.helper";
//import { Response_Error } from "../helpers/base.helper";
import API from "../utils/callApi";
// import { message } from "antd";
const callApi = new API();

export const actRequestGetListTeacherHome = loading => {
  return dispatch => {
    if (loading) dispatch({ type: types.LOADING_TEACHER });
    return callApi
      .callApiGet(`web/api/get-list-teacher`)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(GetListTeacherHome(res.data));
        } else {
          return swal(`${errorCode(0)}`, "", "error");
        }
      })
      .catch(err => {
        dispatch(ErrorTeacher(`${errorCode(err.response && err.response.data.errcode)}`));
      });
  };
};

export const GetListTeacherHome = data => {
  return {
    type: types.LIST_TEACHER,
    data
  };
};

export const actRequestGetTeacherById = id => {
  return dispatch => {
    dispatch(GetTeacherById(id));
  };
};

export const GetTeacherById = data => {
  return {
    type: types.TEACHER_BY_ID,
    data
  };
};

export const ErrorTeacher = data => {
  return {
    type: types.ERROR_TEACHER,
    data
  };
};
