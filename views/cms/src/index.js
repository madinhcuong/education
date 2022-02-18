import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Routes from "./routes/index";
import ScrollToTop from "react-router-scroll-top";

// -- css
import "./assets/css/navbar.css";
import "./assets/css/topic.css";
import "./assets/css/reponsive.css";
import "./assets/css/role.css";
import "./assets/css/training.css";
import "./assets/css/staff.css";
import "./assets/css/teacher.css";
import "./assets/css/inforTraining.css";
import "./assets/css/courses.css";
import "./assets/css/index.css";
import "./assets/css/_class.css";
import "./assets/css/student.css";
import "./assets/css/chart.css";
import "./assets/css/invoice.css";
import "./assets/css/invoice.css";
import "./assets/css/notification.css";
import "./assets/css/fix_css/_home.scss";
import "./assets/css/fix_css/_training.scss";
import "./assets/css/fix_css/_index.scss";
import "./assets/css/fix_css/_staff.scss";
import "./assets/css/fix_css/_role.scss";
import "./assets/css/fix_css/_class.scss";
import "./assets/css/fix_css/_layoutUser.scss";
import "./assets/css/fix_css/_inforTraining.scss";
import "./assets/css/fix_css/_news.scss";
import "./assets/css/fix_css/_diploma.scss";
// -- end css

// ------- vietnamese ----
import { ConfigProvider } from "antd";
import viVN from "antd/es/locale/vi_VN";
import "moment/locale/vi";
// ----------

import { createStore, applyMiddleware } from "redux";
import myReducer from "./reducers/index";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const store = createStore(
  myReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

let ShowContentMenu = (Routes) => {
  let result = null;
  if (Routes.length > 0) {
    result = Routes.map((item, index) => {
      return (
        <Route
          key={index}
          path={item.path}
          exact={item.exact}
          component={item.main}
        />
      );
    });
  }
  return result;
};

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={viVN}>
      <BrowserRouter>
        <ScrollToTop>
          <Switch>{ShowContentMenu(Routes)}</Switch>
        </ScrollToTop>
      </BrowserRouter>
    </ConfigProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
