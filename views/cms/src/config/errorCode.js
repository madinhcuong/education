let errorCode = (state) => {
  switch (state) {
    case 0:
      return "Lỗi server !!!";

    case 999:
      return "Bạn phải đăng nhập vào hệ thống !!!";

    case 100:
      return "Sai email hoặc mật khẩu !!!";

    case 888:
      return "Bạn không có quyền thực hiện, vui lòng thông báo với Admin nếu có nhiệm vụ truy cập.";

    case 2:
      return "Không tìm thấy chủ đề !!!";

    case 6:
      return "Không tạo mới được hệ đào tạo !!!";

    case 8:
      return "Không tìm thấy hệ đào tạo !!!";

    case 10:
      return "Không tìm thấy quyền !!!";

    case 12:
      return "Không tạo được nhân viên !!!";

    case 14:
      return "Không tìm thấy giáo viên !!!";

    case 16:
      return "Không tìm thấy nhân viên !!!";

    case 18:
      return "Tài khoản đã tồn tại";

    case 20:
      return "Không tạo được thông tin khóa học !!!";

    case 22:
      return "Không tìm thấy thông tin khóa học !!!";

    case 24:
      return "Không tạo được khóa học !!!";

    case 26:
      return "Không tìm thấy khóa học !!!";

    case 28:
      return "Không tạo được lớp học !!!";

    case 30:
      return "Không tìm thấy lớp học !!!";

    case 32:
      return "Không tạo được học viên !!!";

    case 34:
      return "Không tạo được ví !!!";

    case 36:
      return "Không tìm thấy email !!!";

    case 38:
      return "Kết nối tài khoản email thất bại !!!";

    case 40:
      return "Không gửi được email !!!";

    case 42:
      return "Không tìm thấy mã reset password hoặc hết thời gian !!!";

    case 44:
      return "Không tìm thấy học viên !!!";

    case 46:
      return "Bạn đã đăng ký lớp học này !!!";

    case 48:
      return "Không tìm thấy học viên đăng ký !!!";

    case 50:
      return "Không có học viên !!!";

    case 52:
      return "Không tìm thấy đào tạo";

    case 54:
      return "Lịch giảng dạy bị trùng";

    case 56:
      return "Giáo viên đang giảng dạy lớp này";

    case 58:
      return "Không tìm thấy file";

    case 60:
      return "Không tìm thấy thông tin điểm";

    case 62:
      return "Không tìm thấy sinh viên";

    case 64:
      return "Bạn chưa đăng ký tài khoản";

    case 66:
      return "Sai mật khẩu";

    case 68:
      return "Không tìm thấy người dùng";

    case 70:
      return "Bạn chưa tích đủ điểm để đổi tiền";

    case 72:
      return "Không tìm thấy ví tiền";

    case 74:
      return "Điểm tích lũy không đủ";

    case 76:
      return "Vui lòng nhập đúng số điểm";

    case 78:
      return "Upload ảnh thất bại";

    case 80:
      return "Không tìm thấy chứng chỉ";

    case 82:
      return "Yêu cầu thanh toán paypal không hợp lệ";

    case 84:
      return "Thực hiện thanh toán không thành công. Vui lòng kiểm tra tài khoản thanh toán";

    case 86:
      return "Bạn được giảm giá 100% vui lòng chọn phương thức thanh toán tại trung tâm";

    case 88:
      return "Chữ ký không hợp lệ (thanh toán không thành công)";

    case 90:
      return "Số tiền của bạn không đủ để gửi yêu cầu";

    case 92:
      return "Không tìm thấy yêu cầu thanh toán tiền";

    case 94:
      return "Số tiền trong ví không đủ để thực hiện yêu cầu";

    case 96:
      return "Không tìm thấy thông tin dịch Covid-19";

    case 98:
      return "Không tìm thấy dữ liệu để xuất báo cáo";

    case 102:
      return "Không tìm thấy thông tin người giới thiệu";

    case 104:
      return "Bạn chưa tích đủ số điểm";

    case 106:
      return "Không tìm thấy thông tin người gửi yêu cầu thanh toán";

    case 108:
      return "Import điểm học viên lỗi";

    case 110:
      return "Upload ảnh lỗi";

    case 112:
      return "Không tìm thấy ảnh";

    case 114:
      return "Không tìm thấy cảm nhận của học viên";

    case 116:
      return "Không thêm được cảm nhận của học viên";

    case 118:
      return "Không tìm thấy giới thiệu và liên hệ";

    default:
      return "Lỗi server !!!";
  }
};

export default errorCode;
