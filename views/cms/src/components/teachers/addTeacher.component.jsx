import React from "react";
import { Row, Col, Form, Icon, Input, Button, DatePicker, Select } from "antd";
import {
  vali_date,
  vali_name,
  vali_phone,
  vali_address,
  vali_sex,
  vali_email,
  vali_training,
  vali_role,
} from "../../helpers/validate";
import { connect } from "react-redux";
import Loading from "../../pages/loading/loading";
import { Array_ItemEditRole } from "../../helpers/validate";
import Upload_Image from "../../utils/upload_Image";
import { actRequestListTraiNingByTeacher } from "../../actions/training.action";
import { actRequestListRoleByTeacher_Staff } from "../../actions/role.action";
import { actRequestCreateTeacher } from "../../actions/teacher.action";
const { Option } = Select;
const { TextArea } = Input;

class AddTeacher extends React.Component {
  state = {
    date: "",
    sex: "",
    depict: "",
    file: "",
    fileList: [],
  };
  componentDidMount() {
    this.props.onListTrainingByTeacher();
    this.props.onListTeacher_Staff();
  }

  _Create_Teacher_handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, body) => {
      if (!err) {
        let data = {
          //    file: this.state.image,
          avatar: this.state.image,
          fullName: body.name,
          date: this.state.date,
          phone: body.phone,
          sex: body.sex,
          address: body.address,
          email: body.email,
          permissionGroup: body.role,
          specialize: body.training,
          depict: this.state.depict,
        };

        this.props.onCreateTeacher(data, this.props.history);
      }
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

  onChange = (date, dateString) => {
    this.setState({
      date: dateString,
    });
  };

  onChange_Sex = (data) => {
    this.setState({
      sex: data.key,
    });
  };

  onChange_Depict = ({ target: { value } }) => {
    this.setState({ depict: value });
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    this.setState({
      fileList: e.fileList,
    });
    return e && e.fileList;
  };

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    const { training, role, inforAdmin } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";
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
        {role.success && training.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("CREATE_TEACHER") ? null : (
              <div>
                <Row className="main-content">
                  <Form
                    onSubmit={this._Create_Teacher_handleSubmit}
                    className=""
                  >
                    <Row>
                      <Col span={10}>
                        <h4 className="teacher-title-addT">Họ và tên:</h4>
                        <Form.Item>
                          {getFieldDecorator(
                            "name",
                            vali_name
                          )(
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
                          {getFieldDecorator(
                            "phone",
                            vali_phone
                          )(<Input style={{ width: "100%" }} type="number" />)}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <h4 className="teacher-title-addT">Địa chỉ:</h4>
                        <Form.Item>
                          {getFieldDecorator(
                            "address",
                            vali_address
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
                      </Col>
                      <Col span={10} offset={2}>
                        <Row>
                          <Col span={11}>
                            <h4 className="teacher-title-addT">Ngày sinh:</h4>
                            <Form.Item className="teacher-add-datepicker">
                              {getFieldDecorator(
                                "date",
                                vali_date
                              )(
                                <DatePicker
                                  format={dateFormatList}
                                  onChange={this.onChange}
                                />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={11} offset={2}>
                            <h4 className="teacher-title-addT">Giới tính:</h4>
                            <Form.Item className="teacher-list-role">
                              {getFieldDecorator(
                                "sex",
                                vali_sex
                              )(
                                <Select>
                                  <Option value="MALE">Nam</Option>
                                  <Option value="FEMALE">Nữ</Option>
                                </Select>
                              )}
                            </Form.Item>
                            {/* <Select
                      labelInValue
                      defaultValue={{ key: "MALE" }}
                      onChange={this.onChange_Sex}
                      name="sex"
                    >
                      <Option value="MALE">Nam</Option>
                      <Option value="FEMALE">Nữ</Option>
                    </Select>  */}
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={10}>
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
                      </Col>
                      <Col span={10} offset={2}>
                        <h4 className="teacher-title-addT">Chuyên nghành:</h4>
                        <Form.Item>
                          {getFieldDecorator(
                            "training",
                            vali_training
                          )(
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
                        <TextArea
                          placeholder="Nhập mô tả ..."
                          autoSize={{ minRows: 2, maxRows: 6 }}
                          onChange={this.onChange_Depict}
                        />
                      </Col>
                      <Col span={10} offset={2}>
                        <h4 className="teacher-title-addT">Quyền:</h4>
                        <Form.Item className="teacher-list-role">
                          {getFieldDecorator("role", {
                            initialValue: this.state.role,
                            rules: vali_role.rules,
                          })(<Select>{list_Role}</Select>)}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}></Col>
                      <Col span={10} offset={2}>
                        <Form.Item>
                          {getFieldDecorator(
                            "image",
                            Array_ItemEditRole("Ảnh không được để trống")
                          )(
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
    inforAdmin: state.inforAdmin,
    training: state.training,
    role: state.role,
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
    onCreateTeacher: (data, history) => {
      dispatch(actRequestCreateTeacher(data, history));
    },
  };
};

const Add_Teacher = Form.create({ name: "" })(AddTeacher);
export default connect(mapStateToProps, mapDispatchToProps)(Add_Teacher);
