import React from "react";
import { Form, Icon, Input, Button, Avatar, Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "../../assets/css/login.css";
import logo from "../../assets/img/logo.png";
import { vali_password } from "../../helpers/validate";

import { actRequestResetPassWord } from "../../actions/forgotPassWord";

class ResetPassWord extends React.Component {
  componentDidMount() {
    this.checkLogin();
  }

  checkLogin = () => {
    if (localStorage.getItem("access_token")) {
      this.props.history.push("/");
    }
  };

  handleSubmit_ResetPass = e => {
    e.preventDefault();
    this.props.form.validateFields((err, body) => {
      if (!err) {
        this.props.onResetPassWord(body, this.props.history);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    let { forgotPassWord } = this.props;
    return (
      <div className="page-login">
        <div className="page-login-full">
          <div className="page-login-avatar">
            <Avatar size={64} src={logo} />
          </div>
          <div className="page-sendemail">Reset mật khẩu</div>
          <Form onSubmit={this.handleSubmit_ResetPass} className="login-form">
            <Form.Item>
              {getFieldDecorator("key", {
                rules: [{ required: true, message: "Mã không được để trống!" }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Nhập mã reset mật khẩu ..."
                  className="login-form-input"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator(
                "password",
                vali_password
              )(
                <Input.Password
                  type="password"
                  placeholder="Nhập mật khẩu mới ..."
                  className="login-form-input"
                />
              )}
            </Form.Item>
            <Row>
              <Col span={24} className="login-form-error">
                {forgotPassWord.error ? forgotPassWord.error : ""}
              </Col>
            </Row>
            <Form.Item>
              <Col span={24} className="page-sendemail-submit">
                <Button htmlType="submit" className="btn-component-addnew">
                  Sửa đổi
                </Button>
              </Col>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { forgotPassWord: state.forgotPassWord };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onResetPassWord: (body, history) => {
      dispatch(actRequestResetPassWord(body, history));
    }
  };
};

const Reset_PassWord = Form.create({ name: "normal_login" })(
  withRouter(ResetPassWord)
);
export default connect(mapStateToProps, mapDispatchToProps)(Reset_PassWord);
