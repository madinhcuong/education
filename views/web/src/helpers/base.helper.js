import swal from "sweetalert";
import errorCode from "../config/errorCode";

export const Delay_History_Goback = history => {
  setTimeout(() => {
    history.goBack();
  }, 700);
};

export const Response_Error = err => {
  if (err.response && err.response.data.status === 400) {
    return swal(`${errorCode(err.response.data.errcode)}`, "", "error");
  }
  if (err.response && err.response.data.status === 888) {
    return swal({
      title: `${errorCode(err.response.data.errcode)}`,
      text: "",
      icon: "warning"
    }).then(success => {
      window.location = "/";
    });
  } else {
    return swal(`${errorCode(0)}`, "", "error");
  }
};

export const truncate = (input, number) => {
  if (input.length > number) return input.substring(0, number) + "...";
  else return input;
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

export const formatNumber = num => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const switch_th = param => {
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