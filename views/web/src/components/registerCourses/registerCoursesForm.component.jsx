import React from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Input, Button, Select, DatePicker, Card } from "antd";
import { withRouter } from "react-router-dom";
import vnpay from "../../assets/img/vnpay.png";
//import paypal from "../../assets/img/paypal.png";
import momo from "../../assets/img/momo.jpg";

import ListClass from "./listClass.component";
import {
  actRequestGetDataClassById,
  actRequestCreateStudent,
  ResetStateRegister,
  actRequestCreateStudentAndPaymentPaypal,
  actRequestCreateStudentAndPaymentVnpay,
  actRequestCreateStudentAndPaymentMomo,
} from "../../actions/registerCourses.action";

class RigisterCoursesForm extends React.Component {
  state = {
    agent_code: "",
    name: "",
    date: "",
    sex: "",
    phone: "",
    address: "",
    email: "",
    discount_code: "",
    payment_method: "",
    check_account_val: "NOACCOUNT",
    check_account: true,
    vali_email: false,
    check_payment_method: false,

    // -- loading
    loading: false,
  };

  // -- loading button
  enterLoading = () => {
    this.setState({ loading: true });
  };
  //-- end loading

  onChange_input = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "email") {
      this.setState({ vali_email: false });
    }
  };

  onChange_Select_Sex = async (value, event) => {
    await this.setState({
      sex: value,
    });
  };

  onChange_Date = (date, dateString) => {
    this.setState({
      date: dateString,
    });
  };

  payment_method = (key) => {
    this.setState({
      payment_method: key,
      check_payment_method: false,
    });
  };

  onChange_button_code = () => {
    if (!this.state.email) {
      this.setState({ vali_email: true });
    } else {
      this.setState({ vali_email: false });
      let { match } = this.props;
      if (match) {
        let id = match.params.id;
        this.props.onGetDataClassById(
          id,
          this.state.email,
          this.state.discount_code,
          true
        );
      }
    }
  };

  check_account_handleChange = (value) => {
    if (value === "ACCOUNT") {
      this.setState({
        check_account_val: "ACCOUNT",
        check_account: false,
      });
      this.props.onResetStateRegister();
    } else {
      this.setState({
        check_account_val: "NOACCOUNT",
        check_account: true,
      });
      this.props.onResetStateRegister();
    }
  };

  _registerCourses_handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.payment_method === "") {
      this.setState({
        check_payment_method: true,
      });
    }
    this.props.form.validateFields((err, values) => {
      let { match } = this.props;

      if (
        !err &&
        match &&
        this.state.payment_method &&
        this.state.payment_method !== ""
      ) {
        let id = match.params.id;
        let data = {
          id_class: id,
          name: this.state.name,
          sex: this.state.sex,
          date: this.state.date,
          address: this.state.address,
          phone: this.state.phone,
          email: this.state.email,
          discount_code: this.state.discount_code,
          agent_code: this.state.agent_code,
          check_account_val: this.state.check_account_val,
          payment_method: this.state.payment_method,
        };

        if (this.state.payment_method === "LOCAL")
          return this.props.onCreateStudent(data, this.props.history);

        // thanh toán paypal
        if (this.state.payment_method === "PAYPAL") {
          return this.props.onCreateStudentAndPaymentPaypal(
            data,
            this.props.history
          );
        }

        // thanh toán vnpay
        if (this.state.payment_method === "VNPAY") {
          return this.props.onCreateStudentAndPaymentVnpay(data);
        }

        // thanh toán MoMo
        if (this.state.payment_method === "MOMO") {
          return this.props.onCreateStudentAndPaymentMomo(data);
        }
      }
    });
  };

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
    let { registerCourses } = this.props;

    // if (registerCourses.loadPagePayment) {
    //   return <Redirect to="/checkout-payment" />;
    // }

    return (
      <div>
        <Row>
          <Col span={24}>
            <div className="register-form">
              <Form onSubmit={this._registerCourses_handleSubmit}>
                <Row>
                  <Col
                    xs={{ span: 20, offset: 2 }}
                    sm={{ span: 20, offset: 2 }}
                    md={{ span: 10, offset: 1 }}
                    lg={{ span: 9, offset: 2 }}
                    xl={{ span: 9, offset: 2 }}
                  >
                    <p className="form-title">Đối tượng</p>
                    <Form.Item>
                      <Select
                        defaultValue="NOACCOUNT"
                        onChange={this.check_account_handleChange}
                      >
                        <Option value="NOACCOUNT">
                          Chưa học tại trung tâm
                        </Option>
                        <Option value="ACCOUNT">Đã học tại trung tâm</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  {this.state.check_account ? (
                    <Col
                      xs={{ span: 20, offset: 2 }}
                      sm={{ span: 20, offset: 2 }}
                      md={{ span: 10, offset: 2 }}
                      lg={{ span: 9, offset: 2 }}
                      xl={{ span: 9, offset: 2 }}
                    >
                      <p className="form-title">Người giới thiệu</p>
                      <Form.Item>
                        {getFieldDecorator("agent_code")(
                          <Input
                            name="agent_code"
                            onChange={this.onChange_input}
                            placeholder="Nhập mã người giới thiệu ..."
                          />
                        )}
                      </Form.Item>
                    </Col>
                  ) : null}
                </Row>

                <Row>
                  {!this.state.check_account ? (
                    <Col
                      xs={{ span: 20, offset: 2 }}
                      sm={{ span: 20, offset: 2 }}
                      md={{ span: 10, offset: 1 }}
                      lg={{ span: 9, offset: 2 }}
                      xl={{ span: 9, offset: 2 }}
                    >
                      <p className="form-title">Email</p>
                      <Form.Item>
                        {getFieldDecorator("email", {
                          rules: [
                            {
                              required: true,
                              message: "Email không được để trống",
                            },
                          ],
                        })(
                          <Input
                            name="email"
                            onChange={this.onChange_input}
                            placeholder="Nhập email ..."
                          />
                        )}
                        {!this.state.vali_email ? (
                          ""
                        ) : (
                          <div className="ant-form-explain table-listclass-input-check-code">
                            Email không được để trống
                          </div>
                        )}
                      </Form.Item>
                    </Col>
                  ) : (
                    <Col
                      xs={{ span: 20, offset: 2 }}
                      sm={{ span: 20, offset: 2 }}
                      md={{ span: 10, offset: 1 }}
                      lg={{ span: 9, offset: 2 }}
                      xl={{ span: 9, offset: 2 }}
                    >
                      <p className="form-title">Họ và tên</p>
                      <Form.Item>
                        {getFieldDecorator("name", {
                          rules: [
                            {
                              required: true,
                              message: "Họ và tên không được để trống",
                            },
                          ],
                        })(
                          <Input
                            name="name"
                            onChange={this.onChange_input}
                            placeholder="Họ và tên ..."
                          />
                        )}
                      </Form.Item>
                    </Col>
                  )}

                  {!this.state.check_account ? (
                    <div>
                      <Col
                        xs={{ span: 20, offset: 2 }}
                        sm={{ span: 20, offset: 2 }}
                        md={{ span: 6, offset: 2 }}
                        lg={{ span: 6, offset: 2 }}
                        xl={{ span: 6, offset: 2 }}
                      >
                        <p className="form-title">Mã giảm giá</p>
                        <Form.Item>
                          {getFieldDecorator("discount_code")(
                            <Input
                              name="discount_code"
                              onChange={this.onChange_input}
                              placeholder="Nhập mã giảm giá ..."
                            />
                          )}
                          <div className="ant-form-explain table-listclass-input-check-code">
                            (Nhấp nút xác nhận để được ưu đãi học phí)
                          </div>
                        </Form.Item>
                      </Col>
                      <Col
                        xs={{ span: 20, offset: 2 }}
                        sm={{ span: 20, offset: 2 }}
                        md={{ span: 2, offset: 1 }}
                        lg={{ span: 2, offset: 1 }}
                        xl={{ span: 2, offset: 1 }}
                        className="table-listclass-button-check-code"
                      >
                        <Button onClick={this.onChange_button_code}>
                          Xác nhận
                        </Button>
                      </Col>
                    </div>
                  ) : (
                    <Col
                      xs={{ span: 20, offset: 2 }}
                      sm={{ span: 20, offset: 2 }}
                      md={{ span: 10, offset: 2 }}
                      lg={{ span: 9, offset: 2 }}
                      xl={{ span: 9, offset: 2 }}
                    >
                      <p className="form-title">Ngày sinh</p>
                      <Form.Item>
                        {getFieldDecorator("date", {
                          rules: [
                            {
                              required: true,
                              message: "Ngày sinh không được để trống",
                            },
                          ],
                        })(
                          <DatePicker
                            onChange={this.onChange_Date}
                            format={"DD/MM/YYYY"}
                            style={{ width: "100%" }}
                          />
                        )}
                      </Form.Item>
                    </Col>
                  )}
                </Row>
                <Row>
                  {!this.state.check_account ? null : (
                    <Col
                      xs={{ span: 20, offset: 2 }}
                      sm={{ span: 20, offset: 2 }}
                      md={{ span: 10, offset: 1 }}
                      lg={{ span: 9, offset: 2 }}
                      xl={{ span: 9, offset: 2 }}
                    >
                      {" "}
                      <p className="form-title">Số điện thoại</p>
                      <Form.Item>
                        {getFieldDecorator("phone", {
                          rules: [
                            {
                              required: true,
                              message: "Số điện thoại không được để trống !",
                            },
                            {
                              min: 9,
                              message: "Không phải số điện thoại !",
                            },
                            {
                              max: 10,
                              message: "Không phải số điện thoại !",
                            },
                          ],
                        })(
                          <Input
                            name="phone"
                            onChange={this.onChange_input}
                            type="Number"
                            placeholder="Nhập số điện thoại ..."
                          />
                        )}
                      </Form.Item>
                    </Col>
                  )}

                  {!this.state.check_account ? null : (
                    <Col
                      xs={{ span: 20, offset: 2 }}
                      sm={{ span: 20, offset: 2 }}
                      md={{ span: 10, offset: 2 }}
                      lg={{ span: 9, offset: 2 }}
                      xl={{ span: 9, offset: 2 }}
                    >
                      <p className="form-title">Email</p>
                      <Form.Item>
                        {getFieldDecorator("email", {
                          rules: [
                            {
                              type: "email",
                              message: "Không phải là Email !",
                            },
                            {
                              required: true,
                              message: "Email không được để trống",
                            },
                          ],
                        })(
                          <Input
                            name="email"
                            onChange={this.onChange_input}
                            placeholder="Nhập email ..."
                          />
                        )}
                      </Form.Item>
                    </Col>
                  )}
                </Row>

                {/* <Row>
                  {!this.state.check_account ? null : (
                    <Col
                      xs={{ span: 20, offset: 2 }}
                      sm={{ span: 20, offset: 2 }}
                      md={{ span: 10, offset: 1 }}
                      lg={{ span: 9, offset: 2 }}
                      xl={{ span: 9, offset: 2 }}
                    >
                     <p className="form-title">Giới tính</p>
                      <Form.Item>
                        {getFieldDecorator("sex", {
                          rules: [
                            {
                              required: true,
                              message: "Giới tính không được để trống",
                            },
                          ],
                        })(
                          <Select
                            onSelect={this.onChange_Select_Sex}
                            name="sex"
                          >
                            <Option value="MALE">Nam</Option>
                            <Option value="FEMALE">Nữ</Option>
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
                  )}

                  {!this.state.check_account ? null : (
                    <Col
                      xs={{ span: 20, offset: 2 }}
                      sm={{ span: 20, offset: 2 }}
                      md={{ span: 10, offset: 2 }}
                      lg={{ span: 9, offset: 2 }}
                      xl={{ span: 9, offset: 2 }}
                    >
                      <p className="form-title">Địa chỉ</p>
                      <Form.Item>
                        {getFieldDecorator("address", {
                          rules: [
                            {
                              required: true,
                              message: "Địa chỉ không được để trống",
                            },
                          ],
                        })(
                          <Input
                            name="address"
                            onChange={this.onChange_input}
                            placeholder="Nhập địa chỉ ..."
                          />
                        )}
                      </Form.Item>
                    </Col>
                  )}
                </Row> */}
                <Row>
                  <Row>
                    <Col
                      xs={{ span: 20, offset: 2 }}
                      sm={{ span: 20, offset: 2 }}
                      md={{ span: 10, offset: 7 }}
                      lg={{ span: 10, offset: 7 }}
                      xl={{ span: 10, offset: 7 }}
                    >
                      <div
                        className={registerCourses.error ? "noti-error" : ""}
                      >
                        <div>
                          {registerCourses.error ? registerCourses.error : null}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  {/* ------list ----- */}
                  <ListClass />
                </Row>
                {/* -- Payment -- */}
                <Row>
                  <Col
                    xs={{ span: 20, offset: 2 }}
                    style={{ paddingTop: "15px" }}
                  >
                    <p className="form-title">Chọn phương thức thanh toán</p>
                  </Col>
                </Row>
                <Row>
                  <Col
                    xs={{ span: 20, offset: 2 }}
                    sm={{ span: 9, offset: 2 }}
                    md={{ span: 4, offset: 1 }}
                    lg={{ span: 4, offset: 2 }}
                    xl={{ span: 3, offset: 2 }}
                    className="register-payment-local"
                  >
                    <Card
                      title=""
                      bordered={true}
                      onClick={() => this.payment_method("LOCAL")}
                      style={
                        this.state.payment_method === "LOCAL"
                          ? { border: "1px solid #f5222d" }
                          : {}
                      }
                    >
                      Thanh toán tại trung tâm
                    </Card>
                  </Col>
                  {/* <Col
                    xs={{ span: 20, offset: 2 }}
                    sm={{ span: 9, offset: 1 }}
                    md={{ span: 4, offset: 1 }}
                    lg={{ span: 4, offset: 1 }}
                    xl={{ span: 3, offset: 1 }}
                    className="register-payment"
                  >
                    <Card
                      title=""
                      onClick={() => this.payment_method("PAYPAL")}
                      bordered={true}
                      style={
                        this.state.payment_method === "PAYPAL"
                          ? { border: "1px solid #f5222d" }
                          : {}
                      }
                    >
                      <img src={paypal} alt="paypal" />
                    </Card>
                  </Col> */}
                  <Col
                    xs={{ span: 20, offset: 2 }}
                    sm={{ span: 9, offset: 2 }}
                    md={{ span: 4, offset: 1 }}
                    lg={{ span: 4, offset: 1 }}
                    xl={{ span: 3, offset: 1 }}
                    className="register-payment"
                  >
                    <Card
                      title=""
                      onClick={() => this.payment_method("VNPAY")}
                      style={
                        this.state.payment_method === "VNPAY"
                          ? { border: "1px solid #f5222d" }
                          : {}
                      }
                      bordered={true}
                    >
                      <img src={vnpay} alt="vnpay" />
                    </Card>
                  </Col>
                  <Col
                    xs={{ span: 20, offset: 2 }}
                    sm={{ span: 9, offset: 1 }}
                    md={{ span: 4, offset: 1 }}
                    lg={{ span: 4, offset: 1 }}
                    xl={{ span: 3, offset: 1 }}
                    className="register-payment"
                  >
                    <Card
                      title=""
                      onClick={() => this.payment_method("MOMO")}
                      style={
                        this.state.payment_method === "MOMO"
                          ? { border: "1px solid #f5222d" }
                          : {}
                      }
                      bordered={true}
                    >
                      <img src={momo} alt="momo" />
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col xs={{ span: 20, offset: 2 }}>
                    {this.state.check_payment_method ? (
                      <div className="register-payment-method-error">
                        Phương thức thanh toán không được để trống
                      </div>
                    ) : null}
                  </Col>
                </Row>
                {/* -- end Payment --*/}
                <Row
                  style={{
                    marginTop: "90px",
                    textAlign: "center",
                  }}
                >
                  <Button
                    htmlType="submit"
                    loading={registerCourses.loadingButton}
                    className="btn-create-new"
                    style={{ marginRight: "10px" }}
                    size="large"
                  >
                    Đăng ký
                  </Button>
                  <Button
                    onClick={this.onClose}
                    size="large"
                    className="btn-close"
                  >
                    Hoàn tác
                  </Button>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    registerCourses: state.registerCourses,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetDataClassById: (id_class, email, discount_code, loading) => {
      dispatch(
        actRequestGetDataClassById(id_class, email, discount_code, loading)
      );
    },
    onCreateStudent: (body, history) => {
      dispatch(actRequestCreateStudent(body, history));
    },

    onResetStateRegister: () => {
      dispatch(ResetStateRegister());
    },

    // thanh toán paypal
    onCreateStudentAndPaymentPaypal: (body, history) => {
      dispatch(actRequestCreateStudentAndPaymentPaypal(body, history));
    },

    // thanh toán VN_PAY
    onCreateStudentAndPaymentVnpay: (body) => {
      dispatch(actRequestCreateStudentAndPaymentVnpay(body));
    },

    // thanh toán Momo
    onCreateStudentAndPaymentMomo: (body) => {
      dispatch(actRequestCreateStudentAndPaymentMomo(body));
    },
  };
};

const Rigister_CoursesForm = Form.create({})(withRouter(RigisterCoursesForm));
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rigister_CoursesForm);
