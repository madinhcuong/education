import React from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Icon, Input, Button, Select, InputNumber } from "antd";
import Loading from "../../pages/loading/loading";
import { Array_ItemEditRole } from "../../helpers/validate";
import { actRequestListTraiNingByTeacher } from "../../actions/training.action";
import { actRequestCreateCourses } from "../../actions/courses.action";
const { Option } = Select;
const { TextArea } = Input;

class AddCourses extends React.Component {
  state = {
    depict: "",
    status: "OPEN",
  };

  componentDidMount() {
    this.props.onListTrainingByTeacher();
  }

  handleChange_Status = (value) => {
    this.setState({ status: value.key });
  };

  onChange_depict = ({ target: { value } }) => {
    this.setState({ depict: value });
  };

  _Create_Courses_handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, body) => {
      if (!err) {
        let data = {
          id_training: body.training,
          name: body.name,
          time: body.time,
          tuition_Fees: body.tuition_Fees,
          location: body.location,
          depict: this.state.depict,
          status: this.state.status,
        };

        this.props.onCreateCourses(data, this.props.history);
      }
    });
  };

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let { training, inforAdmin } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

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
    return (
      <div>
        {training.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("CREATE_COURSES") ? null : (
              <div>
                <Row className="main-content">
                  <Form
                    onSubmit={this._Create_Courses_handleSubmit}
                    className=""
                  >
                    <Row>
                      <Col span={10}>
                        <h4 className="teacher-title-addT">Hệ đào tạo:</h4>
                        <Form.Item>
                          {getFieldDecorator(
                            "training",
                            Array_ItemEditRole("Hệ đào tạo không được để trống")
                          )(
                            <Select>
                              {!list_training ? null : list_training}
                            </Select>
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={10} offset={2}>
                        <h4 className="teacher-title-addT">
                          Tên thông tin khóa học:
                        </h4>
                        <Form.Item>
                          {getFieldDecorator(
                            "name",
                            Array_ItemEditRole("Tên không được để trống")
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
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <h4 className="teacher-title-addT">Địa điểm học:</h4>
                        <Form.Item>
                          {getFieldDecorator(
                            "location",
                            Array_ItemEditRole(
                              "Địa điểm học không được để trống"
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
                              placeholder="Nhập thời gian ..."
                            />
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={10} offset={2}>
                        <h4 className="teacher-title-addT">Học phí:</h4>
                        <Form.Item>
                          {getFieldDecorator(
                            "tuition_Fees",
                            Array_ItemEditRole("Học phí không được để trống")
                          )(
                            <InputNumber
                              formatter={(value) =>
                                `$ ${value}`.replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ","
                                )
                              }
                              parser={(value) =>
                                value.replace(/\$\s?|(,*)/g, "")
                              }
                              style={{ width: "100%" }}
                            />
                            // <Input
                            //   style={{ width: "100%" }}
                            //   prefix={
                            //     <Icon
                            //       type="container"
                            //       style={{ color: "rgba(0,0,0,.25)" }}
                            //     />
                            //   }
                            //   placeholder="Nhập học phí ..."
                            // />
                          )}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <h4 className="teacher-title-addT">Mô tả:</h4>
                        <Form.Item>
                          <TextArea
                            value={this.state.depict}
                            onChange={this.onChange_depict}
                            placeholder="Nhập mô tả ..."
                            autoSize={{ minRows: 2, maxRows: 6 }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={10} offset={2}>
                        <h4 className="teacher-title-addT">Trạng thái:</h4>
                        <Select
                          labelInValue
                          defaultValue={{ key: this.state.status }}
                          onChange={this.handleChange_Status}
                        >
                          <Option value="OPEN">Mở</Option>
                          <Option value="CLOSE">Đóng</Option>
                        </Select>
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
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListTrainingByTeacher: () => {
      dispatch(actRequestListTraiNingByTeacher());
    },
    onCreateCourses: (body, history) => {
      dispatch(actRequestCreateCourses(body, history));
    },
  };
};

const Add_Courses = Form.create({ name: "normal_login" })(AddCourses);
export default connect(mapStateToProps, mapDispatchToProps)(Add_Courses);
