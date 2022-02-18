import React from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Icon, Input, Button, DatePicker, Select } from "antd";
import { actRequestListRoleByTeacher_Staff } from "../../actions/role.action";
import {
  actRequestStaffById,
  actRequestUpDateStaff,
} from "../../actions/staff.action";
import { withRouter } from "react-router-dom";
import moment from "moment";
import Upload_Image from "../../utils/upload_Image";
import * as url from "../../utils/url_api";
import {
  vali_name,
  vali_phone,
  vali_address,
  vali_sex,
  vali_email,
  vali_role,
} from "../../helpers/validate";
import Loading from "../../pages/loading/loading";
const { Option } = Select;

class EditStaff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      address: "",
      date: "",
      sex: "",
      email: "",
      role: "",
      avatar: "",
      image: "",
      file: "",
    };
  }

  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onInforStaff(id);
    }
    this.props.onListRoleTeacher_Staff();
  }

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

  onChange_Date = (date, dateString) => {
    this.setState({
      ...this.state,
      date: dateString,
    });
  };

  _Update_Staff_handleSubmit = (e) => {
    e.preventDefault();
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.form.validateFields((err, body) => {
        if (!err) {
          let data = {
            fullName: body.name,
            phone: body.phone,
            address: body.address,
            date: this.state.date ? this.state.date : body.date._i,
            sex: body.sex,
            email: body.email,
            permissionGroup: body.role,
            avatar: this.state.image ? this.state.image : body.avatar,
          };

          this.props.onUpdateStaff(id, data, this.props.history);
        }
      });
    }
  };

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let { role, inforAdmin, staff } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";
    const dateFormatList = "DD/MM/YYYY";

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
        {staff.success && role.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("UPDATE_ADMIN") ? null : (
              <div>
                <Row className="main-content">
                  <Form onSubmit={this._Update_Staff_handleSubmit} className="">
                    <Row>
                      <Col span={10}>
                        <h4 className="teacher-title-addT">Họ và tên:</h4>
                        <Form.Item>
                          {getFieldDecorator("name", {
                            initialValue:
                              staff.staff_By_id.fullName &&
                              staff.staff_By_id.fullName,
                            rules: vali_name.rules,
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
                              staff.staff_By_id.phone &&
                              staff.staff_By_id.phone,
                            rules: vali_phone.rules,
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
                              staff.staff_By_id.address &&
                              staff.staff_By_id.address,
                            rules: vali_address.rules,
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
                              {/* {this.state.date ? (
                            <DatePicker
                              onChange={this.onChange_Date}
                              defaultValue={moment(
                                this.state.date,
                                dateFormatList
                              )}
                              format={dateFormatList}
                            />
                          ) : null} */}
                              {getFieldDecorator("date", {
                                initialValue:
                                  staff.staff_By_id.date &&
                                  moment(staff.staff_By_id.date, "DD/MM/YYYY"),
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
                                  staff.staff_By_id.sex &&
                                  staff.staff_By_id.sex,
                                rules: vali_sex.rules,
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
                              staff.staff_By_id.email &&
                              staff.staff_By_id.email,
                            rules: vali_email.rules,
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
                        <h4 className="teacher-title-addT">Quyền:</h4>
                        <Form.Item className="teacher-list-role">
                          {getFieldDecorator("role", {
                            initialValue:
                              staff.staff_By_id.permissionGroup &&
                              staff.staff_By_id.permissionGroup._id,
                            rules: vali_role.rules,
                          })(<Select>{list_Role ? list_Role : null}</Select>)}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}></Col>
                      <Col span={10} offset={2}>
                        <Form.Item>
                          {getFieldDecorator("avatar", {
                            initialValue:
                              staff.staff_By_id.avatar &&
                              staff.staff_By_id.avatar,
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
                                  : `${url.api_url}/${staff.staff_By_id.avatar}`
                              }
                              alt={`${
                                this.state.file
                                  ? this.state.file
                                  : staff.staff_By_id.avatar
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
    staff: state.staff,
    role: state.role,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onInforStaff: (id) => {
      dispatch(actRequestStaffById(id));
    },
    onListRoleTeacher_Staff: () => {
      dispatch(actRequestListRoleByTeacher_Staff());
    },
    onUpdateStaff: (id, data, history) => {
      dispatch(actRequestUpDateStaff(id, data, history));
    },
  };
};

const Edit_Staff = Form.create({ name: "normal_login" })(withRouter(EditStaff));
export default connect(mapStateToProps, mapDispatchToProps)(Edit_Staff);
