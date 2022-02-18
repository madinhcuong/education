import React from "react";
import { Form, Input, Button, Row, Col, Alert } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { vali_password } from "../../helpers/validate";

import {
  actRequestUpdatePassWord,
  ResetInforUser,
} from "../../actions/inforUser.action";

class UpdatePassword extends React.Component {
  componentDidMount() {
    this.props.onResetInforUser();
  }

  handleSubmit_updatePass = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, body) => {
      if (!err) {
        this.props.onUpdatePassWord(body, this.props.history);
      }
    });
  };

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    let { getFieldDecorator } = this.props.form;
    let { inforUser } = this.props;

    return (
      <div>
        <Row className="main-content">
          <Col span={10} offset={7}>
            <Form onSubmit={this.handleSubmit_updatePass}>
              <Form.Item label="Mật khẩu cũ" hasFeedback>
                {getFieldDecorator(
                  "password",
                  vali_password
                )(<Input.Password />)}
              </Form.Item>
              <Form.Item label="Mật khẩu mới" hasFeedback>
                {getFieldDecorator(
                  "newpassword",
                  vali_password
                )(<Input.Password />)}
              </Form.Item>
              {inforUser && inforUser.error ? (
                <Row>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Alert
                      message={`${inforUser && inforUser.error}`}
                      type="error"
                      showIcon
                    />
                  </Col>
                </Row>
              ) : null}
              <Row>
                <Col span={24} style={{ textAlign: "center" }}>
                  <Form.Item>
                    <Button htmlType="submit" className="btn-create-new">
                      Lưu lại
                    </Button>
                    <Button onClick={this.onClose} className="btn-close">
                      Quay lại
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inforUser: state.inforUser,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onUpdatePassWord: (data, history) => {
      dispatch(actRequestUpdatePassWord(data, history));
    },
    onResetInforUser: () => {
      dispatch(ResetInforUser());
    },
  };
};

const Update_Password = Form.create()(withRouter(UpdatePassword));
export default connect(mapStateToProps, mapDispatchToProps)(Update_Password);
