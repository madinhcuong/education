import * as types from "../constants/actionType";
import swal from "sweetalert";
import errorCode from "../config/errorCode";
import API from "../utils/callApi";
const callApi = new API();

export const actRequestListTraining = (loading) => {
  return (dispatch) => {
    if (loading) dispatch({ type: types.LOADING_TRAINING });
    return callApi
      .callApiGet(`web/api/get-list-training`)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(ListTraining(res.data));
        } else {
          return swal(`${errorCode(0)}`, "", "error");
        }
      })
      .catch((err) => {
        console.log("vao");
        dispatch(
          ErrorTraining(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const ListTraining = (data) => {
  return {
    type: types.LIST_TRAINING,
    data,
  };
};

export const actRequestListTrainingById = (id_training, page, loading) => {
  return (dispatch) => {
    if (loading) dispatch({ type: types.LOADING_TRAINING });
    return callApi
      .callApiGet(
        `web/api/get-list-infortraining-by-id/${id_training}?page=${page}`
      )
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(ListTrainingById(res.data));
        } else {
          return swal(`${errorCode(0)}`, "", "error");
        }
      })
      .catch((err) => {
        dispatch(
          ErrorTraining(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const ListTrainingById = (data) => {
  return {
    type: types.LIST_TRAINING_BY_ID,
    data,
  };
};

export const ErrorTraining = (data) => {
  return {
    type: types.ERROR_TRAINING,
    data,
  };
};
