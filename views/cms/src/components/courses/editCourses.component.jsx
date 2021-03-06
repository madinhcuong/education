import React from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Icon, Input, Button, Select, InputNumber } from "antd";
import { withRouter } from "react-router-dom";
import Loading from "../../pages/loading/loading";
import { Array_ItemEditRole } from "../../helpers/validate";
import { actRequestListTraiNingByTeacher } from "../../actions/training.action";
import {
  actRequestGetCoursesById,
  actRequestUpDateCourses,
} from "../../actions/courses.action";
const { Option } = Select;
const { TextArea } = Input;

class EditCourses extends React.Component {
  state = {
    _id: "",
    training: "",
    name: "",
    time: "",
    tuition_Fees: "",
    location: "",
    depict: "",
    status: "",
  };

  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onInforCourses(id);
      this.props.onListTrainingByTeacher();
    }
  }

  handleChange_Status = (value) => {
    this.setState({ status: value.key });
  };

  onChange_depict = ({ target: { value } }) => {
    this.setState({ depict: value });
  };

  _Edit_Courses_handleSubmit = (e) => {
    e.preventDefault();
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.form.validateFields((err, body) => {
        if (!err) {
          let data = {
            id_training: body.training,
            name: body.name,
            time: body.time,
            tuition_Fees: body.tuition_Fees,
            location: body.location,
            depict: this.state.depict ? this.state.depict : body.depict,
            status: body.status,
          };

          this.props.onUpdateCourses(id, data, this.props.history);
        }
      });
    }
  };

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let { training, inforAdmin, courses } = this.props;
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
            {!permissions.includes("UPDATE_COURSES") ? null : (
              <div>
                <Row className="main-content">
                  <Form onSubmit={this._Edit_Courses_handleSubmit} className="">
                    <Row>
                      <Col span={10}>
                        <h4 className="teacher-title-addT">H??? ????o t???o:</h4>
                        <Form.Item>
                          {getFieldDecorator("training", {
                            initialValue:
                              courses.courses_ByID.id_training &&
                              courses.courses_ByID.id_training._id,
                            rules: Array_ItemEditRole(
                              "H??? ????o t???o kh??ng ???????c ????? tr???ng"
                            ).rules,
                          })(
                            <Select>
                              {!list_training ? null : list_training}
                            </Select>
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={10} offset={2}>
                        <h4 className="teacher-title-addT">
                          T??n th??ng tin kh??a h???c:
                        </h4>
                        <Form.Item>
                          {getFieldDecorator("name", {
                            initialValue:
                              courses.courses_ByID.name &&
                              courses.courses_ByID.name,
                            rules: Array_ItemEditRole("T??n kh??ng ???????c ????? tr???ng")
                              .rules,
                          })(
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
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <h4 className="teacher-title-addT">?????a ??i???m h???c:</h4>
                        <Form.Item>
                          {getFieldDecorator("location", {
                            initialValue:
                              courses.courses_ByID.location &&
                              courses.courses_ByID.location,
                            rules: Array_ItemEditRole(
                              "?????a ??i???m h???c kh??ng ???????c ????? tr???ng"
                            ).rules,
                          })(
                            <Input
                              style={{ width: "100%" }}
                              prefix={
                                <Icon
                                  type="container"
                                  style={{ color: "rgba(0,0,0,.25)" }}
                                />
                              }
                              placeholder="Nh???p th???i gian ..."
                            />
                          )}
                        </Form.Item>
                        {/* <h4 className="teacher-title-addT">Th???i gian ????o t???o:</h4>
                    <Form.Item>
                      {getFieldDecorator("time", {
                        initialValue:
                          courses.courses_ByID.time &&
                          courses.courses_ByID.time,
                        rules: Array_ItemEditRole(
                          "Th???i gian kh??ng ???????c ????? tr???ng"
                        ).rules
                      })(
                        <Input
                          style={{ width: "100%" }}
                          prefix={
                            <Icon
                              type="container"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          placeholder="Nh???p th???i gian ..."
                        />
                      )}
                    </Form.Item> */}
                      </Col>
                      <Col span={10} offset={2}>
                        <h4 className="teacher-title-addT">H???c ph??:</h4>
                        <Form.Item>
                          {getFieldDecorator("tuition_Fees", {
                            initialValue:
                              courses.courses_ByID.tuition_Fees &&
                              courses.courses_ByID.tuition_Fees,
                            rules: Array_ItemEditRole(
                              "H???c ph?? kh??ng ???????c ????? tr???ng"
                            ).rules,
                          })(
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
                            //   placeholder="Nh???p h???c ph?? ..."
                            // />
                          )}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <h4 className="teacher-title-addT">M?? t???:</h4>
                        <Form.Item>
                          {getFieldDecorator("depict", {
                            initialValue:
                              courses.courses_ByID.depict &&
                              courses.courses_ByID.depict,
                          })(
                            <TextArea
                              onChange={this.onChange_depict}
                              placeholder="Nh???p m?? t??? ..."
                              autoSize={{ minRows: 2, maxRows: 6 }}
                            />
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={10} offset={2}>
                        <h4 className="teacher-title-addT">Tr???ng th??i:</h4>
                        {getFieldDecorator("status", {
                          initialValue:
                            courses.courses_ByID.status &&
                            courses.courses_ByID.status,
                        })(
                          <Select>
                            <Option value="OPEN">M???</Option>
                            <Option value="CLOSE">????ng</Option>
                          </Select>
                        )}
                      </Col>
                    </Row>
                    <Form.Item className="btn-component">
                      <Button htmlType="submit" className="btn-create-new">
                        L??u l???i
                      </Button>
                      <Button onClick={this.onClose} className="btn-close">
                        Ho??n t??c
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
    courses: state.courses,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListTrainingByTeacher: () => {
      dispatch(actRequestListTraiNingByTeacher());
    },
    onInforCourses: (id) => {
      dispatch(actRequestGetCoursesById(id));
    },
    onUpdateCourses: (id, body, history) => {
      dispatch(actRequestUpDateCourses(id, body, history));
    },
  };
};

const Edit_Courses = Form.create({ name: "normal_login" })(
  withRouter(EditCourses)
);
export default connect(mapStateToProps, mapDispatchToProps)(Edit_Courses);
