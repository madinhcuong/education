import * as types from "../constants/actionType";
import errorCode from "../config/errorCode";
import { Delay_History_Goback } from "../helpers/base.helper";
import { Response_Error, Response_Success } from "../helpers/base.helper";
import API from "../utils/callApi";
import { message, notification } from "antd";
const callApi = new API();

export const actRequestListClassAll = (
  name_courses,
  name_class,
  status_class,
  check_seach
) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    if (check_seach) dispatch({ type: types.LOADING_CLASS });
    return callApi
      .callApiGet(
        `cms/api/get-list-class?name_courses=${name_courses}&name_class=${name_class}&status_class=${status_class}`,
        token
      )
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(ListClassAll(res.data));

          // Get statistic by id class
          if (res.data.length > 0 && res.data[0]._id) {
            dispatch(actRequestGetStatisticClassById(res.data[0]._id));
          }
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

export const ListClassAll = (data) => {
  return {
    type: types.LIST_CLASSALL,
    data,
  };
};

export const actRequestUpDateStatusClassAll = (id, data) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    return callApi
      .callApiPut(`cms/api/edit-status-class-all/${id}`, token, data)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestListClassAll("", "", "", false));
          message.success("Sửa thành công", 3);
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

export const actAddTimeDayByWeek = (data) => {
  return (dispatch) => {
    dispatch(Add_Time_Day_By_Week(data));
  };
};

export const Add_Time_Day_By_Week = (data) => {
  return {
    type: types.ADD_TIME_DAY_BY_WEEK,
    data,
  };
};

// xóa tất cả
export const actRequestDeleteAllDayByWeek = () => {
  return (dispatch) => {
    dispatch(DeleteAllDayByWeek());
  };
};

export const DeleteAllDayByWeek = () => {
  return {
    type: types.DELETE_All_DAY_BY_WEEK,
  };
};

export const actRequestCreateClassAll = (body, history) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPost("cms/api/create-class", token, body)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestListClassAll("", "", "", false));
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

export const actRequestDeleteDayByWeek = (id) => {
  return (dispatch) => {
    dispatch(DeleteDayByWeek(id));
  };
};

export const DeleteDayByWeek = (id) => {
  return {
    type: types.DELETE_DAY_BY_WEEK,
    id,
  };
};

export const actRequestGetClassAllById = (id) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    dispatch({ type: types.LOADING_CLASS });
    return callApi
      .callApiGet(`cms/api/get-classAll-by-id/${id}`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(GetClassAllById(res.data));
          dispatch(actAddTimeDayByWeek(res.data.time_day));
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

export const GetClassAllById = (data) => {
  return {
    type: types.INFOR_CLASS_All_BY_ID,
    data,
  };
};

export const actRequestGetClassByIdTeacher = (id) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    dispatch({ type: types.LOADING_CLASS });
    return callApi
      .callApiGet(`cms/api/get-class-byid-teacher-noPremission/${id}`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(GetClassByIdTeacher(res.data));
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

export const GetClassByIdTeacher = (data) => {
  return {
    type: types.GET_LIST_CLASS_BYID_TEACHER,
    data,
  };
};

export const actRequestUpDateClassAll = (id, data, history) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPut(`cms/api/update-class-all/${id}`, token, data)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestListClassAll("", "", "", false));
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

export const RestStore = () => {
  return {
    type: types.RESET_STORE_CLASSALL,
  };
};

export const actRequestListClassNoPermission = () => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    dispatch({ type: types.LOADING_CLASS });
    return callApi
      .callApiGet(`cms/api/list-class-noPremission`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(ListClassNoPermission(res.data));
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

export const ListClassNoPermission = (data) => {
  return {
    type: types.LIST_CLASS_NO_PERMISSION,
    data,
  };
};

export const actRequestUpDateTeacherByIdClass = (id, data, history) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPut(`cms/api/update-teacher-class/${id}`, token, data)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestListClassAll("", "", "", false));
          message.success("Thêm giáo viên thành công", 3);
          Delay_History_Goback(history);
        } else {
          let err = "";
          return Response_Error(err);
        }
      })
      .catch((err) => {
        dispatch(ErrorClass(`${errorCode(err.response.data.errcode)}`));
      });
  };
};

