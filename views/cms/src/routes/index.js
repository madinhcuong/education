import React from "react";

import Login from "../pages/login/login";
import Dashboard from "../pages/dashboard/dashboard";
import NotFound from "../pages/notFound/notFound";
import SendMail from "../pages/forgotPassword/sendmail";
import ResetPassWord from "../pages/forgotPassword/resetPassWord";

const Routes = [
  {
    path: "/admin/dang-nhap",
    exact: true,
    main: () => <Login />
  },
  {
    path: "/admin/gui-ma-reset-mat-khau",
    exact: false,
    main: () => <SendMail />
  },
  {
    path: "/admin/reset-mat-khau",
    exact: false,
    main: () => <ResetPassWord />
  },
  {
    path: "/admin",
    exact: false,
    main: () => <Dashboard />
  },
  {
    path: "",
    exact: false,
    main: () => <NotFound />
  }
];

export default Routes;
