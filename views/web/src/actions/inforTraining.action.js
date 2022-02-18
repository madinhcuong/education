import * as types from "../constants/actionType";
import swal from "sweetalert";
import errorCode from "../config/errorCode";
import API from "../utils/callApi";
const callApi = new API();

export const actRequestListTrainingByIdClass = (id_training, page, loading) => {
  return dispatch => {
    if (loading) dispatch({ type: types.LOADING_INFORTRAINING });
    return callApi
      .callApiGet(
        `web/api/get-list-infortraining-by-id/${id_training}?page=${page}`
      )
      .then(res => {
        if (res && res.status === 200) {
          dispatch(ListTrainingByIdClass(res.data));
        } else {
          return swal(`${errorCode(0)}`, "", "error");
        }
      })
      .catch(err => {
        dispatch(ErrorInforTraining(`${errorCode(err.response.data.errcode)}`));
      });
  };
};

export const ListTrainingByIdClass = data => {
  return {
    type: types.LIST_INFORTRAINING,
    data
  };
};

export const actRequestGetInforTrainingById = (id_inforTraining, loading) => {
  return dispatch => {
    if (loading) dispatch({ type: types.LOADING_INFORTRAINING });
    return callApi
      .callApiGet(`web/api/get-infortraining-by-id/${id_inforTraining}`)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(GetInforTrainingById(res.data));
        } else {
          return swal(`${errorCode(0)}`, "", "error");
        }
      })
      .catch(err => {
        dispatch(ErrorInforTraining(`${errorCode(err.response.data.errcode)}`));
      });
  };
};

export const GetInforTrainingById = data => {
  return {
    type: types.GET_BYID_INFORTRAINING,
    data
  };
};

export const ErrorInforTraining = data => {
  return {
    type: types.ERROR_INFORTRAINING,
    data
  };
};
