export const Array_ItemEditRole = message => {
  return {
    rules: [{ required: true, message: `${message}` }]
  };
};

export const vali_name = {
  rules: [{ required: true, message: "Họ và tên không được để trống !" }]
};

export const vali_phone = {
  rules: [
    { required: true, message: "Số điện thoại không được để trống !" },
    {
      min: 9,
      message: "Không phải số điện thoại !"
    },
    {
      max: 10,
      message: "Không phải số điện thoại !"
    }
  ]
};

export const vali_address = {
  rules: [{ required: true, message: "Địa chỉ không được để trống !" }]
};

export const vali_sex = {
  rules: [
    {
      required: true,
      message: "Giới tính không được để trống !"
    }
  ]
};

export const vali_email = {
  rules: [
    {
      type: "email",
      message: "Không phải là Email !"
    },
    { required: true, message: "Email không được để trống!" }
  ]
};

export const vali_password = {
  rules: [
    {
      required: true,
      message: "Mật khẩu không được để trống !"
    },
    { min: 6, message: "Mật khẩu lớn hơn 6 ký tự" }
  ]
};

export const vali_training = {
  rules: [{ required: true, message: "Chuyên nghành không được để trống !" }]
};

export const vali_date = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Ngày sinh không được để trống !"
    }
  ]
};

export const vali_role = {
  rules: [{ required: true, message: "Quyền không được để trống !" }]
};

export const vali_upload_Image = {
  rules: [{ required: true, message: "Ảnh đại điện không được để trống !" }]
};
