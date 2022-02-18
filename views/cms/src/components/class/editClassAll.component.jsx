import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Form, Icon, Input, Button, Select, DatePicker } from "antd";
import moment from "moment";
import { uuid } from "uuidv4";
import Loading from "../../pages/loading/loading";
import { Array_ItemEditRole } from "../../helpers/validate";
import { actRequestGetCoursesNoPermission } from "../../actions/courses.action";
import {
  actRequestGetClassAllById,
  actAddTimeDayByWeek,
  actRequestUpDateClassAll,
} from "../../actions/class.action";

import DateClassAll from "./dateClassAll.component";
import ListDateByWeek from "./listDateByWeek.component";

class EditClassAll extends React.Component {
  state = {
    _id: "",
    id_Courses: "",
    name: "",
    time_day: "",
    time_month: "",
    time_start: "",
    time_end: "",
    total_lesson: "",
    status: "",
    disabled_time_day: false,
  };

  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onInforClassAll(id);
    }
    this.props.onListCoursesNoPremission();
  }

  handleChange_Status = (value) => {
    this.setState({ status: value.key });
  };

  Add_new_time_day = (data) => {
    if (data.th !== "" && data.hour_start !== "" && data.hour_end !== "") {
      let data_time = {
        _id: uuid(),
        th: data.th,
        hour_start: data.hour_start,
        hour_end: data.hour_end,
      };
      this.props.onAddTimeDayByWeek(data_time);
    }
  };

  onChange_date_Start_End = (date, dateString) => {
    this.setState({ time_start: dateString[0], time_end: dateString[1] });
  };

  _Edit_ClassAll_handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, body) => {
      if (this.props._class.date_time_by_week.length <= 0)
        return this.setState({ disabled_time_day: true });

      if (!err && this.props._class.date_time_by_week.length > 0) {
        this.setState({ disabled_time_day: false });

        let data = {
          id_Courses: body.courses,
          name: body.name,
          time_day: this.props._class.date_time_by_week,
          time_start: this.state.time_start
            ? this.state.time_start
            : body.date[0]._i,
          time_end: this.state.time_end ? this.state.time_end : body.date[1]._i,
          //  status: this.state.status ? this.state.status : body.status
        };

        let { match } = this.props;
        if (match) {
          let id = match.params.id;
          this.props.onUpdateClassAll(id, data, this.props.history);
        }
      }
    });
  };

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    const { Option } = Select;
    const { RangePicker } = DatePicker;
    const { getFieldDecorator } = this.props.form;
    let { courses, inforAdmin, _class } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    // DatePicker
    function disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().endOf("day");
    }
    // end-DatePicker

    let list_courses = null;
    if (courses.data_no_premission.length > 0) {
      list_courses = courses.data_no_premission.map((item, key) => {
        return (
          <Option value={`${item._id}`} key={key}>
            {item.name}
          </Option>
        );
      });
    }

    return (
      <div>
        {_class.success && courses.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("UPDATE_CLASSALL") ? null : (
              <div>
                <Row className="main-content">
                  <Form
                    onSubmit={this._Edit_ClassAll_handleSubmit}
                    className=""
                  >
                    <Row>
                      <Col span={10}>
                        <h4 className="teacher-title-addT">Khóa học:</h4>
                        <Form.Item>
                          {getFieldDecorator("courses", {
                            initialValue:
                              _class.classAll_ByID.id_Courses &&
                              _class.classAll_ByID.id_Courses._id,
                            rules: Array_ItemEditRole(
                              "Khóa học không được để trống"
                            ).rules,
                          })(
                            <Select>
                              {!list_courses ? null : list_courses}
                            </Select>
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={10} offset={2}>
                        <h4 className="teacher-title-addT">Tên lớp học:</h4>
                        <Form.Item>
                          {getFieldDecorator("name", {
                            initialValue:
                              _class.classAll_ByID && _class.classAll_ByID.name,
                            rules: Array_ItemEditRole("Tên lớp học").rules,
                          })(
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
                        <h4 className="teacher-title-addT">Thời lượng:</h4>
                        <Form.Item>
                          {getFieldDecorator("date", {
                            initialValue: _class.classAll_ByID.time_start &&
                              _class.classAll_ByID.time_end && [
                                moment(
                                  _class.classAll_ByID.time_start,
                                  "DD/MM/YYYY"
                                ),
                                moment(
                                  _class.classAll_ByID.time_end,
                                  "DD/MM/YYYY"
                                ),
                              ],
                            rules: Array_ItemEditRole(
                              "Thời gian không được để trống"
                            ).rules,
                          })(
                            <RangePicker
                              disabledDate={disabledDate}
                              onChange={this.onChange_date_Start_End}
                              format="DD/MM/YYYY"
                              className="date_Start_End_classAll"
                            />
                          )}
                        </Form.Item>
                        {/* <h4 className="teacher-title-addT">Trạng thái:</h4>
                        <Form.Item>
                          {getFieldDecorator("status", {
                            initialValue:
                              _class.classAll_ByID &&
                              _class.classAll_ByID.status
                          })(
                            <Select onChange={this.handleChange_Status}>
                              <Option value="OPEN">Mở</Option>
                              <Option value="STUDYING">Đang học</Option>
                              <Option value="CLOSE">Kết thúc</Option>
                            </Select>
                          )}
                        </Form.Item> */}
                      </Col>
                      <Col span={10} offset={2}></Col>
                    </Row>
                    <Row>
                      <DateClassAll
                        Add_new_time_day_form_edit={this.Add_new_time_day}
                      />
                      <Col span={24}>
                        <ListDateByWeek
                          data_time_day={
                            _class.classAll_ByID.time_day &&
                            _class.classAll_ByID.time_day
                          }
                        />
                        {this.state.disabled_time_day ? (
                          <div className="ant-form-explain-class-all-error">
                            Thời gian không được để trống
                          </div>
                        ) : null}
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
    courses: state.courses,
    _class: state._class,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onInforClassAll: (id) => {
      dispatch(actRequestGetClassAllById(id));
    },
    onListCoursesNoPremission: () => {
      dispatch(actRequestGetCoursesNoPermission());
    },
    onAddTimeDayByWeek: (body) => {
      dispatch(actAddTimeDayByWeek(body));
    },
    onUpdateClassAll: (id, body, history) => {
      dispatch(actRequestUpDateClassAll(id, body, history));
    },
  };
};

const Edit_Class_All = Form.create({ name: "normal_login" })(
  withRouter(EditClassAll)
);
export default connect(mapStateToProps, mapDispatchToProps)(Edit_Class_All);
