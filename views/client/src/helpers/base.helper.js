export const ScoreCumulative_Rank = (level) => {
  // if (wallet < 500) {
  //   return { name: "Đồng", color: "volcano" };
  // } else if (wallet < 1000) {
  //   return { name: "Bạc", color: "geekblue" };
  // } else if (wallet < 10000) {
  //   return { name: "Vàng", color: "gold" };
  // } else return { name: "Kim Cương", color: "green" };
  switch (level) {
    case "bronze":
      return "Đồng";
    case "silver":
      return "Bạc";
    case "gold":
      return "Vàng";
    case "diamond":
      return "Kim cương";
    default:
      return null;
  }
};

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

export const distribution_student = (number) => {
  if (number <= 4.9) return { name: "CHƯA ĐẠT", color: "#f50" };
  if (number <= 6.4) return { name: "TRUNG BÌNH", color: "#2db7f5" };
  if (number <= 7.9) return { name: "KHÁ", color: "#108ee9" };
  if (number > 7.9) return { name: "GIỎI", color: "#87d068" };
};

export const _Status_ClassAll = (status) => {
  switch (status) {
    case "OPEN":
      return { name: "Đang mở", color: "#41a211" };
    case "STUDYING":
      return { name: "Đang học", color: "#87d068" };
    default:
      return { name: "Kết thúc", color: "#2db7f5" };
  }
};

export const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const Delay_History_Goback = (history) => {
  setTimeout(() => {
    history.goBack();
  }, 700);
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
