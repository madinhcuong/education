import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Icon, Input, Button, Avatar, Row, Col } from "antd";
import "../../assets/css/login.css";
import logo from "../../assets/img/logo.png";
import { vali_email } from "../../helpers/validate";

import {
  ResetForGotPass,
  actRequestSendEmailResetPass,
} from "../../actions/forgotPassWord";

class SendMail extends React.Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    this.props.onResetForGotPass();
    this.checkLogin();
  }

  checkLogin = () => {
    if (localStorage.getItem("access_token")) {
      this.props.history.push("/");
    }
  };

  handleSubmit_SendEmail = (e) => {
    this.setState({
      loading: true,
    });

    e.preventDefault();
    this.props.form.validateFields((err, body) => {
      if (!err) {
        this.props.onSubmitSendEmailResetPass(
          { email: body.email },
          this.props.history,this.callback_btn
        );
      }
    });
  };

  onClose = () => {
    this.props.history.goBack();
  };

  //--- callback
  callback_btn = (data) => {
    this.setState({
      loading: false,
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
          <div className="page-sendemail">Gửi mã reset mật khẩu</div>
          <Form onSubmit={this.handleSubmit_SendEmail} className="login-form">
            <Form.Item>
              {getFieldDecorator(
                "email",
                vali_email
              )(
                <Input
                  prefix={
                    <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Nhập email ..."
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
                <Button
                  htmlType="submit"
                  loading={this.state.loading}
                  className="btn-component-addnew"
                >
                  Gửi email
                </Button>
                <Button onClick={this.onClose} className="btn-component-close">
                  Quay lại
                </Button>
              </Col>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    forgotPassWord: state.forgotPassWord,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSubmitSendEmailResetPass: (body, history,cb) => {
      dispatch(actRequestSendEmailResetPass(body, history,cb));
    },

    onResetForGotPass: () => {
      dispatch(ResetForGotPass());
    },
  };
};

const Send_Mail = Form.create({ name: "normal_login" })(withRouter(SendMail));
export default connect(mapStateToProps, mapDispatchToProps)(Send_Mail);
