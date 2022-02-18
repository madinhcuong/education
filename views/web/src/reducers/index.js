import { combineReducers } from "redux";

import training from "./training";
import news from "./news";
import teacher from "./teacher";
import topic from "./topic";
import inforTraining from "./inforTraining";
import courses from "./courses";
import registerCourses from "./registerCourses";
import diploma from "./diploma";
import checkoutPayment from "./checkoutPayment";
import covid19 from "./covid19";
import carousel from "./carousel";
import perceptions from "./perceptions";
import introductionContact from "./introductionContact";

const myReducer = combineReducers({
  training,
  news,
  teacher,
  topic,
  inforTraining,
  courses,
  registerCourses,
  diploma,
  checkoutPayment,
  covid19,
  carousel,
  perceptions,
  introductionContact,
});

export default myReducer;
