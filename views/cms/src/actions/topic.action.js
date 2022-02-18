import * as types from "../constants/actionType";
import { Response_Error } from "../helpers/base.helper";
import API from "../utils/callApi";
import { message } from "antd";
const callApi = new API();

export const actRequestListTopic = (seach, check_seach) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    if (check_seach) dispatch({ type: types.LOADING_TOPIC });
    return callApi
      .callApiGet(`cms/api/get-infor-topic?seach_name=${seach}`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(ListTopic(res.data));
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

export const ListTopic = (data) => {
  return {
    type: types.LIST_TOPIC,
    data,
  };
};

export const actRequestListTopicByNews = () => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    dispatch({ type: types.LOADING_TOPIC });
    return callApi
      .callApiGet(`cms/api/get-list-topic-by-news`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(ListTopicByNews(res.data));
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

export const ListTopicByNews = (data) => {
  return {
    type: types.LIST_TOPIC_BY_NEWS,
    data,
  };
};

export const actRequestCreateTopic = (body) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPost("cms/api/create-new-topic", token, body)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestListTopic("", false));
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

export const actRequestDelteTopic = (id) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiDelete(`cms/api/delete-topic/${id}`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(DeleteTopic(id));
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

export const DeleteTopic = (id) => {
  return {
    type: types.DELETE_TOPIC,
    id,
  };
};

export const actRequestGetByIdTopic = (id) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiGet(`cms/api/get-topic-by-id/${id}`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(GetByIdTopic(res.data));
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

export const GetByIdTopic = (data) => {
  return {
    type: types.GETBYID_TOPIC,
    data,
  };
};

export const actRequestUpDateTopic = (id, data) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPut(`cms/api/update-topic/${id}`, token, data)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestListTopic("", false));
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
