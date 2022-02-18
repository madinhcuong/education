import * as types from "../constants/actionType";
import { Response_Error } from "../helpers/base.helper";
import errorCode from "../config/errorCode";
import API from "../utils/callApi";
const callApi = new API();

export const actRequestGetStatisticByYear = (year, loading) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    if (loading) dispatch({ type: types.LOADING_STATISTIC });
    return callApi
      .callApiGet(`cms/api/get-chart-by-year/${year}`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(GetStatisticByYear(res.data));
        } else {
          let err = "";
          return Response_Error(err);
        }
      })
      .catch((err) => {
        dispatch(
          ErrorrStatistic(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const GetStatisticByYear = (data) => {
  return {
    type: types.GET_STATISTIC_BY_YEAR,
    data,
  };
};

export const actRequestGetStatisticByMonth = (month, loading) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    if (loading) dispatch({ type: types.LOADING_STATISTIC });
    return callApi
      .callApiGet(`cms/api/get-chart-by-month?date=${month}`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(GetStatisticByMonth(res.data));
        } else {
          let err = "";
          return Response_Error(err);
        }
      })
      .catch((err) => {
        dispatch(
          ErrorrStatistic(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const GetStatisticByMonth = (data) => {
  return {
    type: types.GET_STATISTIC_BY_MONTH,
    data,
  };
};

export const actRequestGetTotalStatistic = (loading) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    if (loading) dispatch({ type: types.LOADING_STATISTIC });
    return callApi
      .callApiGet(`cms/api/get-total-statistic`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(GetTotalStatistic(res.data));
        } else {
          let err = "";
          return Response_Error(err);
        }
      })
      .catch((err) => {
        dispatch(
          ErrorrStatistic(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const GetTotalStatistic = (data) => {
  return {
    type: types.GET_TOTAL_STATISTIC,
    data,
  };
};

export const actRequestGetStatisticByDate = (
  timeStart,
  timeEnd,
  total_seach,
  loading
) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    if (loading) dispatch({ type: types.LOADING_STATISTIC });
    return callApi
      .callApiGet(
        `cms/api/get-statistic-by-date?timeStart=${timeStart}&timeEnd=${timeEnd}&total_seach=${total_seach}`,
        token
      )
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(GetStatisticByDate(res.data));
        } else {
          let err = "";
          return Response_Error(err);
        }
      })
      .catch((err) => {
        dispatch(
          ErrorrStatistic(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const GetStatisticByDate = (data) => {
  return {
    type: types.GET_STATISTIC_BY_DATE,
    data,
  };
};

export const ErrorrStatistic = (data) => {
  return {
    type: types.ERROR_STATISTIC,
    data,
  };
};

export const ResetStatistic = () => {
  return {
    type: types.RESET_STATISTIC,
  };
};
