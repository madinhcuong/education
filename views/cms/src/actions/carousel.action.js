import * as types from "../constants/actionType";
import { Response_Error } from "../helpers/base.helper";
import API from "../utils/callApi";
import { message } from "antd";
const callApi = new API();

export const actRequestListCarousel = (check_seach) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    if (check_seach) dispatch({ type: types.LOADING_CAROUSEL });
    return callApi
      .callApiGet(`cms/api/get-list-image-carousel`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(ListCarousel(res.data));
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

export const ListCarousel = (data) => {
  return {
    type: types.GET_LIST_CAROUSEL,
    data,
  };
};

export const actRequestCreateCarousel = (body) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPost("cms/api/create-carousel", token, body)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestListCarousel(false));
          message.success("Thêm mới thành công", 3);
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

export const actRequestUpDateCarousel = (id, data) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPut(`cms/api/edit-carousel/${id}`, token, data)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestListCarousel(false));
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

export const actRequestDelteCarousrl = (id) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiDelete(`cms/api/delete-carousel/${id}`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestListCarousel(false));
          message.success("Xóa thành công", 3);
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
