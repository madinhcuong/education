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
                    <h2>????ng k?? h???c vi??n</h2>
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
                            Ch??a h???c t???i trung t??m
                          </Radio>
                          <Radio value="ACCOUNT">???? h???c t???i trung t??m</Radio>
                        </Radio.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <h4 className="teacher-title-addT">L???p h???c:</h4>
                        <Form.Item>
                          {getFieldDecorator(
                            "id_Class",
                            Array_ItemEditRole("L???p h???c kh??ng ???????c ????? tr???ng")
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
                            <h4 className="teacher-title-addT">M?? gi???m gi??:</h4>
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
                                  placeholder="M?? gi???m gi?? ..."
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
                                Ki???m tra
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <h4 className="teacher-title-addT">
                              T??n h???c vi??n:
                            </h4>
                            <Form.Item>
                              {getFieldDecorator(
                                "name",
                                Array_ItemEditRole(
                                  "T??n h???c vi??n kh??ng ???????c ????? tr???ng"
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
                                  placeholder="Nh???p t??n ..."
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
                            <h4 className="teacher-title-addT">Ng??y sinh:</h4>
                            <Form.Item className="teacher-add-datepicker">
                              {getFieldDecorator(
                                "date",
                                Array_ItemEditRole(
                                  "Ng??y sinh kh??ng ???????c ????? tr???ng"
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
                              H???c ph??:{" "}
                              {studentRegister.inforTuitionIdClass.tuition_Fees
                                ? studentRegister.inforTuitionIdClass
                                    .tuition_Fees
                                : 0}{" "}
                              vn??
                            </div>
                            <div>
                              Gi???m gi??:{" "}
                              {studentRegister.inforTuitionIdClass.sale
                                ? studentRegister.inforTuitionIdClass.sale
                                : 0}{" "}
                              %
                            </div>
                            <div>
                              H???c ph?? th???c ????ng:{" "}
                              {studentRegister.inforTuitionIdClass
                                .tuition_Fees_discount
                                ? studentRegister.inforTuitionIdClass
                                    .tuition_Fees_discount
                                : 0}{" "}
                              vn??
                            </div>
                          </div>
                        ) : (
                          <div>
                            <h4 className="teacher-title-addT">Gi???i t??nh:</h4>
                            <Form.Item className="teacher-list-role">
                              {getFieldDecorator(
                                "sex",
                                Array_ItemEditRole(
                                  "Gi???i t??nh kh??ng ???????c ????? tr???ng"
                                )
                              )(
                                <Select>
                                  <Option value="MALE">Nam</Option>
                                  <Option value="FEMALE">N???</Option>
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
                            message="L???p h???c v?? Email kh??ng ???????c ????? tr???ng"
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
                              S??? ??i???n tho???i:
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
                            <h4 className="teacher-title-addT">?????a ch???:</h4>
                            <Form.Item>
                              {getFieldDecorator(
                                "address",
                                Array_ItemEditRole(
                                  "?????a ch??? kh??ng ???????c ????? tr???ng"
                                )
                              )(
                                <Input
                                  prefix={
                                    <Icon
                                      type="lock"
                                      style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                  }
                                  placeholder="Nh???p ?????a ch??? ..."
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
                              Ng?????i gi???i thi???u:
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
                                  placeholder="Nh???p m?? ng?????i gi???i thi???u ..."
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
                              H???c ph??:{" "}
                              {studentRegister.inforTuitionIdClass.tuition_Fees
                                ? studentRegister.inforTuitionIdClass
                                    .tuition_Fees
                                : 0}{" "}
                              vn??
                            </div>
                            <div>
                              Gi???m gi??:{" "}
                              {studentRegister.inforTuitionIdClass.sale
                                ? studentRegister.inforTuitionIdClass.sale
                                : 0}{" "}
                              %
                            </div>
                            <div>
                              H???c ph?? th???c ????ng:{" "}
                              {studentRegister.inforTuitionIdClass
                                .tuition_Fees_discount
                                ? studentRegister.inforTuitionIdClass
                                    .tuition_Fees_discount
                                : 0}{" "}
                              vn??
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
                                Array_ItemEditRole("???nh kh??ng ???????c ????? tr???ng")
                              )(
                                <label className="staff-custom-file-upload">
                                  <input
                                    type="file"
                                    onChange={this._onChange_image}
                                  />
                                  Ch???n ???nh ?????i di???n
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
                        Th??m m???i
                      </Button>
                      <Button
                        onClick={this.onClose}
                        className="btn-component-close"
                      >
                        Quay l???i
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
