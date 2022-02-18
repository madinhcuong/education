import * as types from "../constants/actionType";
import { Response_Error } from "../helpers/base.helper";
import { message } from "antd";
import API from "../utils/callApi";
const callApi = new API();

export const actRequestListTraiNing = (seach, check_seach) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    if (check_seach) dispatch({ type: types.LOADING_TRAINING });
    return callApi
      .callApiGet(`cms/api/get-infor-training?seach_name=${seach}`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(ListTraining(res.data));
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

export const ListTraining = (data) => {
  return {
    type: types.LIST_TRAINING,
    data,
  };
};

export const actRequestListTraiNingByTeacher = () => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    dispatch({ type: types.LOADING_TRAINING });
    return callApi
      .callApiGet(`cms/api/get-list-training-by-teacher`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(ListTrainingByTeacher(res.data));
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

export const ListTrainingByTeacher = (data) => {
  return {
    type: types.LIST_TRAINING_TEACHER,
    data,
  };
};

export const actRequestCreateTraining = (body) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPost("cms/api/create-training", token, body)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestListTraiNing("", false));
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

export const actRequestUpDateStatusTraining = (id, data) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPut(`cms/api/update-status-training/${id}`, token, data)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestListTraiNing("", false));
          message.success("Cập nhật trạng thái thành công", 3);
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

export const actRequestUpDateTraining = (id, data) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    return callApi
      .callApiPut(`cms/api/update-training/${id}`, token, data)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(actRequestListTraiNing("", false));
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
