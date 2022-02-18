import * as types from "../constants/actionType";
import { Modal } from "antd";
import errorCode from "../config/errorCode";
import { Response_Error } from "../helpers/base.helper";
import API from "../utils/callApi";
import { Delay_History_Goback } from "../helpers/base.helper";
import { message } from "antd";
import * as socket from "../utils/socket_Client";
const callApi = new API();

export const actRequestInforAdmin = () => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiGet("cms/api/infor-admin", token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(inforAdmin(res.data));

          // Gửi socket room admin
          socket.url_socket.emit("roomAdmin", "admin_TN");

          // Gửi socket room id_permissions
          socket.url_socket.emit(
            "roomAdminPermission",
            res.data.id_permissions
          );

          // Gửi socket room room Admin ById
          socket.url_socket.emit(
            "roomAdminById",
            res.data.id
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

export const inforAdmin = (infor) => {
  return {
    type: types.INFOR_ADMIN,
    infor,
  };
};

export const actRequestUpdatePassWord = (body, history) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPut("cms/api/update-password", token, body)
      .then((res) => {
        if (res && res.status === 200) {
          return Modal.success({
            title: "Thay đổi mật khẩu thành công",
            content: "",
            onOk: () => {
              localStorage.clear();
              history.push("/admin/dang-nhap");
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
        dispatch(
          ErrorInforUser(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const actRequestUpdateInfor = (body, history) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPut("cms/api/update-infor", token, body)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestInforAdmin());
          message.success("Sửa thông tin thành công", 3);
          Delay_History_Goback(history);
        } else {
          let err = "";
          return Response_Error(err);
        }
      })
      .catch((err) => {
        dispatch(
          ErrorInforUser(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const ErrorInforUser = (data) => {
  return {
    type: types.ERROR_INFOR_USER,
    data,
  };
};

export const ResetInforUser = () => {
  return {
    type: types.RESET_INFOR_USER,
  };
};
