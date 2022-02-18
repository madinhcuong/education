import React from "react";
import { Row, Col, Form, Icon, Input, Button, DatePicker, Select } from "antd";
import { Array_ItemEditRole } from "../../helpers/validate";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actRequestListTraiNingByTeacher } from "../../actions/training.action";
import { actRequestListRoleByTeacher_Staff } from "../../actions/role.action";
import {
  actRequestTeacherById,
  actRequestUpDateTeacher,
} from "../../actions/teacher.action";
import Upload_Image from "../../utils/upload_Image";
import * as url from "../../utils/url_api";
import Loading from "../../pages/loading/loading";
const { Option } = Select;
const { TextArea } = Input;

class EditTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      name: "",
      phone: "",
      address: "",
      date: "",
      sex: "",
      email: "",
      role: "",
      specialize: "",
      depict: "",
      image: "",
      file: "",
    };
  }

  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onInforTeacher(id);
      this.props.onListTrainingByTeacher();
      this.props.onListTeacher_Staff();
    }
  }

  _Update_Teacher_handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, body) => {
      let { match } = this.props;
      if (!err) {
        let data = {
          avatar: this.state.image ? this.state.image : body.avatar,
          fullName: body.name,
          date: this.state.date ? this.state.date : body.date._i,
          phone: body.phone,
          sex: body.sex,
          address: body.address,
          specialize: body.specialize,
          email: body.email,
          permissionGroup: body.role,
          depict: body.depict,
        };

        let id = match.params.id;
        if (id) {
          this.props.onUpdateTeacher(id, data, this.props.history);
        }
      }
    });
  };

  onChange_Date = async (date, dateString) => {
    await this.setState({
      ...this.state,
      date: dateString,
    });
  };

  onChange_Sex = (data) => {
    this.setState({
      sex: data.key,
    });
  };

  onChange_Depict = (value) => {
    this.setState({
      [value.target.name]: value.target.value,
    });
  };

  handleCategoryChange = async (value) => {
    await this.setState({
      ...this.state,
      role: value,
    });
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
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
          ...this.state,
          file: URL.createObjectURL(target),
          image: res.data,
        });
      }
    });
  };

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    const { training, role, inforAdmin, teacher } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";
    let data_teacher = teacher.teacher_By_id ? teacher.teacher_By_id : {};
    const { getFieldDecorator } = this.props.form;
    const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

    let list_training = null;
    if (training.listTrainingByTeacher.length > 0) {
      list_training = training.listTrainingByTeacher.map((item, key) => {
        return (
          <Option value={`${item._id}`} key={key}>
            {item.name}
          </Option>
        );
      });
    }

    let list_Role = null;
    if (role.listRoleByTeacherStaff.length > 0) {
      list_Role = role.listRoleByTeacherStaff.map((item, key) => {
        return (
          <Option value={`${item._id}`} key={key}>
            {item.name}
          </Option>
        );
      });
    }

    return (
      <div>
        {role.success && training.success && teacher.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("UPDATE_TEACHER") ? null : (
              <div>
                <Row className="main-content">
                  <Form
                    onSubmit={this._Update_Teacher_handleSubmit}
                    className=""
                  >
                    <Row>
                      <Col span={10}>
                        <h4 className="teacher-title-addT">Họ và tên:</h4>
                        <Form.Item>
                          {getFieldDecorator("name", {
                            initialValue:
                              data_teacher.fullName && data_teacher.fullName,
                            rules: Array_ItemEditRole("Tên không được để trống")
                              .rules,
                          })(
                            <Input
                              prefix={
                                <Icon
                                  type="user"
                                  style={{ color: "rgba(0,0,0,.25)" }}
                                />
                              }
                              placeholder="Username"
                            />
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={10} offset={2}>
                        <h4 className="teacher-title-addT">Số điện thoại:</h4>
                        <Form.Item>
                          {getFieldDecorator("phone", {
                            initialValue:
                              data_teacher.phone && data_teacher.phone,
                            rules: Array_ItemEditRole(
                              "Số điện thoại không được để trống"
                            ).rules,
                          })(<Input style={{ width: "100%" }} type="number" />)}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <h4 className="teacher-title-addT">Địa chỉ:</h4>
                        <Form.Item>
                          {getFieldDecorator("address", {
                            initialValue:
                              teacher.teacher_By_id.address &&
                              teacher.teacher_By_id.address,
                            rules: Array_ItemEditRole(
                              "Địa chỉ không được để trống"
                            ).rules,
                          })(
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
                      </Col>
                      <Col span={10} offset={2}>
                        <Row>
                          <Col span={11}>
                            <h4 className="teacher-title-addT">Ngày sinh:</h4>
                            <Form.Item className="teacher-add-datepicker">
                              {getFieldDecorator("date", {
                                initialValue:
                                  teacher.teacher_By_id.date &&
                                  moment(
                                    teacher.teacher_By_id.date,
                                    "DD/MM/YYYY"
                                  ),
                              })(
                                <DatePicker
                                  onChange={this.onChange_Date}
                                  format={dateFormatList}
                                />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={11} offset={2}>
                            <h4 className="teacher-title-addT">Giới tính:</h4>
                            <Form.Item className="teacher-list-role">
                              {getFieldDecorator("sex", {
                                initialValue:
                                  teacher.teacher_By_id.sex &&
                                  teacher.teacher_By_id.sex,
                              })(
                                <Select>
                                  <Option value="MALE">Nam</Option>
                                  <Option value="FEMALE">Nữ</Option>
                                </Select>
                              )}
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={10}>
                        <h4 className="teacher-title-addT">Email:</h4>
                        <Form.Item>
                          {getFieldDecorator("email", {
                            initialValue:
                              teacher.teacher_By_id.email &&
                              teacher.teacher_By_id.email,
                            rules: Array_ItemEditRole(
                              "Email không được để trống"
                            ).rules,
                          })(
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
                      </Col>
                      <Col span={10} offset={2}>
                        <h4 className="teacher-title-addT">Chuyên nghành:</h4>
                        <Form.Item>
                          {getFieldDecorator("specialize", {
                            initialValue:
                              teacher.teacher_By_id.specialize &&
                              teacher.teacher_By_id.specialize._id,
                            rules: Array_ItemEditRole(
                              "Chuyên nghành không được để trống"
                            ).rules,
                          })(
                            <Select>
                              {!list_training ? null : list_training}
                            </Select>
                          )}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <h4 className="teacher-title-addT">Mô tả:</h4>
                        {getFieldDecorator("depict", {
                          initialValue:
                            teacher.teacher_By_id.depict &&
                            teacher.teacher_By_id.depict,
                        })(
                          <TextArea
                            name="depict"
                            //  onChange={this.onChange_Depict}
                            placeholder="Nhập mô tả ..."
                            autoSize={{ minRows: 2, maxRows: 6 }}
                          />
                        )}
                      </Col>
                      <Col span={10} offset={2}>
                        <h4 className="teacher-title-addT">Quyền:</h4>
                        <Form.Item className="teacher-list-role">
                          {getFieldDecorator("role", {
                            initialValue:
                              teacher.teacher_By_id.permissionGroup &&
                              teacher.teacher_By_id.permissionGroup._id,
                            rules: Array_ItemEditRole(
                              "Quyền không được để trống"
                            ).rules,
                          })(
                            <Select onChange={this.handleCategoryChange}>
                              {!list_Role ? null : list_Role}
                            </Select>
                          )}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}></Col>
                      <Col span={10} offset={2}>
                        <Form.Item>
                          <h4 className="teacher-title-addT">Ảnh:</h4>
                          {getFieldDecorator("avatar", {
                            initialValue:
                              teacher.teacher_By_id.avatar &&
                              teacher.teacher_By_id.avatar,
                          })(
                            <label className="staff-custom-file-upload">
                              <input
                                type="file"
                                accept=".png, .jpg, .jpeg"
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
                                  : `${url.api_url}/${teacher.teacher_By_id.avatar}`
                              }
                              alt={`${
                                this.state.file
                                  ? this.state.file
                                  : teacher.teacher_By_id.avatar
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
    training: state.training,
    role: state.role,
    teacher: state.teacher,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListTrainingByTeacher: () => {
      dispatch(actRequestListTraiNingByTeacher());
    },
    onListTeacher_Staff: () => {
      dispatch(actRequestListRoleByTeacher_Staff());
    },
    onInforTeacher: (id) => {
      dispatch(actRequestTeacherById(id));
    },
    onUpdateTeacher: (id, data, history) => {
      dispatch(actRequestUpDateTeacher(id, data, history));
    },
  };
};

const Edit_Teacher = Form.create()(withRouter(EditTeacher));
export default connect(mapStateToProps, mapDispatchToProps)(Edit_Teacher);
