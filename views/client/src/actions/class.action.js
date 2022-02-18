import * as types from "../constants/actionType";
import { Modal } from "antd";
import errorCode from "../config/errorCode";
import API from "../utils/callApi";
const callApi = new API();

export const actRequestScheduleClass = loading => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token_client"));

    if (loading) dispatch({ type: types.CLASS_LOADING });
    return callApi
      .callApiGet("client/api/schedule-class", token)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(ScheduleClass(res.data));
        } else {
          return Modal.warning({
            title: `${errorCode(0)}`,
            content: "",
          });
        }
      })
      .catch(err => {
        dispatch(
          ErrorrClass(`${errorCode(err.response && err.response.data.errcode)}`)
        );
      });
  };
};

export const actRequestScoreClass = (page, limit, loading) => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token_client"));

    if (loading) dispatch({ type: types.CLASS_LOADING });
    return callApi
      .callApiGet(`client/api/score-class?page=${page}&limit=${limit}`, token)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(ScoreClass(res.data));
        } else {
          return Modal.warning({
            title: `${errorCode(0)}`,
            content: "",
          });
        }
      })
      .catch(err => {
        dispatch(
          ErrorrClass(`${errorCode(err.response && err.response.data.errcode)}`)
        );
      });
  };
};

export const ScoreClass = data => {
  return {
    type: types.SCORE_CLASS,
    data
  };
};

export const ScheduleClass = data => {
  return {
    type: types.SCHEDULE_CLASS,
    data
  };
};

export const ErrorrClass = data => {
  return {
    type: types.ERROR_CLASS,
    data
  };
};
