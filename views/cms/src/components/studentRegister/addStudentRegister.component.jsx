import React from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Form,
  Icon,
  Input,
  Button,
  Select,
  DatePicker,
  Radio,
  Alert,
} from "antd";
import * as url from "../../utils/url_api";
import Upload_Image from "../../utils/upload_Image";
import Loading from "../../pages/loading/loading";
import { vali_phone, vali_email } from "../../helpers/validate";

import { Array_ItemEditRole } from "../../helpers/validate";
import { actRequestListClassNoPermission } from "../../actions/class.action";
import {
  actRequestCreateStudent,
  actRequestGetInforTuitionByIdClass,
} from "../../actions/studentRegister.action";

class AddStudentRegister extends React.Component {
  state = {
    id_class: "",
    date: "",
    image: "",
    email: "",
    discount_code: "",
    check_account_val: "NOACCOUNT",
    alert_visible: false,
  };

  componentDidMount() {
    this.props.onListClassNoPremission();
  }

  onChange_input = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "email") {
      this.setState({ alert_visible: false });
    }
  };

  onChange_Date = (date, dateString) => {
    this.setState({
      date: dateString,
    });
  };

  onChange_Radio = (e) => {
    this.setState({
      check_account_val: e.target.value,
    });
  };

  onChange_Select_Class = (id) => {
    this.setState({ id_class: id });
    this.props.onGetInforTuitionByIdClass(id, "", "");
  };

  onClick_CheckDiscount = () => {
    if (!this.state.email || this.state.email === "") {
      return this.setState({ alert_visible: true });
    }
    this.props.onGetInforTuitionByIdClass(
      this.state.id_class,
      this.state.discount_code,
      this.state.email
    );
  };

  alert_handleClose = () => {
    this.setState({ alert_visible: false });
  };

  _onChange_image = (event) => {
    event.persist();

    let target = event.target.files[0];
    const formData = new FormData();
    formData.append("file", target);

    Upload_Image("cms/api/upload-image", formData).then((res) => {
      if (res.data && res.status === 200) {
        this.setState({
          file: URL.createObjectURL(target),
          image: res.data,
        });
      }
    });
  };

  _Create_Student_handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, body) => {
      if (!err) {
        let data = {
          check_account_val: this.state.check_account_val,
          agent_code: body.agent_code ? body.agent_code : "",
          id_Class: body.id_Class,
          name: body.name,
          image: this.state.image,
          date: this.state.date,
          phone: body.phone,
          sex: body.sex,
          address: body.address,
          email: body.email,
          discount_code: body.discount_code,
        };

       this.props.onCreateStudent(data, this.props.history);
      }
    });
  };

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    const { Option } = Select;
    const { getFieldDecorator } = this.props.form;
    let { inforAdmin, _class, studentRegister } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    let list_class = null;
    if (_class.dataClassNoPermission.length > 0) {
      list_class = _class.dataClassNoPermission.map((item, key) => {
        return (
          <Option value={`${item._id}`} key={key}>
            {item.name}
          </Option>
        );
      });
    }

    return (
      <div>
        {_class.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("CREATE_STUDENT") ? null : (
              <div>
                <Row style={{ marginBottom: "10px" }}>
                  <Col span={24}>
                    <h2>Đăng ký học viên</h2>
                  </Col>
                </Row>
                <Row className="">
                  <Form
                    onSubmit={this._Create_Student_handleSubmit}
                    className=""
                  >
                    <Row>
                      <Col span={24} className="studentRegister-Radio">
                        <Radio.Group
                          onChange={this.onChange_Radio}
                          value={this.state.check_account_val}
                        >
                          <Radio value="NOACCOUNT">
                            Chưa học tại trung tâm
                          </Radio>
                          <Radio value="ACCOUNT">Đã học tại trung tâm</Radio>
                        </Radio.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <h4 className="teacher-title-addT">Lớp học:</h4>
                        <Form.Item>
                          {getFieldDecorator(
                            "id_Class",
                            Array_ItemEditRole("Lớp học không được để trống")
                          )(
                            <Select onChange={this.onChange_Select_Class}>
                              {list_class}
                            </Select>
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={10} offset={2}>
                        {this.state.check_account_val === "ACCOUNT" ? (
                          <div>
                            <h4 className="teacher-title-addT">Mã giảm giá:</h4>
                            <Form.Item style={{ width: "50%", float: "left" }}>
                              {getFieldDecorator("discount_code")(
                                <Input
                                  name="discount_code"
                                  onChange={this.onChange_input}
                                  prefix={
                                    <Icon
                                      type="lock"
                                      style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                  }
                                  placeholder="Mã giảm giá ..."
                                />
                              )}
                            </Form.Item>
                            <div>
                              <Button
                                onClick={this.onClick_CheckDiscount}
                                ghost
                                type="primary"
                                style={{ margin: "3px 0px 0px 15px" }}
                              >
                                Kiểm tra
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <h4 className="teacher-title-addT">
                              Tên học viên:
                            </h4>
                            <Form.Item>
                              {getFieldDecorator(
                                "name",
                                Array_ItemEditRole(
                                  "Tên học viên không được để trống"
                                )
                              )(
                                <Input
                                  style={{ width: "100%" }}
                                  prefix={
                                    <Icon
                                      type="container"
                                      style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                  }
                                  placeholder="Nhập tên ..."
                                />
                              )}
                            </Form.Item>
                          </div>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        {this.state.check_account_val === "ACCOUNT" ? (
                          <div>
                            <h4 className="teacher-title-addT">Email:</h4>
                            <Form.Item>
                              {getFieldDecorator(
                                "email",
                                vali_email
                              )(
                                <Input
                                  onChange={this.onChange_input}
                                  name="email"
                                  prefix={
                                    <Icon
                                      type="lock"
                                      style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                  }
                                  placeholder="Email"
                                />
                              )}
                            </Form.Item>
                          </div>
                        ) : (
                          <div>
                            <h4 className="teacher-title-addT">Ngày sinh:</h4>
                            <Form.Item className="teacher-add-datepicker">
                              {getFieldDecorator(
                                "date",
                                Array_ItemEditRole(
                                  "Ngày sinh không được để trống"
                                )
                              )(
                                <DatePicker
                                  format={"DD/MM/YYYY"}
                                  onChange={this.onChange_Date}
                                />
                              )}
                            </Form.Item>
                          </div>
                        )}
                      </Col>
                      <Col span={10} offset={2}>
                        {this.state.check_account_val === "ACCOUNT" ? (
                          <div style={{ fontWeight: "600" }}>
                            <div>
                              Học phí:{" "}
                              {studentRegister.inforTuitionIdClass.tuition_Fees
                                ? studentRegister.inforTuitionIdClass
                                    .tuition_Fees
                                : 0}{" "}
                              vnđ
                            </div>
                            <div>
                              Giảm giá:{" "}
                              {studentRegister.inforTuitionIdClass.sale
                                ? studentRegister.inforTuitionIdClass.sale
                                : 0}{" "}
                              %
                            </div>
                            <div>
                              Học phí thực đóng:{" "}
                              {studentRegister.inforTuitionIdClass
                                .tuition_Fees_discount
                                ? studentRegister.inforTuitionIdClass
                                    .tuition_Fees_discount
                                : 0}{" "}
                              vnđ
                            </div>
                          </div>
                        ) : (
                          <div>
                            <h4 className="teacher-title-addT">Giới tính:</h4>
                            <Form.Item className="teacher-list-role">
                              {getFieldDecorator(
                                "sex",
                                Array_ItemEditRole(
                                  "Giới tính không được để trống"
                                )
                              )(
                                <Select>
                                  <Option value="MALE">Nam</Option>
                                  <Option value="FEMALE">Nữ</Option>
                                </Select>
                              )}
                            </Form.Item>
                          </div>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        {this.state.alert_visible ? (
                          <Alert
                            message="Lớp học và Email không được để trống"
                            type="error"
                            closable
                            showIcon
                            afterClose={this.alert_handleClose}
                          />
                        ) : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        {this.state.check_account_val === "ACCOUNT" ? null : (
                          <div>
                            <h4 className="teacher-title-addT">
                              Số điện thoại:
                            </h4>
                            <Form.Item>
                              {getFieldDecorator(
                                "phone",
                                vali_phone
                              )(
                                <Input
                                  style={{ width: "100%" }}
                                  type="number"
                                />
                              )}
                            </Form.Item>
                          </div>
                        )}
                      </Col>
                      <Col span={10} offset={2}>
                        {this.state.check_account_val === "ACCOUNT" ? null : (
                          <div>
                            <h4 className="teacher-title-addT">Địa chỉ:</h4>
                            <Form.Item>
                              {getFieldDecorator(
                                "address",
                                Array_ItemEditRole(
                                  "Địa chỉ không được để trống"
                                )
                              )(
                                <Input
                                  prefix={
                                    <Icon
                                      type="lock"
                                      style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                  }
                                  placeholder="Nhập địa chỉ ..."
                                />
                              )}
                            </Form.Item>
                          </div>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        {this.state.check_account_val === "ACCOUNT" ? null : (
                          <div>
                            <h4 className="teacher-title-addT">Email:</h4>
                            <Form.Item>
                              {getFieldDecorator(
                                "email",
                                vali_email
                              )(
                                <Input
                                  prefix={
                                    <Icon
                                      type="lock"
                                      style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                  }
                                  placeholder="Email"
                                />
                              )}
                            </Form.Item>
                          </div>
                        )}
                      </Col>
                      <Col span={10} offset={2}>
                        {this.state.check_account_val === "ACCOUNT" ? null : (
                          <div>
                            <h4 className="teacher-title-addT">
                              Người giới thiệu:
                            </h4>
                            <Form.Item>
                              {getFieldDecorator("agent_code")(
                                <Input
                                  prefix={
                                    <Icon
                                      type="lock"
                                      style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                  }
                                  placeholder="Nhập mã người giới thiệu ..."
                                />
                              )}
                            </Form.Item>
                          </div>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        {this.state.check_account_val === "ACCOUNT" ? null : (
                          <div style={{ fontWeight: "600" }}>
                            <div>
                              Học phí:{" "}
                              {studentRegister.inforTuitionIdClass.tuition_Fees
                                ? studentRegister.inforTuitionIdClass
                                    .tuition_Fees
                                : 0}{" "}
                              vnđ
                            </div>
                            <div>
                              Giảm giá:{" "}
                              {studentRegister.inforTuitionIdClass.sale
                                ? studentRegister.inforTuitionIdClass.sale
                                : 0}{" "}
                              %
                            </div>
                            <div>
                              Học phí thực đóng:{" "}
                              {studentRegister.inforTuitionIdClass
                                .tuition_Fees_discount
                                ? studentRegister.inforTuitionIdClass
                                    .tuition_Fees_discount
                                : 0}{" "}
                              vnđ
                            </div>
                          </div>
                        )}
                      </Col>
                      <Col span={10} offset={2}>
                        {this.state.check_account_val === "ACCOUNT" ? null : (
                          <div>
                            <Form.Item>
                              {getFieldDecorator(
                                "image",
                                Array_ItemEditRole("Ảnh không được để trống")
                              )(
                                <label className="staff-custom-file-upload">
                                  <input
                                    type="file"
                                    onChange={this._onChange_image}
                                  />
                                  Chọn ảnh đại diện
                                </label>
                              )}

                              <div className="img-people">
                                <img
                                  src={
                                    this.state.file
                                      ? this.state.file
                                      : `${url.api_url}/${""}`
                                  }
                                  alt={`${""}`}
                                  className="news-file-image"
                                />
                              </div>
                            </Form.Item>
                          </div>
                        )}
                      </Col>
                    </Row>
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        className="btn-component-addnew"
                      >
                        Thêm mới
                      </Button>
                      <Button
                        onClick={this.onClose}
                        className="btn-component-close"
                      >
                        Quay lại
                      </Button>
                    </Form.Item>
                  </Form>
                </Row>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inforAdmin: state.inforAdmin,
    _class: state._class,
    studentRegister: state.studentRegister,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListClassNoPremission: () => {
      dispatch(actRequestListClassNoPermission());
    },
    onCreateStudent: (body, history) => {
      dispatch(actRequestCreateStudent(body, history));
    },
    onGetInforTuitionByIdClass: (id, discount_code, email) => {
      dispatch(actRequestGetInforTuitionByIdClass(id, discount_code, email));
    },
  };
};

const Add_Student_Register = Form.create()(AddStudentRegister);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Add_Student_Register);
