import * as types from "../constants/actionType";
import swal from "sweetalert";
import errorCode from "../config/errorCode";
import API from "../utils/callApi";
const callApi = new API();

export const actRequestGetInforCovid19VI = (loading) => {
  return (dispatch) => {
    if (loading) dispatch({ type: types.LOADING_COVID19 });
    return callApi
      .callApiGet(`web/api/get-infor-covid19-vietnam`)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(GetInforCovi19VI(res.data));
        } else {
          return swal(`${errorCode(0)}`, "", "error");
        }
      })
      .catch((err) => {
        dispatch(
          ErrorCovid19(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const actRequestGetInforCovid19WD = (loading) => {
  return (dispatch) => {
    if (loading) dispatch({ type: types.LOADING_COVID19 });
    return callApi
      .callApiGet(`web/api/get-infor-covid19-world`)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(GetInforCovi19WD(res.data));
        } else {
          return swal(`${errorCode(0)}`, "", "error");
        }
      })
      .catch((err) => {
        dispatch(
          ErrorCovid19(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const GetInforCovi19VI = (data) => {
  return {
    type: types.DATA_COVID19_VI,
    data,
  };
};

export const GetInforCovi19WD = (data) => {
  return {
    type: types.DATA_COVID19_WD,
    data,
  };
};

export const ErrorCovid19 = (data) => {
  return {
    type: types.ERROR_COVID19,
    data,
  };
};
