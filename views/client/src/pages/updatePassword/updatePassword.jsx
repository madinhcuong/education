import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Form, Input, Button, Row, Col, Alert } from "antd";

import {
  actRequestUpdatePassWord,
  ResetErrorInforClient
} from "../../actions/inforClient.action";

class UpdatePassword extends React.Component {
  componentDidMount() {
    this.props.onResetLogout();
  }

  handleSubmit_updatePass = e => {
    e.preventDefault();
    this.props.form.validateFields((err, body) => {
      if (!err) {
        console.log("Received values of form: ", body);
        this.props.onUpdatePassWord(body, this.props.history);
      }
    });
  };

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    let { getFieldDecorator } = this.props.form;
    let { inforClient } = this.props;

    return (
      <div className="form-update-password">
        <Row style={{ paddingTop: "30px", textAlign: "center" }}>
          <Col span={24}>
            <h3>Thay đổi mật khẩu</h3>
          </Col>
        </Row>
        <Row>
          <Col
            xs={{ span: 20, offset: 2 }}
            sm={{ span: 20, offset: 2 }}
            md={{ span: 10, offset: 7 }}
            lg={{ span: 10, offset: 7 }}
            xl={{ span: 10, offset: 7 }}
          >
            <Form onSubmit={this.handleSubmit_updatePass}>
              <Form.Item label="Mật khẩu cũ" hasFeedback>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "Mật khẩu không được để trống !"
                    },
                    { min: 6, message: "Mật khẩu lớn hơn 6 ký tự" }
                  ]
                })(<Input.Password />)}
              </Form.Item>
              <Form.Item label="Mật khẩu mới" hasFeedback>
                {getFieldDecorator("newpassword", {
                  rules: [
                    {
                      required: true,
                      message: "Mật khẩu không được để trống !"
                    },
                    { min: 6, message: "Mật khẩu lớn hơn 6 ký tự" }
                  ]
                })(<Input.Password />)}
              </Form.Item>
              {inforClient && inforClient.error ? (
                <Row>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Alert
                      message={`${inforClient && inforClient.error}`}
                      type="error"
                      showIcon
                    />
                  </Col>
                </Row>
              ) : null}
              <Row>
                <Col span={24} style={{ textAlign: "center" }}>
                  <Form.Item>
                    <Button htmlType="submit" className="btn-component-addnew">
                      Sửa đổi
                    </Button>
                    <Button
                      onClick={this.onClose}
                      className="btn-component-close"
                    >
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

const mapStateToProps = state => {
  return {
    inforClient: state.inforClient
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onUpdatePassWord: (body, history) => {
      dispatch(actRequestUpdatePassWord(body, history));
    },

    onResetLogout: () => {
      dispatch(ResetErrorInforClient());
    }
  };
};

const Update_Password = Form.create()(withRouter(UpdatePassword));
export default connect(mapStateToProps, mapDispatchToProps)(Update_Password);
