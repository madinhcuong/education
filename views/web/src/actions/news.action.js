import * as types from "../constants/actionType";
import swal from "sweetalert";
import errorCode from "../config/errorCode";
//import { Delay_History_Goback } from "../helpers/base.helper";
//import { Response_Error } from "../helpers/base.helper";
import API from "../utils/callApi";
// import { message } from "antd";
const callApi = new API();

export const actRequestGetListNewsHome = loading => {
  return dispatch => {
    if (loading) dispatch({ type: types.LOADING_NEWS });
    return callApi
      .callApiGet(`web/api/get-list-news-home`)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(GetListNewsHome(res.data));
        } else {
          return swal(`${errorCode(0)}`, "", "error");
        }
      })
      .catch(err => {
        dispatch(
          ErrorNews(`${errorCode(err.response && err.response.data.errcode)}`)
        );
      });
  };
};

export const GetListNewsHome = data => {
  return {
    type: types.LIST_NEWS,
    data
  };
};

export const actRequestGetListNewsByIdTopic = (id_topic, page, loading) => {
  return dispatch => {
    if (loading) dispatch({ type: types.LOADING_NEWS });
    return callApi
      .callApiGet(`web/api/get-list-news-byid-topic/${id_topic}?page=${page}`)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(GetListNewsByIdTopic(res.data));
        } else {
          return swal(`${errorCode(0)}`, "", "error");
        }
      })
      .catch(err => {
        console.log("err.response", err.response);
        dispatch(
          ErrorNews(`${errorCode(err.response && err.response.data.errcode)}`)
        );
      });
  };
};

export const GetListNewsByIdTopic = data => {
  return {
    type: types.LIST_NEWS_BYIY_TOPIC,
    data
  };
};

export const actRequestGetNewsById = (id_topic, loading) => {
  return dispatch => {
    if (loading) dispatch({ type: types.LOADING_NEWS });
    return callApi
      .callApiGet(`web/api/get-new-by-id/${id_topic}`)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(GetNewsById(res.data));
        } else {
          return swal(`${errorCode(0)}`, "", "error");
        }
      })
      .catch(err => {
        dispatch(
          ErrorNews(`${errorCode(err.response && err.response.data.errcode)}`)
        );
      });
  };
};

export const GetNewsById = data => {
  return {
    type: types.NEWS_BYIY,
    data
  };
};

export const actRequestGetListSliderNewsHome = loading => {
  return dispatch => {
    if (loading) dispatch({ type: types.LOADING_NEWS });
    return callApi
      .callApiGet(`web/api/get-list-news-slider-home`)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(GetListSliderNewsHome(res.data));
        } else {
          return swal(`${errorCode(0)}`, "", "error");
        }
      })
      .catch(err => {
        dispatch(
          ErrorNews(`${errorCode(err.response && err.response.data.errcode)}`)
        );
      });
  };
};

export const GetListSliderNewsHome = data => {
  return {
    type: types.LIST_NEWS_HOME,
    data
  };
};

export const ErrorNews = data => {
  return {
    type: types.ERROR_NEWS,
    data
  };
};
