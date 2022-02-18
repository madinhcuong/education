import React from "react";
import { Modal, Form, InputNumber, Button, Row, Col } from "antd";

class EditScore extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      visible_modal,
      handleSubmit_EditScore,
      handleCancel_edit_Score,
      inforStudent,
    } = this.props;

    return (
      <Modal
        title="Sửa điểm học viên"
        visible={visible_modal}
        onCancel={handleCancel_edit_Score}
        footer={[
          <Button key="submit" type="primary" onClick={handleSubmit_EditScore}>
            Sửa đổi
          </Button>,
          <Button key="back" onClick={handleCancel_edit_Score}>
            Đóng
          </Button>,
        ]}
      >
        <Row>
          <Form>
            <Col span={12} className="edit-score-byClass">
              <h5>Điểm 1 (30%)</h5>
              <Form.Item>
                {getFieldDecorator("score_30", {
                  initialValue: inforStudent.score_30 && inforStudent.score_30,
                  rules: [
                    {
                      required: true,
                      message: "Điểm không được để trống",
                    },
                  ],
                })(
                  <InputNumber
                    min={0}
                    max={10}
                    placeholder="Nhập điểm"
                    style={{ width: "100%" }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12} className="edit-score-byClass">
              <h5>Điểm 2 (70%)</h5>
              <Form.Item>
                {getFieldDecorator("score_70", {
                  initialValue: inforStudent.score_70 && inforStudent.score_70,
                  rules: [
                    {
                      required: true,
                      message: "Điểm không được để trống",
                    },
                  ],
                })(
                  <InputNumber
                    min={0}
                    max={10}
                    placeholder="Nhập điểm"
                    style={{ width: "100%" }}
                  />
                )}
              </Form.Item>
            </Col>
          </Form>
        </Row>
      </Modal>
    );
  }
}

const Edit_Score = Form.create()(EditScore);
export default Edit_Score;
