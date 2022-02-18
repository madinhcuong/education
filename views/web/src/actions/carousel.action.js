import * as types from "../constants/actionType";
import swal from "sweetalert";
import errorCode from "../config/errorCode";
import API from "../utils/callApi";
const callApi = new API();

export const actRequestGetListCarousel = (loading) => {
  return (dispatch) => {
    if (loading) dispatch({ type: types.LOADING_CAROUSEL });
    return callApi
      .callApiGet(`web/api/get-list-carousel`)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(GetListCarousel(res.data));
        } else {
          return swal(`${errorCode(0)}`, "", "error");
        }
      })
      .catch((err) => {
        dispatch(
          ErrorCarousel(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const GetListCarousel = (data) => {
  return {
    type: types.GET_LIST_CAROUSEL,
    data,
  };
};

export const ErrorCarousel = (data) => {
  return {
    type: types.ERROR_CAROUSEL,
    data,
  };
};
