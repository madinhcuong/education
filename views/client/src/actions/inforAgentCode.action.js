import * as types from "../constants/actionType";
import { Modal } from "antd";
import errorCode from "../config/errorCode";
import API from "../utils/callApi";
const callApi = new API();

export const actRequestInforAgentCode = loading => {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("access_token_client"));

    if (loading) dispatch({ type: types.INFOR_AGENT_CODE_LOADING });
    return callApi
      .callApiGet("client/api/infor-agent-code", token)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(inforAgentCode(res.data));
        } else {
          return Modal.warning({
            title: `${errorCode(0)}`,
            content: "",
          });
        }
      })
      .catch(err => {
        dispatch(
          ErrorrInforAgentCode(
            `${errorCode(err.response && err.response.data.errcode)}`
          )
        );
      });
  };
};

export const inforAgentCode = data => {
  return {
    type: types.INFOR_AGENT_CODE,
    data
  };
};

export const ErrorrInforAgentCode = data => {
  return {
    type: types.ERROR_INFOR_AGENT_CODE,
    data
  };
};
