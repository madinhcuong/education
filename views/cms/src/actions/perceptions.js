import * as types from "../constants/actionType";
import { Response_Error, Delay_History_Goback } from "../helpers/base.helper";
import API from "../utils/callApi";
import { message } from "antd";
const callApi = new API();

export const actRequestListPerceptions = (check_seach) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    if (check_seach) dispatch({ type: types.LOADING_PERCEPTIONS });
    return callApi
      .callApiGet(`cms/api/get-list-perceptions`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(ListPerceptions(res.data));
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

export const ListPerceptions = (data) => {
  return {
    type: types.GET_LIST_PERCEPTIONS,
    data,
  };
};

export const actRequestCreatePerceptions = (body, history) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPost("cms/api/create-perceptions", token, body)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestListPerceptions(false));
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

export const actRequestUpDatePerceptions = (id, data, history) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPut(`cms/api/edit-perceptions/${id}`, token, data)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestListPerceptions(false));
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

export const actRequestDeletePerceptions = (id) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiDelete(`cms/api/delete-perceptions/${id}`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestListPerceptions(false));
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

export const actRequestPerceptionsById = (id) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    dispatch({ type: types.LOADING_PERCEPTIONS });
    return callApi
      .callApiGet(`cms/api/get-perceptionsByid/${id}`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(GetPerceptionsById(res.data));
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

export const GetPerceptionsById = (data) => {
  return {
    type: types.GET_PERCEPTIONS_BY_ID,
    data,
  };
};
