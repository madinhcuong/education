import * as types from "../constants/actionType";
import { Response_Error, Delay_History_Goback } from "../helpers/base.helper";
import API from "../utils/callApi";
import { message } from "antd";
const callApi = new API();

export const actRequestListIntroContact = (check_seach) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    if (check_seach) dispatch({ type: types.LOADING_INTRO_CONTACT });
    return callApi
      .callApiGet(`cms/api/get-list-introductionOrContact`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(ListIntroContact(res.data));
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

export const ListIntroContact = (data) => {
  return {
    type: types.GET_LIST_INTRO_CONTACT,
    data,
  };
};

export const actRequestIntroContactByID = (id, loading) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    if (loading) dispatch({ type: types.LOADING_INTRO_CONTACT });
    return callApi
      .callApiGet(`cms/api/get-introductionOrContactByID/${id}`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(IntroContactByID(res.data));
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

export const IntroContactByID = (data) => {
  return {
    type: types.GET_INTRO_CONTACT_BY_ID,
    data,
  };
};

export const actRequestUpDateIntroContact = (id, data, history) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPut(`cms/api/update-introductionOrContact/${id}`, token, data)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestListIntroContact(false));
          message.success("Chỉnh sửa thông tin thành công", 3);
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
