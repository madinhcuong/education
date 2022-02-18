import * as types from "../constants/actionType";
import swal from "sweetalert";
import errorCode from "../config/errorCode";
import API from "../utils/callApi";
const callApi = new API();

export const actRequestGetListDiploma = (code, loading) => {
  return (dispatch) => {
    if (loading) dispatch({ type: types.LOADING_DIPLOMA });
    return callApi
      .callApiGet(`web/api/get-infor-diploma/${code}`)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(GetListDiploma(res.data));
        } else {
          return swal(`${errorCode(0)}`, "", "error");
        }
      })
      .catch((err) => {
        dispatch(
          ErrorDiploma(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const GetListDiploma = (data) => {
  return {
    type: types.LIST_DIPLOMA,
    data,
  };
};

export const ErrorDiploma = (data) => {
  return {
    type: types.ERROR_DIPLOMA,
    data,
  };
};

export const ResetDiploma = () => {
  return {
    type: types.RESET_DIPLOMA,
  };
};
