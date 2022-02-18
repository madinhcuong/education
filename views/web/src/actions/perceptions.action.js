import * as types from "../constants/actionType";
import swal from "sweetalert";
import errorCode from "../config/errorCode";
import API from "../utils/callApi";
const callApi = new API();

export const actRequestGetListPerceptions = (loading) => {
  return (dispatch) => {
    if (loading) dispatch({ type: types.LOADING_PERCEPTIONS });
    return callApi
      .callApiGet(`web/api/get-list-perceptions`)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(GetListPerceptions(res.data));
        } else {
          return swal(`${errorCode(0)}`, "", "error");
        }
      })
      .catch((err) => {
        dispatch(
          ErrorPerceptions(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const GetListPerceptions = (data) => {
  return {
    type: types.GET_LIST_PERCEPTIONS,
    data,
  };
};

export const ErrorPerceptions = (data) => {
  return {
    type: types.ERROR_PERCEPTIONS,
    data,
  };
};
