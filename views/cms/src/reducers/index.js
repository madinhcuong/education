import { combineReducers } from "redux";

import login from "./login";
import topics from "./topics";
import inforAdmin from "./inforAdmin";
import inforUser from "./inforUser";
import role from "./role";
import training from "./training";
import staff from "./staff";
import teacher from "./teacher";
import news from "./news";
import inforTraining from "./inforTraining";
import courses from "./courses";
import logs from "./logs";
import _class from "./class";
import studentRegister from "./studentRegister";
import student from "./student";
import scoreCumulative from "./scoreCumulative";
import statistic from "./statistic";
import forgotPassWord from "./forgotPassWord";
import noti from "./noti";
import diploma from "./diploma";
import pay from "./pay";
import carousel from "./carousel";
import perceptions from "./perceptions";
import introductionContact from "./introductionContact";

const myReducer = combineReducers({
  topics, // topics: topics
  login,
  inforAdmin,
  inforUser,
  role,
  training,
  staff,
  teacher,
  news,
  inforTraining,
  courses,
  logs,
  _class,
  studentRegister,
  student,
  scoreCumulative,
  statistic,
  forgotPassWord,
  noti,
  diploma,
  pay,
  carousel,
  perceptions,
  introductionContact
});

export default myReducer;
