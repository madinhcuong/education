import React from "react";
import { Form, Icon, Input, Button, Avatar, Row, Col } from "antd";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../../assets/css/login.css";
import logo from "../../assets/img/logo.png";

import { actRequestLogin } from "../../actions/index";

class Login extends React.Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    this.checkLogin();
  }

  checkLogin = () => {
    if (localStorage.getItem("access_token")) {
      this.props.history.push("/admin/dang-nhap");
    }
  };

  handleSubmit = (e) => {
    this.setState({
      loading: true,
    });

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmitLogin(values, this.props.history, this.callback_btn);
      }
    });
  };

  //--- callback
  callback_btn = (data) => {
    this.setState({
      loading: false,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let { login } = this.props;
    return (
      <div className="page-login">
        <div className="page-login-full">
          <div className="page-login-avatar">
            <Avatar size={64} src={logo} />
          </div>
          <div className="page-login-title">
            TRUNG TÂM ĐÀO TẠO TIN HỌC
            <div className="page-login-title">TRÍ NGUYỄN</div>
          </div>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    message: "Tên đăng nhập không được để trống!",
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                  className="login-form-input"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Mật khẩu không được để trống!" },
                ],
              })(
                <Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                  className="login-form-input"
                />
              )}
            </Form.Item>
            <Row>
              <Col span={24} className="login-form-error">
                {login.error ? login.error : ""}
              </Col>
            </Row>
            <Form.Item>
              <Button
                htmlType="submit"
                className="login-form-button login-form-input"
                loading={this.state.loading}
              >
                Đăng nhập
              </Button>
              <Link
                to="/admin/gui-ma-reset-mat-khau"
                className="login-form-forgot"
              >
                Quên mật khẩu
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { login: state.login };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSubmitLogin: (body, history, cb) => {
      dispatch(actRequestLogin(body, history, cb));
    },
  };
};

Login.propTypes = {
  history: PropTypes.object,
};

const CreatedForm = Form.create({ name: "normal_login" })(withRouter(Login));
export default connect(mapStateToProps, mapDispatchToProps)(CreatedForm);
