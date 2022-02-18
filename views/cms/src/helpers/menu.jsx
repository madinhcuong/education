import React from "react";
import { Icon } from "antd";
const menu = [
  {
    name: "Trang chủ",
    to: "/admin",
    exact: true,
    permission: "DASHBOARD",
    icon: <Icon type="home" />,
  },
  {
    name: "Đào tạo",
    to: "/admin/dao-tao",
    exact: false,
    permission: "READ_TRAINING",
    icon: <Icon type="snippets" />,
  },
  {
    name: "Nhân viên",
    to: "/admin/nhan-vien",
    exact: false,
    permission: "READ_ADMIN",
    icon: <Icon type="team" />,
  },
  {
    name: "Giáo viên",
    to: "/admin/giao-vien",
    exact: false,
    permission: "READ_TEACHER",
    icon: <Icon type="profile" />,
  },
  {
    name: "Khóa học",
    to: "/admin/khoa-hoc",
    exact: false,
    permission: "READ_COURSES",
    icon: <Icon type="ordered-list" />,
  },
  {
    name: "Thông tin khóa học",
    to: "/admin/thong-tin-khoa-hoc",
    exact: false,
    permission: "READ_INFORTRAINING",
    icon: <Icon type="area-chart" />,
  },
  {
    name: "Lớp học",
    to: "/admin/lop-hoc",
    exact: false,
    permission: "READ_CLASSALL",
    icon: <Icon type="cluster" />,
  },
  // {
  //   name: "Lớp học",
  //   to: "/admin/lop-hoc",
  //   exact: false,
  //   icon: <Icon type="cluster" />,
  //   isSubMenu: true,
  //   permission: ["READ_CLASSALL", "READ_CLASSBYTEACHER"],
  //   sub_menu: [
  //     {
  //       name: "Tất cả lớp học",
  //       to: "/admin/lop-hoc/tat-ca-lop-hoc",
  //       permission: "READ_CLASSALL",
  //       exact: false
  //     },
  //     {
  //       name: "Lớp học giảng dạy",
  //       to: "/admin/lop-hoc/admin/lop-hoc-giang-day",
  //       permission: "READ_CLASSBYTEACHER",
  //       exact: false
  //     }
  //   ]
  // },
  {
    name: "Học viên",
    to: "/admin/hoc-vien",
    exact: false,
    icon: <Icon type="usergroup-add" />,
    isSubMenu: true,
    permission: ["READ_STUDENT", "READ_STUDENT"],
    sub_menu: [
      {
        name: "Danh sách học viên",
        to: "/admin/hoc-vien/danh-sach-hoc-vien",
        permission: "READ_STUDENT",
        exact: false,
      },
      {
        name: "Học viên đăng ký học",
        to: "/admin/hoc-vien/hoc-vien-dang-ky-hoc",
        permission: "READ_STUDENT",
        exact: false,
      },
    ],
  },
  {
    name: "Điểm tích lũy",
    to: "/admin/danh-sach-diem",
    exact: false,
    permission: "READ_SCORE_CUMULATIVE",
    icon: <Icon type="calculator" />,
  },
  {
    name: "Tin tức",
    to: "/tin-tuc",
    exact: true,
    icon: <Icon type="pic-left" />,
    isSubMenu: true,
    permission: ["READ_TOPIC", "READ_NEWS"],
    sub_menu: [
      {
        name: "Chủ đề",
        to: "/admin/tin-tuc/chu-de",
        permission: "READ_TOPIC",
        exact: false,
      },
      {
        name: "Nội dung tin tức",
        to: "/admin/tin-tuc/noi-dung-tin-tuc",
        permission: "READ_NEWS",
        exact: false,
      },
    ],
  },
  {
    name: "Chứng chỉ",
    to: "/admin/chung-chi",
    exact: false,
    permission: "READ_DIPLOMA",
    icon: <Icon type="book" />,
  },
  {
    name: "Thanh toán tiền",
    to: "/admin/thanh-toan-tien",
    exact: false,
    permission: "READ_PAY",
    icon: <Icon type="wallet" />,
  },
  {
    name: "Phân quyền",
    to: "/admin/phan-quyen",
    exact: false,
    permission: "READ_ADMINROLE",
    icon: <Icon type="edit" />,
  },
  {
    name: "Giao diện người dùng",
    to: "/giao-dien-nguoi-dung",
    exact: true,
    icon: <Icon type="align-center" />,
    isSubMenu: true,
    permission: ["READ_LAYOUTUSER", "READ_LAYOUTUSER"],
    sub_menu: [
      {
        name: "Quảng cáo",
        to: "/admin/giao-dien-nguoi-dung/quang-cao",
        permission: "READ_LAYOUTUSER",
        exact: false,
      },
      {
        name: "Cảm nhận học viên",
        to: "/admin/giao-dien-nguoi-dung/cam-nhan-hoc-vien",
        permission: "READ_LAYOUTUSER",
        exact: false,
      },
      {
        name: "Giới thiệu và Liên hệ",
        to: "/admin/giao-dien-nguoi-dung/gioi-thieu-va-lien-he",
        permission: "READ_LAYOUTUSER",
        exact: false,
      },
    ],
  },
  {
    name: "Lịch sử",
    to: "/admin/lich-su",
    exact: false,
    permission: "READ_LOGS",
    icon: <Icon type="history" />,
  },
  // {
  //     name: "Trang chủ",
  //     to: "/",
  //     exact: true,
  //     icon: <Icon type="user" />,
  //     isSubMenu: true,
  //     sub_menu: [
  //         {
  //             name: "Trang chủ",
  //             to: "/",
  //             exact: false
  //         },
  //         {
  //             name: "Trang chủ",
  //             to: "/",
  //             exact: false
  //         }
  //     ]
  // }
];

export default menu;
