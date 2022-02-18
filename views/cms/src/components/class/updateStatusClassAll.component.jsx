import React from "react";
import { Modal, Form, Select } from "antd";
const { Option } = Select;

class UpdateStatusClassAll extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      visible,
      handleOk_UpdateStatus,
      handleCancel_UpdateStatus,
      data_ClassAll
    } = this.props;

    return (
      <Modal
        title="Trạng thái lớp học"
        okText="Sửa đổi"
        cancelText="Đóng"
        visible={visible}
        onOk={handleOk_UpdateStatus}
        onCancel={handleCancel_UpdateStatus}
      >
        <Form layout="vertical">
          <Form.Item>
            {getFieldDecorator("status", {
              initialValue: data_ClassAll ? data_ClassAll.status : "",
              rules: [
                {
                  required: true,
                  message: "Please input passenger's name or delete this field."
                }
              ]
            })(
              <Select
                style={{ width: 120 }}
                className="classAll-select-update-status"
              >
                <Option value="OPEN">Đang mở</Option>
                <Option value="STUDYING">Đang học</Option>
                <Option value="CLOSE">Kết thúc</Option>
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const Update_Status_ClassAll = Form.create({ name: "form_in_modal" })(
  UpdateStatusClassAll
);
export default Update_Status_ClassAll;
