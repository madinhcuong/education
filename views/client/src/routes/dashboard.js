import React from "react";

import Home from "../pages/home/home";
import Schedule from "../pages/schedule/chedule";
import Wallet from "../pages/wallet/wallet";
import UpdatePassword from "../pages/updatePassword/updatePassword";
import InforNotification from "../components/notification/inforNotification.component";
import ListNotification from "../components/notification/listNotification.component";
import UpdateInforUser from "../pages/updateInforUser/updateInforUser";
import NotFound from "../pages/notFound/notFound";
import HistoryChnageScore from "../components/wallet/historyChangeScore.component";

const Routes = [
  {
    path: "/client",
    exact: true,
    main: () => <Home />
  },
  {
    path: "/client/lich-hoc",
    exact: false,
    main: () => <Schedule />
  },
  {
    path: "/client/vi-tien",
    exact: false,
    main: () => <Wallet />
  },
  {
    path: "/client/lich-su-doi-diem",
    exact: false,
    main: ({ match }, { history }) => (
      <HistoryChnageScore match={match} history={history} />
    )
  },
  {
    path: "/client/chi-tiet-thong-bao/:id",
    exact: false,
    main: ({ match }, { history }) => (
      <InforNotification match={match} history={history} />
    )
  },
  {
    path: "/client/thong-bao",
    exact: false,
    main: ({ match }, { history }) => (
      <ListNotification match={match} history={history} />
    )
  },
  {
    path: "/client/chinh-sua-thong-tin",
    exact: false,
    main: ({ match }, { history }) => (
      <UpdateInforUser match={match} history={history} />
    )
  },
  {
    path: "/client/thay-doi-mat-khau",
    exact: false,
    main: () => <UpdatePassword />
  },
  {
    path: "",
    exact: false,
    main: () => <NotFound />
  }
];

export default Routes;
