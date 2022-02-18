import React from "react";
import { Modal, Form, Input } from "antd";
import { connect } from "react-redux";

class EditTopic extends React.Component {
  state = {
    visible: false
  };

  render() {
    const { visible, onCancel, onEdit, form, infoEdit } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        visible={visible}
        title="Sửa chủ đề"
        okText="Sửa đổi"
        onCancel={onCancel}
        onOk={onEdit}
      >
        <Form layout="vertical">
          <Form.Item label="Tên chủ đề">
            {getFieldDecorator("name_topic", {
              initialValue: infoEdit.name_topic,
              rules: [
                { required: true, message: "Tên chủ đề không được để trống !" }
              ]
            })(<Input />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

const CollectionEditForm = Form.create({ name: "form_in_modal" })(EditTopic);
export default connect(mapStateToProps, mapDispatchToProps)(CollectionEditForm);
