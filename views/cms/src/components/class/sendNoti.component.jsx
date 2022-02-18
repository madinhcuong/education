import React from "react";
import { Modal, Form, Button, Row, Col, Input } from "antd";

class SendNoti extends React.Component {
  render() {
    const { TextArea } = Input;
    const { getFieldDecorator } = this.props.form;
    const {
      visible_modalNoti,
      handleSubmit_SendNoti,
      handleCancel_Noti,
    } = this.props;

    return (
      <Modal
        title="Gửi thông báo"
        visible={visible_modalNoti}
        onCancel={handleCancel_Noti}
        footer={[
          <Button key="submit" type="primary" onClick={handleSubmit_SendNoti}>
            Gửi thông báo
          </Button>,
          <Button key="back" onClick={handleCancel_Noti}>
            Đóng
          </Button>,
        ]}
      >
        <Row>
          <Form>
            <Row>
              <Col className="edit-score-byClass">
                <h5>Tiêu đề</h5>
                <Form.Item>
                  {getFieldDecorator("title", {
                    rules: [
                      {
                        required: true,
                        message: "Tiêu đề không được để trống",
                      },
                    ],
                  })(
                    <Input placeholder="Nhập tiêu đề..." />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col className="edit-score-byClass">
                <h5>Nội dung</h5>
                <Form.Item>
                  {getFieldDecorator("description", {
                    rules: [
                      {
                        required: true,
                        message: "Nội dung không được để trống",
                      },
                    ],
                  })(<TextArea placeholder="Nhập nội dung" allowClear />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Row>
      </Modal>
    );
  }
}

const Send_Noti = Form.create()(SendNoti);
export default Send_Noti;
