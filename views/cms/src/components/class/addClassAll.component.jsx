import React from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Icon, Input, Button, Select, DatePicker } from "antd";
import moment from "moment";
import { uuid } from "uuidv4";
import Loading from "../../pages/loading/loading";

import { Array_ItemEditRole } from "../../helpers/validate";
import { actRequestGetCoursesNoPermission } from "../../actions/courses.action";
import {
  actAddTimeDayByWeek,
  actRequestCreateClassAll,
} from "../../actions/class.action";
import DateClassAll from "./dateClassAll.component";
import ListDateByWeek from "./listDateByWeek.component";

class AddClassAll extends React.Component {
  state = {
    status: "OPEN",
    time_start: "",
    time_end: "",
    disabled_time_day: false,
  };

  UNSAFE_componentWillMount() {
    this.props.onAddTimeDayByWeek({ delete_day_week: true });
  }

  componentDidMount() {
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

  _Create_ClassAll_handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, body) => {
      if (this.props._class.date_time_by_week.length <= 0)
        return this.setState({ disabled_time_day: true });
      if (this.props._class.date_time_by_week.length > 0) {
        this.setState({ disabled_time_day: false });
      }

      if (!err && this.props._class.date_time_by_week.length > 0) {
        this.setState({ disabled_time_day: false });

        let data = {
          id_Courses: body.courses,
          name: body.name,
          time_day: this.props._class.date_time_by_week,
          time_start: this.state.time_start,
          time_end: this.state.time_end,
          // status: this.state.status
        };

        this.props.onCreateClassAll(data, this.props.history);
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
    let { courses, inforAdmin } = this.props;
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
        {courses.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("CREATE_CLASSALL") ? null : (
              <div>
                <Row className="main-content">
                  <Form
                    onSubmit={this._Create_ClassAll_handleSubmit}
                    className=""
                  >
                    <Row>
                      <Col span={10}>
                        <h4 className="teacher-title-addT">Khóa học:</h4>
                        <Form.Item>
                          {getFieldDecorator(
                            "courses",
                            Array_ItemEditRole("Khóa học không được để trống")
                          )(
                            <Select>
                              {!list_courses ? null : list_courses}
                            </Select>
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={10} offset={2}>
                        <h4 className="teacher-title-addT">Tên lớp học:</h4>
                        <Form.Item>
                          {getFieldDecorator(
                            "name",
                            Array_ItemEditRole("Tên lớp học")
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
                        <h4 className="teacher-title-addT">Thời lượng:</h4>
                        <Form.Item>
                          {getFieldDecorator(
                            "date",
                            Array_ItemEditRole("Ngày không được để trống")
                          )(
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
                          <Select
                            labelInValue
                            defaultValue={{ key: this.state.status }}
                            onChange={this.handleChange_Status}
                          >
                            <Option value="OPEN">Mở</Option>
                            <Option value="STUDYING">Đang học</Option>
                            <Option value="CLOSE">Kết thúc</Option>
                          </Select>
                        </Form.Item> */}
                      </Col>
                    </Row>
                    <Row>
                      <DateClassAll Add_new_time_day={this.Add_new_time_day} />
                      <Col span={24}>
                        <ListDateByWeek time_day={this.state.time_day} />
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
    onListCoursesNoPremission: () => {
      dispatch(actRequestGetCoursesNoPermission());
    },
    onAddTimeDayByWeek: (body) => {
      dispatch(actAddTimeDayByWeek(body));
    },
    onCreateClassAll: (body, history) => {
      dispatch(actRequestCreateClassAll(body, history));
    },
  };
};

const Add_Class_All = Form.create({ name: "normal_login" })(AddClassAll);
export default connect(mapStateToProps, mapDispatchToProps)(Add_Class_All);
