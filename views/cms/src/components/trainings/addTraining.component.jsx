import React from "react";
import { Modal, Form, Input } from "antd";

class AddTraining extends React.Component {
  render() {
    const {
      visible,
      onCancel,
      onCreate,
      form,
      imageUrl,
      _onChange_image,
    } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        visible={visible}
        title="Thêm mới hệ đào tạo"
        okText="Thêm mới"
        onCancel={onCancel}
        onOk={onCreate}
        className="trn-model-add"
      >
        <Form layout="vertical">
          <Form.Item label="Tên đào tạo">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Tên đào tạo không được để trống !",
                },
              ],
            })(<Input />)}
          </Form.Item>

          {/* ---------------- */}
          <Form.Item>
            {getFieldDecorator("avatar", {
              rules: [
                {
                  required: true,
                  message: "Ảnh không được để trống",
                },
              ],
            })(
              <label className="staff-custom-file-upload">
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={_onChange_image}
                />
                Chọn ảnh
              </label>
            )}
            <div className="training-img">
              <img src={imageUrl} alt={`${imageUrl}`} />
            </div>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const CollectionCreateForm = Form.create({ name: "form_in_modal" })(
  AddTraining
);
export default CollectionCreateForm;
