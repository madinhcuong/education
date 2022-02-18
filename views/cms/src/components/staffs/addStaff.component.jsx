import React from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Icon, Input, Button, DatePicker, Select } from "antd";
import { actRequestListRoleByTeacher_Staff } from "../../actions/role.action";
import { actRequestCreateStaff } from "../../actions/staff.action";
import Upload_Image from "../../utils/upload_Image";
import Loading from "../../pages/loading/loading";
import {
  vali_date,
  vali_name,
  vali_phone,
  vali_address,
  vali_sex,
  vali_email,
  vali_role,
  vali_upload_Image,
} from "../../helpers/validate";
const { Option } = Select;
class AddStaff extends React.Component {
  state = {
    name: "",
    phone: "",
    address: "",
    date: "",
    sex: "",
    email: "",
    password: "",
    role: "",
    avatar: "",
    file: "",
  };

  componentDidMount() {
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
      date: dateString,
    });
  };

  _Create_Staff_handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, body) => {
      if (!err) {
        let data = {
          fullName: body.name,
          phone: body.phone,
          address: body.address,
          date: this.state.date,
          sex: body.sex,
          email: body.email,
          password: body.password,
          permissionGroup: body.role,
          avatar: this.state.image,
        };
        this.props.onCreateStaff(data, this.props.history);
      }
    });
  };

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let { role, inforAdmin } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";
    const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

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
        {role.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("CREATE_ADMIN") ? null : (
              <div>
                <Row className="main-content">
                  <Form onSubmit={this._Create_Staff_handleSubmit} className="">
                    <Row>
                      <Col span={10}>
                        <h4 className="teacher-title-addT">Họ và tên:</h4>
                        <Form.Item>
                          {getFieldDecorator("name", {
                            initialValue: this.state.name,
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
                            initialValue: this.state.phone,
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
                            initialValue: this.state.address,
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
                              {getFieldDecorator("date", {
                                rules: vali_date.rules,
                              })(
                                <DatePicker
                                  format={dateFormatList}
                                  onChange={this.onChange_Date}
                                />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={11} offset={2}>
                            <h4 className="teacher-title-addT">Giới tính:</h4>
                            <Form.Item className="teacher-list-role">
                              {getFieldDecorator("sex", {
                                initialValue: this.state.sex,
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
                            initialValue: this.state.email,
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
                            initialValue: this.state.role,
                            rules: vali_role.rules,
                          })(<Select>{list_Role ? list_Role : null}</Select>)}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}></Col>
                      <Col span={10} offset={2}>
                        <Form.Item>
                          {getFieldDecorator("image", {
                            initialValue: this.state.image,
                            rules: vali_upload_Image.rules,
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
                              src={this.state.file}
                              alt={`${this.state.file}`}
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
    role: state.role,
    inforAdmin: state.inforAdmin,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListRoleTeacher_Staff: () => {
      dispatch(actRequestListRoleByTeacher_Staff());
    },
    onCreateStaff: (body, history) => {
      dispatch(actRequestCreateStaff(body, history));
    },
  };
};

const Add_Staff = Form.create({ name: "normal_login" })(AddStaff);
export default connect(mapStateToProps, mapDispatchToProps)(Add_Staff);
