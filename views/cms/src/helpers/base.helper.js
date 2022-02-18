import errorCode from "../config/errorCode";
import { Modal } from "antd";

export const Array_ItemEditRole = (role_config, permissions) => {
  let array_new = [];
  for (let item of role_config) {
    if (permissions.includes(item.value)) {
      array_new.push(item.value);
    }
  }
  return array_new;
};

export const findIndex = (data, id) => {
  let local = null;
  data.forEach((item, key) => {
    if (item._id === id) {
      local = key;
    }
    return local;
  });
  return local;
};

export const sort_array_list_day = (a, b) => {
  if (a.th < b.th) {
    return -1;
  }
  if (a.th > b.th) {
    return 1;
  }
  return 0;
};

export const Delay_History_Goback = (history) => {
  setTimeout(() => {
    history.goBack();
  }, 700);
};

export const Response_Error = (err) => {
  if (err.response && err.response.data.status === 400) {
    return Modal.warning({
      title: `${errorCode(err.response.data.errcode)}`,
      content: "",
      className: "modal-error",
      okButtonProps: { type: "primary", ghost: true },
      centered: true,
    });
  }
  if (err.response && err.response.data.status === 888) {
    return Modal.warning({
      title: `${errorCode(err.response.data.errcode)}`,
      content: "",
      onOk: () => {
        window.location = "/admin";
      },
      className: "modal-error",
      okButtonProps: { type: "primary", ghost: true },
      centered: true,
    });
  } else {
    return Modal.warning({
      title: `${errorCode(0)}`,
      content: "",
      className: "modal-error",
      okButtonProps: { type: "primary", ghost: true },
      centered: true,
    });
  }
};

export const Response_Success = (title, content, maskClosable) => {
  Modal.success({
    title: title,
    content: content,
    className: "modal-success",
    maskClosable: maskClosable,
    centered: true,
    okButtonProps: { type: "primary", ghost: true },
  });
};

// chuyên số thành thứ
export const switch_th = (param) => {
  switch (param) {
    case 0:
      return "Chủ nhật";
    case 1:
      return "Thứ 2";
    case 2:
      return "Thứ 3";
    case 3:
      return "Thứ 4";
    case 4:
      return "Thứ 5";
    case 5:
      return "Thứ 6";
    case 6:
      return "Thứ 7";
    default:
      return null;
  }
};

export const _Status_ClassAll = (status) => {
  switch (status) {
    case "OPEN":
      return { name: "Đang mở", color: "#41a211" };
    case "STUDYING":
      return { name: "Đang học", color: "#d42a2a" };
    default:
      return { name: "Kết thúc", color: "#bfbfbf" };
  }
};

export const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const ScoreCumulative_Rank = (level) => {
  // if (wallet < 500) {
  //   return { name: "ĐỒNG", color: "volcano" };
  // } else if (wallet < 1000) {
  //   return { name: "BẠC", color: "geekblue" };
  // } else if (wallet < 10000) {
  //   return { name: "VÀNG", color: "gold" };
  // } else return { name: "KIM CƯƠNG", color: "green" };
  switch (level) {
    case "bronze":
      return { name: "ĐỒNG", color: "volcano" };
    case "silver":
      return { name: "BẠC", color: "geekblue" };
    case "gold":
      return { name: "VÀNG", color: "gold" };
    case "diamond":
      return { name: "KIM CƯƠNG", color: "green" };
    default:
      return null;
  }
};

export const distribution_student = (number) => {
  if (number <= 4.9) return { name: "CHƯA ĐẠT", color: "#f50" };
  if (number <= 6.4) return { name: "TRUNG BÌNH", color: "#2db7f5" };
  if (number <= 7.9) return { name: "KHÁ", color: "#108ee9" };
  if (number > 7.9) return { name: "GIỎI", color: "#87d068" };
};

export const switch_sex = (key) => {
  switch (key) {
    case "MALE":
      return "Nam";
    case "FEMALE":
      return "Nữ";
    default:
      return null;
  }
};

export const Payments = (payment) => {
  switch (payment) {
    case "LOCAL":
      return "Trực tiếp";
    case "PAYPAL":
      return "PayPal";
    case "VNPAY":
      return "VnPay";
    case "MOMO":
      return "MoMo";
    default:
      return null;
  }
};

// cat chuoi ...
export const truncate = (source, size) => {
  return source.length > size ? source.slice(0, size - 1) + "..." : source;
};
