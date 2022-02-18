import { combineReducers } from "redux";

import login from "./login";
import inforClient from "./inforClient";
import inforAgentCode from "./inforAgentCode";
import _class from "./_class";
import wallet from "./wallet";
import noti from "./noti";
import pay from "./pay";
import forgotPassword from "./forgotPassword";

const myReducer = combineReducers({
  login,
  inforClient,
  inforAgentCode,
  _class,
  wallet,
  noti,
  pay,
  forgotPassword,
});

export default myReducer;
