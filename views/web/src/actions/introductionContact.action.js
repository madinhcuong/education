import * as types from "../constants/actionType";
import { Response_Error } from "../helpers/base.helper";
import API from "../utils/callApi";
const callApi = new API();

export const actRequestListIntroContact = (check_seach) => {
  return (dispatch) => {
    if (check_seach) dispatch({ type: types.LOADING_INTRO_CONTACT });
    return callApi
      .callApiGet(`web/api/get-list-introductionOrContact`)
      .then((res) => {
        if (res && res.status === 200) {
          dispatch(ListIntroContact(res.data));
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

export const ListIntroContact = (data) => {
  return {
    type: types.GET_LIST_INTRO_CONTACT,
    data,
  };
};
