import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Form, Icon, Input, Button, Select, DatePicker } from "antd";
import * as url from "../../utils/url_api";
import Upload_Image from "../../utils/upload_Image";
import moment from "moment";
import Loading from "../../pages/loading/loading";
import { vali_phone, vali_email } from "../../helpers/validate";

import { Array_ItemEditRole } from "../../helpers/validate";
import { actRequestListClassNoPermission } from "../../actions/class.action";
import {
  actRequestGetStudentRegisterById,
  actRequestUpDateStudentRegister,
} from "../../actions/studentRegister.action";

class UpdateStudentRegister extends React.Component {
  state = {};

  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onInforStudentRegister(id, this.callback);
      this.props.onListClassNoPremission();
    }
  }

  callback = (err, result) => {};

  onChange_input = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChange_Date = (date, dateString) => {
    this.setState({
      date: dateString,
    });
  };

  onChange_Select_class = async (value, event) => {
    await this.setState({
      id_Class: value,
    });
  };

  onChange_Select_Sex = async (value, event) => {
    await this.setState({
      sex: value,
    });
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

  _Update_Student_Register_handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, body) => {
      let { match } = this.props;
      if (!err && match) {
        let id = match.params.id;

        this.props.onUpdateStudentRegister(id, this.state, this.props.history);
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
        {_class.success && studentRegister.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("UPDATE_STUDENT") ? null : (
              <div>
                <Row style={{ marginBottom: "10px" }}>
                  <Col span={24}>
                    <h2>Sửa thông tin học viên đăng ký</h2>
                  </Col>
                </Row>
                <Row className="">
                  <Form
                    onSubmit={this._Update_Student_Register_handleSubmit}
                    className=""
                  >
                    <Row>
                      <Col span={10}>
                        <h4 className="teacher-title-addT">Lớp học:</h4>
                        <Form.Item>
                          {getFieldDecorator("id_Class", {
                            initialValue:
                              studentRegister.studentRegisterById.id_Class &&
                              studentRegister.studentRegisterById.id_Class._id,
                          })(
                            <Select
                              onChange={this.onChange_Select_class}
                              name="id_Class"
                            >
                              {list_class}
                            </Select>
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={10} offset={2}>
                        <h4 className="teacher-title-addT">Tên học viên:</h4>
                        <Form.Item>
                          {getFieldDecorator("name", {
                            initialValue:
                              studentRegister.studentRegisterById.id_student &&
                              studentRegister.studentRegisterById.id_student
                                .name,
                            rules: Array_ItemEditRole(
                              "Tên học viên không được để trống"
                            ).rules,
                          })(
                            <Input
                              name="name"
                              style={{ width: "100%" }}
                              onChange={this.onChange_input}
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
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <h4 className="teacher-title-addT">Ngày sinh:</h4>
                        <Form.Item className="teacher-add-datepicker">
                          {getFieldDecorator("date", {
                            initialValue:
                              studentRegister.studentRegisterById.id_student &&
                              moment(
                                studentRegister.studentRegisterById.id_student
                                  .date,
                                "DD/MM/YYYY"
                              ),
                          })(
                            <DatePicker
                              format={"DD/MM/YYYY"}
                              onChange={this.onChange_Date}
                            />
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={10} offset={2}>
                        <h4 className="teacher-title-addT">Giới tính:</h4>
                        <Form.Item className="teacher-list-role">
                          {getFieldDecorator("sex", {
                            initialValue:
                              studentRegister.studentRegisterById.id_student &&
                              studentRegister.studentRegisterById.id_student
                                .sex,
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
                    </Row>
                    <Row>
                      <Col span={10}>
                        <h4 className="teacher-title-addT">Số điện thoại:</h4>
                        <Form.Item>
                          {getFieldDecorator("phone", {
                            initialValue:
                              studentRegister.studentRegisterById.id_student &&
                              studentRegister.studentRegisterById.id_student
                                .phone,
                            rules: vali_phone.rules,
                          })(
                            <Input
                              name="phone"
                              onChange={this.onChange_input}
                              style={{ width: "100%" }}
                              type="number"
                            />
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={10} offset={2}>
                        <h4 className="teacher-title-addT">Địa chỉ:</h4>
                        <Form.Item>
                          {getFieldDecorator("address", {
                            initialValue:
                              studentRegister.studentRegisterById.id_student &&
                              studentRegister.studentRegisterById.id_student
                                .address,
                            rules: Array_ItemEditRole(
                              "Địa chỉ không được để trống"
                            ).rules,
                          })(
                            <Input
                              name="address"
                              onChange={this.onChange_input}
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
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <h4 className="teacher-title-addT">Email:</h4>
                        <Form.Item>
                          {getFieldDecorator("email", {
                            initialValue:
                              studentRegister.studentRegisterById.id_student &&
                              studentRegister.studentRegisterById.id_student
                                .email,
                            rules: vali_email.rules,
                          })(
                            <Input
                              name="email"
                              onChange={this.onChange_input}
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
                      </Col>
                      <Col span={10} offset={2}>
                        <Form.Item>
                          <h4 className="teacher-title-addT">Ảnh:</h4>
                          {getFieldDecorator("image", {
                            initialValue:
                              studentRegister.studentRegisterById.id_student &&
                              studentRegister.studentRegisterById.id_student
                                .image,
                            rules: Array_ItemEditRole("Ảnh không được để trống")
                              .rules,
                          })(
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
                                  : `${url.api_url}/${
                                      studentRegister.studentRegisterById
                                        .id_student &&
                                      studentRegister.studentRegisterById
                                        .id_student.image
                                    }`
                              }
                              alt={`${
                                this.state.file
                                  ? this.state.file
                                  : studentRegister.studentRegisterById
                                      .id_student &&
                                    studentRegister.studentRegisterById
                                      .id_student.image
                              }`}
                              className="news-file-image"
                            />
                          </div>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item>
                      <Button
                        htmlType="submit"
                        className="btn-component-addnew"
                      >
                        Sửa đổi
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
    onInforStudentRegister: (id, callback) => {
      dispatch(actRequestGetStudentRegisterById(id, callback, true));
    },
    onUpdateStudentRegister: (id, body, history) => {
      dispatch(actRequestUpDateStudentRegister(id, body, history));
    },
  };
};

const Update_StudentRegister = Form.create()(withRouter(UpdateStudentRegister));
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Update_StudentRegister);
