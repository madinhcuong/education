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
import {
  actRequestGetStudentById,
  actRequestUpDateStudent,
} from "../../actions/student.action";

class UpdateStudent extends React.Component {
  state = {};

  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onStudentById(id);
    }
  }

  onChange_input = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChange_Date = (date, dateString) => {
    this.setState({
      date: dateString,
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

    //-- resize image main news
    formData.append("width", 354);
    formData.append("height", 472);

    Upload_Image("cms/api/upload-image", formData).then((res) => {
      if (res.data && res.status === 200) {
        this.setState({
          file: URL.createObjectURL(target),
          image: res.data,
        });
      }
    });
  };

  _Update_Student_handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, body) => {
      let { match } = this.props;
      if (!err && match) {
        let id = match.params.id;
        this.props.onUpdateStudent(id, this.state, this.props.history);
      }
    });
  };

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    const { Option } = Select;
    const { getFieldDecorator } = this.props.form;
    let { inforAdmin, student } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    return (
      <div>
        {student.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("UPDATE_STUDENT") ? null : (
              <div>
                <Row className="main-content">
                  <Form onSubmit={this._Update_Student_handleSubmit}>
                    <Row>
                      <Col span={10}>
                        <h4 className="teacher-title-addT">Tên học viên:</h4>
                        <Form.Item>
                          {getFieldDecorator("name", {
                            initialValue:
                              student.studentById && student.studentById.name,
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
                      <Col span={10} offset={2}>
                        <h4 className="teacher-title-addT">Ngày sinh:</h4>
                        <Form.Item className="teacher-add-datepicker">
                          {getFieldDecorator("date", {
                            initialValue:
                              student.studentById.date &&
                              moment(student.studentById.date, "DD/MM/YYYY"),
                          })(
                            <DatePicker
                              format={"DD/MM/YYYY"}
                              onChange={this.onChange_Date}
                            />
                          )}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <h4 className="teacher-title-addT">Giới tính:</h4>
                        <Form.Item className="teacher-list-role">
                          {getFieldDecorator("sex", {
                            initialValue:
                              student.studentById && student.studentById.sex,
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
                      <Col span={10} offset={2}>
                        <h4 className="teacher-title-addT">Số điện thoại:</h4>
                        <Form.Item>
                          {getFieldDecorator("phone", {
                            initialValue:
                              student.studentById && student.studentById.phone,
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
                    </Row>
                    <Row>
                      <Col span={10}>
                        {" "}
                        <h4 className="teacher-title-addT">Địa chỉ:</h4>
                        <Form.Item>
                          {getFieldDecorator("address", {
                            initialValue:
                              student.studentById &&
                              student.studentById.address,
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
                      <Col span={10} offset={2}>
                        {" "}
                        <h4 className="teacher-title-addT">Email:</h4>
                        <Form.Item>
                          {getFieldDecorator("email", {
                            initialValue:
                              student.studentById && student.studentById.email,
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
                    </Row>
                    <Row>
                      <Col span={10}></Col>
                      <Col span={10} offset={2}>
                        <Form.Item>
                          <h4 className="teacher-title-addT">Ảnh:</h4>
                          {getFieldDecorator("image", {
                            initialValue:
                              student.studentById && student.studentById.image,
                            rules: Array_ItemEditRole("Ảnh không được để trống")
                              .rules,
                          })(
                            <label className="staff-custom-file-upload">
                              <input
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                onChange={this._onChange_image}
                              />
                              Chọn ảnh
                            </label>
                          )}
                          <div className="img-people">
                            <img
                              src={
                                this.state.file
                                  ? this.state.file
                                  : `${url.api_url}/${
                                      student.studentById &&
                                      student.studentById.image
                                    }`
                              }
                              alt={`${
                                this.state.file
                                  ? this.state.file
                                  : student.studentById &&
                                    student.studentById.image
                              }`}
                            />
                          </div>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item className="btn-component">
                      <Button htmlType="submit" className="btn-create-new">
                        Lưu lại
                      </Button>
                      <Button onClick={this.onClose} className="btn-close">
                        Hoàn tác
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
    student: state.student,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onStudentById: (id) => {
      dispatch(actRequestGetStudentById(id));
    },
    onUpdateStudent: (id, data, history) => {
      dispatch(actRequestUpDateStudent(id, data, history));
    },
  };
};

const Update_Student = Form.create()(withRouter(UpdateStudent));
export default connect(mapStateToProps, mapDispatchToProps)(Update_Student);
