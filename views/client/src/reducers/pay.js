import * as types from "../constants/actionType";
import { Modal } from "antd";

var intialState = {
  error: "",
};

let myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.ERROR_PAY:
      console.log("ERROR_PAY", action.data);
      state = { ...state, error: action.data };

      Modal.warning({
        title: `${action.data}`,
        content: "",
        className: "modal-error",
        okButtonProps: { type: "primary", ghost: true },
        centered: true,
      });
      return state;

    default:
      return state;
  }
};

export default myReducer;
