import * as types from "../constants/actionType";
import { Delay_History_Goback } from "../helpers/base.helper";
import { Response_Error } from "../helpers/base.helper";
import API from "../utils/callApi";
import { message } from "antd";
const callApi = new API();

export const actRequestListCourses = (
  name_courses,
  name_training,
  check_seach
) => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    if (check_seach) dispatch({ type: types.LOADING_COURSES });
    return callApi
      .callApiGet(
        `cms/api/get-list-courses?name_courses=${name_courses}&name_training=${name_training}`,
        token
      )
      .then(res => {
        if (res && res.status === 200) {
          dispatch(ListCourses(res.data));
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

export const ListCourses = data => {
  return {
    type: types.LIST_COURSES,
    data
  };
};

export const actRequestGetCoursesNoPermission = () => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    dispatch({ type: types.LOADING_COURSES });
    return callApi
      .callApiGet(`cms/api/get-list-courses-no-permission`, token)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(GetListCoursesNoPermission(res.data));
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

export const GetListCoursesNoPermission = data => {
  return {
    type: types.LIST_COURSES_NO_PERMISSION,
    data
  };
};

export const actRequestGetCoursesById = id => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    dispatch({ type: types.LOADING_COURSES });
    return callApi
      .callApiGet(`cms/api/get-course-by-id/${id}`, token)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(GetCoursesById(res.data));
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

export const GetCoursesById = data => {
  return {
    type: types.GET_COURSES_BY_ID,
    data
  };
};

export const actRequestCreateCourses = (body, history) => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPost("cms/api/create-courses", token, body)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(actRequestListCourses("", "", false));
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

export const actRequestUpDateCourses = (id, data, history) => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPut(`cms/api/edit-courses/${id}`, token, data)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(actRequestListCourses("", "", false));
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

export const actRequestUpDateStatusCourses = (id, data) => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPut(`cms/api/edit-status-courses/${id}`, token, data)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(actRequestListCourses("", "", false));
          message.success("Sửa thành công", 3);
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
