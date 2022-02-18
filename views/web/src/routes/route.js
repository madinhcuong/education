import React from "react";

import Home from "../page/home/home";
import About from "../page/aboutus/aboutus.component";
import PageCourses from "../page/courses/courses";
import SeachDiploma from "../components/seach_diploma/seach_dlm.component";
import Contact from "../components/contact/contact.component";
import NotFound404 from "../components/notFound/notFound404.component";
import PageInforTraining from "../page/inforTraining/InforTraining";
import InforTraining from "../components/inforTraining/inforTraining.component";
import PageNews from "../page/news/news";
import InforNewsById from "../components/news/inforNewsById.component";
import PageRigisterCourses from "../page/registerCourses/registerCourses";
import CheckoutPayment from "../page/checkoutPayment/checkoutPayment";

const Routes = [
  {
    path: "/",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/gioi-thieu",
    exact: false,
    main: () => <About />,
  },
  {
    path: "/lich-khai-giang",
    exact: false,
    main: () => <PageCourses />,
  },
  {
    path: "/tra-cuu",
    exact: false,
    main: () => <SeachDiploma />,
  },
  {
    path: "/lien-he",
    exact: false,
    main: () => <Contact />,
  },
  {
    path: "/dao-tao/thong-tin-khoa-hoc/:id",
    exact: false,
    main: () => <InforTraining />,
  },
  {
    path: "/dao-tao/:id",
    exact: false,
    main: () => <PageInforTraining />,
  },

  {
    path: "/tin-tuc/chi-tiet/:id",
    exact: false,
    main: () => <InforNewsById />,
  },
  {
    path: "/tin-tuc/:id",
    exact: false,
    main: () => <PageNews />,
  },
  {
    path: "/dang-ky-khoa-hoc/:id",
    exact: false,
    main: () => <PageRigisterCourses />,
  },
  {
    path: "/checkout-payment",
    exact: false,
    main: () => <CheckoutPayment />,
  },
  {
    path: "",
    exact: false,
    main: () => <NotFound404 />,
  },
];

export default Routes;
