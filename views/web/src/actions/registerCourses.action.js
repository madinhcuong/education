import * as types from "../constants/actionType";
import swal from "sweetalert";
import errorCode from "../config/errorCode";
import { Delay_History_Goback } from "../helpers/base.helper";
import API from "../utils/callApi";
import { Modal } from "antd";
const callApi = new API();

export const actRequestGetDataClassById = (
  id_class,
  email,
  discount_code,
  loading
) => {
  return (dispatch) => {
    if (loading) dispatch({ type: types.LOADING_REGISTER_COURSES });
    return callApi
      .callApiGet(
        `web/api/get-class-byid/${id_class}?email=${email}&discount_code=${discount_code}`
      )
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(GetDataClassById(res.data));
        } else {
          return swal(`${errorCode(0)}`, "", "error");
        }
      })
      .catch((err) => {
        dispatch(
          ErrorDataClassById(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const GetDataClassById = (data) => {
  return {
    type: types.LIST_REGISTER_COURSES,
    data,
  };
};

export const actRequestCreateStudent = (body, history) => {
  return (dispatch) => {
    return callApi
      .callApiPost("web/api/create-student", body)
      .then((res) => {
        if (res && res.status === 200) {
          return Modal.success({
            title: `Đăng ký học thành công`,
            content: "Vui lòng nộp tiền trong thời gian sớm nhất",
            onOk: () => {
              Delay_History_Goback(history);
            },
            className: "modal-error",
            okButtonProps: { type: "primary", ghost: true },
            centered: true,
          });
        } else {
          return swal(`${errorCode(0)}`, "", "error111");
        }
      })
      .catch((err) => {
        dispatch(
          ErrorDataClassById(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const ErrorDataClassById = (data) => {
  return {
    type: types.ERROR_REGISTER_COURSES,
    data,
  };
};

export const ResetStateRegister = () => {
  return {
    type: types.RESET_REGISTER_COURSES,
  };
};

// thanh toán paypal
export const actRequestCreateStudentAndPaymentPaypal = (body, history) => {
  return (dispatch) => {
    // loading button register
    dispatch({ type: types.LOAD_BUTTON_REGISTER });

    return callApi
      .callApiPost("web/api/create-paypal", body)
      .then((res) => {
        if (res && res.status === 200) {
          // load page payment
          // dispatch({ type: types.LOAD_PAGE_PAYMENT });
          window.location.replace(`${res.data}`);
        } else {
          return swal(`${errorCode(0)}`, "", "error111");
        }
      })
      .catch((err) => {
        dispatch(
          ErrorDataClassById(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

// cập nhật db khi thanh toán thành công paypal
export const actRequestSendIdBodyPaymentPaypal = (data) => {
  return (dispatch) => {
    // loading page payment
    dispatch({ type: types.LOADING_PAGE_PAYMENT });

    return callApi
      .callApiGet(`web/api/success/${data}`)
      .then((res) => {
        if (res && res.status === 200) {
          let data_result = { status: "SUCCESS", data: res.data };
          dispatch(ResultDataPayment(data_result));
          // dispatch(ResultDataPayment("SUCCESS"));
        } else {
          return swal(`${errorCode(0)}`, "", "error");
        }
      })
      .catch((err) => {
        dispatch(
          ResultDataPayment({
            status: "ERROR",
            data: `${errorCode(err.response && err.response.data.errcode)}`,
          })
        );
      });
  };
};

// thanh toán VN_PAY
export const actRequestCreateStudentAndPaymentVnpay = (body) => {
  return (dispatch) => {
    // loading button register
    dispatch({ type: types.LOAD_BUTTON_REGISTER });

    return callApi
      .callApiPost("web/api/create-vnpay", body)
      .then((res) => {
        if (res && res.status === 200) {
          window.location.replace(`${res.data}`);
        } else {
          return swal(`${errorCode(0)}`, "", "error111");
        }
      })
      .catch((err) => {
        dispatch(
          ErrorDataClassById(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

// cập nhật db khi thanh toán thành công VnPay
export const actRequestSendIdBodyPaymentVnPay = (data) => {
  return (dispatch) => {
    // loading page payment
    dispatch({ type: types.LOADING_PAGE_PAYMENT });

    return callApi
      .callApiGet(`web/api/vnpay-return/${data}`)
      .then((res) => {
        if (res && res.status === 200) {
          let data_result = { status: "SUCCESS", data: res.data };
          dispatch(ResultDataPayment(data_result));
        } else {
          return swal(`${errorCode(0)}`, "", "error");
        }
      })
      .catch((err) => {
        dispatch(
          ResultDataPayment({
            status: "ERROR",
            data: `${errorCode(err.response && err.response.data.errcode)}`,
          })
        );
      });
  };
};

// thanh toán MoMo
export const actRequestCreateStudentAndPaymentMomo = (body) => {
  return (dispatch) => {
    // loading button register
    dispatch({ type: types.LOAD_BUTTON_REGISTER });

    return callApi
      .callApiPost("web/api/payment-momo", body)
      .then((res) => {
        if (res && res.status === 200) {
          console.log("res", res);
          if (res.data.errorCode === 0 || res.data.errorCode === "0") {
            window.location.replace(`${res.data.payUrl}`);
          }
        } else {
          return swal(`${errorCode(0)}`, "", "error111");
        }
      })
      .catch((err) => {
        dispatch(
          ErrorDataClassById(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

// cập nhật db khi thanh toán thành công MoMo
export const actRequestSendIdBodyPaymentMoMo = (data) => {
  return (dispatch) => {
    // loading page payment
    dispatch({ type: types.LOADING_PAGE_PAYMENT });

    return callApi
      .callApiGet(`web/api/payment-callback-momo/${data}`)
      .then((res) => {
        if (res && res.status === 200) {
          let data_result = { status: "SUCCESS", data: res.data };
          dispatch(ResultDataPayment(data_result));
        } else {
          return swal(`${errorCode(0)}`, "", "error");
        }
      })
      .catch((err) => {
        dispatch(
          ResultDataPayment({
            status: "ERROR",
            data: `${errorCode(err.response && err.response.data.errcode)}`,
          })
        );
      });
  };
};

export const ResultDataPayment = (data) => {
  return {
    type: types.RESULT_DATA_PAYMENT,
    data,
  };
};
