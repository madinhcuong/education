import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "react-router-scroll-top";

// ------- vietnamese ant design -------
import { ConfigProvider } from "antd";
import viVN from "antd/es/locale/vi_VN";
import "moment/locale/vi";
// ----------

import { createStore, applyMiddleware } from "redux";
import myReducer from "./reducers/index";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import Routes from "./routes/index";

// ---- CSS ---
import "./assets/css/login.css";
import "./assets/css/reponsive.css";
import "./assets/css/index.css";
import "./assets/css/navbar.css";
import "./assets/css/home.css";
import "./assets/css/schedule.css";
import "./assets/css/wallet.css";
import "./assets/css/notification.css";
// ----END CSS ---

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
          <Switch>{ShowContentMenu(Routes)}</Switch>
        </ScrollToTop>
      </Router>
    </ConfigProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
