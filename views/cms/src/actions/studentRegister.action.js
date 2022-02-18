import * as types from "../constants/actionType";
import { message } from "antd";
import { Delay_History_Goback } from "../helpers/base.helper";
import { Response_Error } from "../helpers/base.helper";
import API from "../utils/callApi";
import { Modal } from "antd";
const callApi = new API();

export const actRequestListStudentRegisterLearn = (
  seach_name,
  seach_email,
  seach_class,
  seach_timeStart,
  seach_timeEnd,
  check_seach
) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    if (check_seach) dispatch({ type: types.LOADING_STUDENT_REGISTER });
    return callApi
      .callApiGet(
        `cms/api/get-list-student-register-learn?&name=${seach_name}&email=${seach_email}&class=${seach_class}&timeStart=${seach_timeStart}&timeEnd=${seach_timeEnd}`,
        token
      )
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(ListStudentRegisterLearn(res.data));
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

export const ListStudentRegisterLearn = (data) => {
  return {
    type: types.LIST_STUDENT_REGISTER_LEARN,
    data,
  };
};

export const actRequestUpdatePaymentStatusStudent = (id, data) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPut(`cms/api/update-payment-status/${id}`, token, data)
      .then((res) => {
        if (res && res.status === 200) {
          return Modal.success({
            title: "Nộp tiền học thành công",
            content: "",
            onOk: () => {
              dispatch(
                actRequestListStudentRegisterLearn("", "", "", "", "", false)
              );
            },
            className: "modal-success",
            centered: true,
            okButtonProps: { type: "primary", ghost: true },
          });
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

export const actRequestGetStudentRegisterById = (id, callback, loading) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    if (loading) dispatch({ type: types.LOADING_STUDENT_REGISTER });
    return callApi
      .callApiGet(`cms/api/get-student-register-by-id/${id}`, token)
      .then((res) => {
        let err = "";
        if (res && res.status === 200) {
          dispatch(GetStudentRegisterById(res.data));
          callback(err, true);
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

export const GetStudentRegisterById = (data) => {
  return {
    type: types.GET_STUDENT_REGISTER_BY_ID,
    data,
  };
};

export const actRequestCreateStudent = (body, history) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPost("cms/api/create-student", token, body)
      .then((res) => {
        if (res && res.status === 200) {
          return Modal.success({
            title: "Đăng ký học thành công",
            content: "Vui lòng nộp tiền trong thời gian sớm nhất",
            onOk: () => {
              dispatch(
                actRequestListStudentRegisterLearn("", "", "", "", "", false)
              );
              Delay_History_Goback(history);
            },
            className: "modal-success",
            centered: true,
            okButtonProps: { type: "primary", ghost: true },
          });
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

export const actRequestUpDateStudentRegister = (id, data, history) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPut(`cms/api/update-student-register/${id}`, token, data)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(
            actRequestListStudentRegisterLearn("", "", "", "", "", false)
          );
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

// Get thông tin học phí
export const actRequestGetInforTuitionByIdClass = (
  id,
  discount_code,
  email
) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    dispatch({ type: types.LOADING_STUDENT_REGISTER });
    return callApi
      .callApiGet(
        `cms/api/get-infor-tuition/${id}?discount_code=${discount_code}&email=${email}`,
        token
      )
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(GetInforTuitionByIdClass(res.data));
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

export const GetInforTuitionByIdClass = (data) => {
  return {
    type: types.GET_INFOR_TUITION_BY_ID_CLASS,
    data,
  };
};

// check invoice
export const actRequestCheckInvoice = (id, callback) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPut(`cms/api/check-invoice/${id}`, token, {})
      .then((res) => {
        if (res && res.status === 200) {
          let err = "";
          callback(err, true);
          dispatch(
            actRequestListStudentRegisterLearn("", "", "", "", "", false)
          );
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

// thong ke statistic
export const actRequestStatisticRegis = (time, loading) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    if (loading) dispatch({ type: types.LOADING_STUDENT_REGISTER });
    return callApi
      .callApiGet(`cms/api/statistic-regis?time=${time}`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(StatisticRegis(res.data));
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

export const StatisticRegis = (data) => {
  return {
    type: types.STATISTIC_REGIS,
    data,
  };
};

// thong ke thanh toán
export const actRequestStatisticRegisPayment = (time, loading) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    if (loading) dispatch({ type: types.LOADING_STUDENT_REGISTER });
    return callApi
      .callApiGet(`cms/api/statistic-regis-payment?time=${time}`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(StatisticRegisPayment(res.data));
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

export const StatisticRegisPayment = (data) => {
  return {
    type: types.STATISTIC_REGIS_PAYMENT,
    data,
  };
};
