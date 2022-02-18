import React from "react";
import { Modal, Form, Input } from "antd";
import * as url from "../../utils/url_api";

class EditTraining extends React.Component {
  render() {
    const {
      visible,
      onCancel,
      onUpdate,
      form,
      onEdit,
      _onChange_image,
      imageUrl,
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Thông tin đào tạo"
        okText="Sửa đổi"
        onCancel={onCancel}
        onOk={onUpdate}
        className="trn-model-edit"
      >
        <Form layout="vertical">
          <Form.Item label="Tên đào tạo">
            {getFieldDecorator("name", {
              initialValue: onEdit.name,
              rules: [
                {
                  required: true,
                  message: "Tên đào tạo không được để trống !",
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("avatar", {
              initialValue: onEdit.image,
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
              <img
                src={imageUrl ? imageUrl : `${url.api_url}/${onEdit.image}`}
                alt={`${onEdit.image}`}
              />
            </div>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const CollectionCreateForm = Form.create({ name: "form_in_modal" })(
  EditTraining
);
export default CollectionCreateForm;
