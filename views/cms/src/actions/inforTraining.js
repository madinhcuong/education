import * as types from "../constants/actionType";
import { Delay_History_Goback } from "../helpers/base.helper";
import { Response_Error } from "../helpers/base.helper";
import API from "../utils/callApi";
import { message } from "antd";
const callApi = new API();

export const actRequestListInforTraining = (
  name_inforTraining,
  name_training,
  check_seach
) => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    if (check_seach) dispatch({ type: types.LOADING_INFOR_TRAINING });
    return callApi
      .callApiGet(
        `cms/api/get-list-infor-training?name_training=${name_training}&name_inforTraining=${name_inforTraining}`,
        token
      )
      .then(res => {
        if (res && res.status === 200) {
          dispatch(ListInforTraining(res.data));
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

export const ListInforTraining = data => {
  return {
    type: types.LIST_INFOR_TRAINING,
    data
  };
};

export const actRequestInforTrainingById = id => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    dispatch({ type: types.LOADING_INFOR_TRAINING });
    return callApi
      .callApiGet(`cms/api/get-infor-training-by-id/${id}`, token)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(GetInforTrainingById(res.data));
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

export const GetInforTrainingById = data => {
  return {
    type: types.GET_INFOR_TRAINING_BY_ID,
    data
  };
};

export const actRequestCreateInforTraining = (body, history) => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPost("cms/api/create-infor-training", token, body)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(actRequestListInforTraining("", "", false));
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

export const actRequestUpDateInforTraining = (id, data, history) => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPut(`cms/api/edit-infor-training/${id}`, token, data)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(actRequestListInforTraining("", "", false));
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
