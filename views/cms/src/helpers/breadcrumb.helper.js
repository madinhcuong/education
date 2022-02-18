import React from "react";
import { Icon } from "antd";

export const CheckUrl = (url) => {
  let name_url = url.split("/").slice(4, 5).join("/");

  if (
    name_url === "hoc-vien" ||
    name_url === "tin-tuc" ||
    name_url === "giao-dien-nguoi-dung"
  ) {
    name_url = url.split("/").slice(4, 6).join("/");
  }

  return name_url;
};

export const Breadcrumb = (param) => {
  switch (param) {
    case "thong-tin-nguoi-dung":
      return {
        link: "Thông tin tài khoản",
        icon: <Icon type="user" />,
      };

    case "sua-thong-tin-nguoi-dung":
      return {
        link: "Chỉnh sửa thông tin tài khoản",
        icon: <Icon type="user" />,
      };

    case "dao-tao":
      return {
        link: "Đào tạo",
        icon: <Icon type="snippets" />,
      };

    case "nhan-vien":
      return {
        link: "Nhân viên",
        icon: <Icon type="team" />,
      };

    case "them-nhan-vien":
      return {
        link: "Nhân viên > Thêm nhân viên",
        icon: <Icon type="team" />,
      };

    case "thong-tin-nhan-vien":
      return {
        link: "Nhân viên > Thông tin nhân viên",
        icon: <Icon type="team" />,
      };

    case "sua-nhan-vien":
      return {
        link: "Nhân viên > Sửa thông tin nhân viên",
        icon: <Icon type="team" />,
      };

    case "giao-vien":
      return {
        link: "Giáo viên",
        icon: <Icon type="profile" />,
      };

    case "them-giao-vien":
      return {
        link: "Giáo viên > Thêm giáo viên",
        icon: <Icon type="profile" />,
      };

    case "thong-tin-giao-vien":
      return {
        link: "Giáo viên > Thông tin giáo viên",
        icon: <Icon type="profile" />,
      };

    case "sua-giao-vien":
      return {
        link: "Giáo viên > Sửa thông tin giáo viên",
        icon: <Icon type="profile" />,
      };

    case "thong-tin-khoa-hoc":
      return {
        link: "Thông tin khóa học",
        icon: <Icon type="area-chart" />,
      };

    case "them-thong-tin-khoa-hoc":
      return {
        link: "Thông tin khóa học > Thêm thông tin khóa học",
        icon: <Icon type="area-chart" />,
      };

    case "xem-thong-tin-khoa-hoc":
      return {
        link: "Thông tin khóa học > Xem thông tin khóa học",
        icon: <Icon type="area-chart" />,
      };

    case "sua-thong-tin-khoa-hoc":
      return {
        link: "Thông tin khóa học > Sửa thông tin khóa học",
        icon: <Icon type="area-chart" />,
      };

    case "khoa-hoc":
      return {
        link: "Khóa học",
        icon: <Icon type="ordered-list" />,
      };

    case "them-khoa-hoc":
      return {
        link: "Khoá học > Thêm khóa học",
        icon: <Icon type="ordered-list" />,
      };

    case "sua-khoa-hoc":
      return {
        link: "Khoá học > Sửa khóa học",
        icon: <Icon type="ordered-list" />,
      };

    case "xem-khoa-hoc":
      return {
        link: "Khoá học > Xem khóa học",
        icon: <Icon type="ordered-list" />,
      };

    case "lop-hoc":
      return {
        link: "Lớp học",
        icon: <Icon type="cluster" />,
      };

    case "them-lop-hoc":
      return {
        link: "Lớp học > Thêm Lớp học",
        icon: <Icon type="cluster" />,
      };

    case "xem-thong-tin-lop-hoc":
      return {
        link: "Lớp học > xem thông tin Lớp học",
        icon: <Icon type="cluster" />,
      };

    case "sap-xep-lich-giang-day":
      return {
        link: "Lớp học > Sắp xếp lịch giảng dạy",
        icon: <Icon type="cluster" />,
      };

    case "danh-sach-hoc-vien":
      return {
        link: "Lớp học > Danh sách học viên",
        icon: <Icon type="cluster" />,
      };

    case "danh-sach-diem":
      return {
        link: "Điểm tích lũy",
        icon: <Icon type="calculator" />,
      };

    case "thong-tin-diem-tich-luy":
      return {
        link: "Điểm tích lũy > Thông tin điểm tích lũy",
        icon: <Icon type="cluster" />,
      };

    case "hoc-vien/danh-sach-hoc-vien":
      return {
        link: "Học viên > Danh sách học viên",
        icon: <Icon type="usergroup-add" />,
      };

    case "xem-thong-tin-hoc-vien":
      return {
        link: "Học viên > Xem thông tin học viên",
        icon: <Icon type="usergroup-add" />,
      };

    case "sua-thong-tin-hoc-vien":
      return {
        link: "Học viên > Sửa thông tin học viên",
        icon: <Icon type="usergroup-add" />,
      };

    case "hoc-vien/hoc-vien-dang-ky-hoc":
      return {
        link: "Học viên > Học viên đăng ký học",
        icon: <Icon type="usergroup-add" />,
      };

    case "thong-tin-hoc-vien":
      return {
        link: "Học viên > Xem thông tin học viên",
        icon: <Icon type="usergroup-add" />,
      };

    //--- News
    case "tin-tuc/chu-de":
      return {
        link: "Tin tức > Chủ đề tin tức",
        icon: <Icon type="pic-left" />,
      };

    case "tin-tuc/noi-dung-tin-tuc":
      return {
        link: "Tin tức > Danh sách tin tức",
        icon: <Icon type="pic-left" />,
      };

    case "tin-tuc/them-noi-dung-tin-tuc":
      return {
        link: "Tin tức > Thêm tin tức",
        icon: <Icon type="pic-left" />,
      };

    case "tin-tuc/xem-noi-dung-tin-tuc":
      return {
        link: "Tin tức > Xem tin tức",
        icon: <Icon type="pic-left" />,
      };

    case "tin-tuc/sua-noi-dung-tin-tuc":
      return {
        link: "Tin tức > Sửa tin tức",
        icon: <Icon type="pic-left" />,
      };

    //--- Diploma
    case "chung-chi":
      return {
        link: "Chứng chỉ",
        icon: <Icon type="book" />,
      };

    case "thong-tin-chung-chi":
      return {
        link: "Chứng chỉ > Thông tin chứng chỉ",
        icon: <Icon type="book" />,
      };

    // --- Pay
    case "thanh-toan-tien":
      return {
        link: "Thanh toán tiền",
        icon: <Icon type="wallet" />,
      };

    //--- Role
    case "phan-quyen":
      return {
        link: "Phân quyền",
        icon: <Icon type="edit" />,
      };

    case "them-phan-quyen":
      return {
        link: "Phân quyền > Thêm bộ quyền",
        icon: <Icon type="edit" />,
      };

    case "xem-phan-quyen":
      return {
        link: "Phân quyền > Xem bộ quyền",
        icon: <Icon type="edit" />,
      };

    // --- History
    case "lich-su":
      return {
        link: "Lịch sử",
        icon: <Icon type="history" />,
      };

    //--- Layout User
    case "giao-dien-nguoi-dung/quang-cao":
      return {
        link: "Giao diện người dùng > quảng cáo",
        icon: <Icon type="align-center" />,
      };

    case "giao-dien-nguoi-dung/cam-nhan-hoc-vien":
      return {
        link: "Giao diện người dùng > cảm nhận của học viên",
        icon: <Icon type="align-center" />,
      };

    case "thong-tin-cam-nhan-hoc-vien":
      return {
        link: "Giao diện người dùng > cảm nhận của học viên > thông tin",
        icon: <Icon type="align-center" />,
      };

    case "giao-dien-nguoi-dung/gioi-thieu-va-lien-he":
      return {
        link: "Giao diện người dùng > giới thiệu và liên hệ",
        icon: <Icon type="align-center" />,
      };

    case "thong-tin-gioi-thieu-lien-he":
      return {
        link: "Giao diện người dùng > giới thiệu và liên hệ > thông tin",
        icon: <Icon type="align-center" />,
      };

    default:
      return {
        link: "Trang chủ",
        icon: <Icon type="home" />,
      };
  }
};
