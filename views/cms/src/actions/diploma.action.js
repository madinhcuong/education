import * as types from "../constants/actionType";
//import { Delay_History_Goback } from "../helpers/base.helper";
import { message } from "antd";
import { Response_Error } from "../helpers/base.helper";
import API from "../utils/callApi";
const callApi = new API();

export const actRequestListDiploma = (name, email, page, limit, loading) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    if (loading) dispatch({ type: types.LOADING_DIPLOMA });
    return callApi
      .callApiGet(
        `cms/api/get-list-diploma?name=${name}&email=${email}&page=${page}&limit=${limit}`,
        token
      )
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(ListDiploma(res.data));
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

export const ListDiploma = (data) => {
  return {
    type: types.GET_LIST_DIPLOMA,
    data,
  };
};

export const actRequestDiplomaById = (id, loading) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    if (loading) dispatch({ type: types.LOADING_DIPLOMA });
    return callApi
      .callApiGet(`cms/api/get-diploma-by-id/${id}`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(GetDiplomaById(res.data));
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

export const GetDiplomaById = (data) => {
  return {
    type: types.GET_DIPLOMA_BY_ID,
    data,
  };
};

export const actRequestUploadImageDiploma = (id, data, cb) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPut(`cms/api/upload-image-diploma/${id}`, token, data)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestDiplomaById(id, true));
          cb(true)
          message.success("Tải ảnh thành công", 3);
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