export const ErrorClass = (data) => {
  return {
    type: types.ERROR_CLASS,
    data,
  };
};

export const actRequestListStudentByIdClass = (id, name, check_seach) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    if (check_seach) dispatch({ type: types.LOADING_CLASS });
    return callApi
      .callApiGet(
        `cms/api/get-list-student-by-id-class/${id}?nameStudent=${name}`,
        token
      )
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(ListStudentByIdClass(res.data));
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

export const ListStudentByIdClass = (data) => {
  return {
    type: types.LIST_STUDENT_BYID_CLASS,
    data,
  };
};

export const actRequestImportScoreStudent = (id_class, formdata) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .Import(`cms/api/import-score-student/${id_class}`, token, formdata)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestListStudentByIdClass(id_class, "", false));
          message.success("Import điểm thành công", 3);
        }
      })
      .catch((err) => {
        if (
          err.response.data &&
          err.response.data.errcode === 108 &&
          err.response.data.message
        ) {
          for (let item of err.response.data.message) {
            notification.error({
              message: "Lỗi import điểm học viên",
              description: `${item.data}`,
              duration: 0,
            });
          }
          dispatch(actRequestListStudentByIdClass(id_class, "", false));
        }
      });
  };
};

export const actRequestGetExportScoreStudent = (id) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiGet(`cms/api/export-score-student/${id}`, token)
      .then((res) => {
        if (res && res.status === 200) {
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

// sua điểm học viên class
export const actRequestUpDateScoreStudent = (id_student, id_class, body) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    return callApi
      .callApiPut(
        `cms/api/update-score-student/${id_student}/${id_class}`,
        token,
        body
      )
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestListStudentByIdClass(id_class, "", false));
          message.success("Sửa thành công", 3);
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

// send Noti class
export const actRequestSendNotiClass = (body) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPost("cms/api/send-noti-class", token, body)
      .then((res) => {
        if (res && res.status === 200) {
          return Response_Success("Gửi thông báo thành công", "", true);
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

// infor Student by Id class and Id Student
export const actRequestInforStudentClass = (id_class, id_student, loading) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    if (loading) dispatch({ type: types.LOADING_CLASS });
    return callApi
      .callApiGet(
        `cms/api/get-infor-student-class/${id_class}/${id_student}`,
        token
      )
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(InforStudentClass(res.data));
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

export const InforStudentClass = (data) => {
  return {
    type: types.INFOR_STUDENT_CLASS,
    data,
  };
};

// ket thuc class
export const actRequestCloseClassByid = (id_class) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    return callApi
      .callApiPut(`cms/api/close-class-by-id/${id_class}`, token, {})
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestListStudentByIdClass(id_class, "", false));
          message.success("Sửa thành công", 3);
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

// --- thống kê class by id
export const actRequestGetStatisticClassById = (id, loading) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    if (loading) dispatch({ type: types.LOADING_CLASS });
    return callApi
      .callApiGet(`cms/api/get-statistic-by-id-class?id_Class=${id}`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(GetStatisticClassById(res.data));
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

export const GetStatisticClassById = (data) => {
  return {
    type: types.STATISTIC_BYID_CLASS,
    data,
  };
};

// --- thống kê class all
export const actRequestGetStatisticClassAll = () => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    dispatch({ type: types.LOADING_CLASS });
    return callApi
      .callApiGet(`cms/api/get-statistic-classAll`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(GetStatisticClassAll(res.data));
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

export const GetStatisticClassAll = (data) => {
  return {
    type: types.STATISTIC_CLASS_ALL,
    data,
  };
};
