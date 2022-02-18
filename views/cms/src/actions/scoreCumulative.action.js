import * as types from "../constants/actionType";
import { Response_Error } from "../helpers/base.helper";
import API from "../utils/callApi";
const callApi = new API();

export const actRequestListScoreCumulative = (
  seach_name,
  seach_email,
  seach
) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    if (seach) dispatch({ type: types.LOADING_SCORE_CUMULATIVE });
    return callApi
      .callApiGet(
        `cms/api/get-list-score-cumulative?name=${seach_name}&email=${seach_email}`,
        token
      )
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(ListScoreCumulative(res.data));
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

export const ListScoreCumulative = (data) => {
  return {
    type: types.LIST_SCORE_CUMULATIVE,
    data,
  };
};

export const actRequestGetScoreCumulativeById = (id) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    dispatch({ type: types.LOADING_SCORE_CUMULATIVE });
    return callApi
      .callApiGet(`cms/api/get-score-cumulative-by-id/${id}`, token)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(GetScoreCumulativeById(res.data));
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

export const GetScoreCumulativeById = (data) => {
  return {
    type: types.GET_SCORE_CUMULATIVE_BY_ID,
    data,
  };
};

// list Aff
export const actRequestGetListAffById = (
  id_user,
  type_aff,
  name,
  email,
  loading
) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("access_token"));

    if (loading) dispatch({ type: types.LOADING_SCORE_CUMULATIVE });
    return callApi
      .callApiGet(
        `cms/api/get-list-aff-by-id/${id_user}?type=${type_aff}&name=${name}&email=${email}`,
        token
      )
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(ListAffById(res.data));
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

export const ListAffById = (data) => {
  return {
    type: types.LIST_AFF_BY_ID,
    data,
  };
};
