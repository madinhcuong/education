import * as types from "../constants/actionType";
import { Delay_History_Goback } from "../helpers/base.helper";
import { Response_Error } from "../helpers/base.helper";
import API from "../utils/callApi";
import { message } from "antd";
const callApi = new API();

export const actRequestListNews = (name_news, name_topic, check_seach) => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    if (check_seach) dispatch({ type: types.LOADING_NEW });
    return callApi
      .callApiGet(
        `cms/api/get-infor-news?name_news=${name_news}&name_topic=${name_topic}`,
        token
      )
      .then(res => {
        if (res && res.status === 200) {
          dispatch(ListNews(res.data));
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

export const ListNews = data => {
  return {
    type: types.LIST_NEWS,
    data
  };
};

export const actRequestNewsById = id => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    dispatch({ type: types.LOADING_NEW });
    return callApi
      .callApiGet(`cms/api/get-news-by-id/${id}`, token)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(GetNewsById(res.data));
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

export const GetNewsById = data => {
  return {
    type: types.INFOR_NEWS_BY_ID,
    data
  };
};

export const actRequestCreateNews = (body, history) => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPost("cms/api/create-news", token, body)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(actRequestListNews("", "", false));
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

export const actRequestUpDateNews = (id, data, history) => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPut(`cms/api/edit-news/${id}`, token, data)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(actRequestListNews("", "", false));
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

export const actRequestDelteNews = id => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiDelete(`cms/api/delete-news/${id}`, token)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(actRequestListNews("", "", false));
          message.success("Xóa thành công", 3);
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
