import * as types from "../constants/actionType";
import swal from "sweetalert";
import errorCode from "../config/errorCode";
import API from "../utils/callApi";
const callApi = new API();

export const actRequestGetListCourses = loading => {
  return dispatch => {
    if (loading) dispatch({ type: types.LOADING_COURSES });
    return callApi
      .callApiGet(`web/api/get-list-courses`)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(GetListCourses(res.data));
        } else {
          return swal(`${errorCode(0)}`, "", "error");
        }
      })
      .catch(err => {
        dispatch(
          ErrorCourses(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const GetListCourses = data => {
  return {
    type: types.LIST_COURSES,
    data
  };
};

export const ErrorCourses = data => {
  return {
    type: types.ERROR_COURSES,
    data
  };
};
