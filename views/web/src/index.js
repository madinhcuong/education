import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "react-router-scroll-top";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { createStore, applyMiddleware } from "redux";
import myReducer from "./reducers/index";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

// ------- vietnamese ----
import { ConfigProvider } from "antd";
import viVN from "antd/es/locale/vi_VN";
import "moment/locale/vi";
// ----------

import Routes from "./routes/route";
import Header from "./components/header/header.component";
import Footer from "./components/footers/footer.component";

import "./assets/css/home.css";
import "./assets/css/index.css";
import "./assets/css/courses.css";
import "./assets/css/registerCourses.css";
import "./assets/css/covid19.css";
import "./assets/css/fix_css/_index.scss";
import "./assets/css/fix_css/_home.scss";
import "./assets/css/fix_css/_news.scss";
import "./assets/css/fix_css/_diploma.scss";
import "./assets/css/fix_css/_menu.scss";
import "./assets/css/fix_css/_footer.scss";

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
      <Router>
        <ScrollToTop>
          <Header />
          <Switch>{ShowContentMenu(Routes)}</Switch>
          <Footer />
        </ScrollToTop>
      </Router>
    </ConfigProvider>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
