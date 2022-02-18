import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Form, Button, Select, TimePicker } from "antd";
import moment from "moment";

class DateClassAll extends React.Component {
  state = {
    th: 1,
    hour_start: "",
    hour_end: "",
  };

  handleChange_th_by_week = (value, event) => {
    this.setState({ th: parseInt(value.key, 10) });
  };

  handleChange_Hour_start = (value, event) => {
    this.setState({ hour_start: event, hour_end: "" });
  };

  handleChange_Hour_end = (value, event) => {
    this.setState({ hour_end: event });
  };

  Add_new_time_day = () => {
    let { match } = this.props;
    if (match && match.params.id) {
      this.props.Add_new_time_day_form_edit(this.state);
    } else {
      this.props.Add_new_time_day(this.state);
    }
  };

  // disable time
  getDisabledHours = () => {
    let hh = this.state.hour_start.split(":").slice(0, 1).join(":");
    let hours = [];
    for (let i = 0; i < +hh; i++) {
      hours.push(i);
    }
    return hours;
  };

  getDisabledMinutes = (selectedHour) => {
    let hh = this.state.hour_start.split(":").slice(0, 1).join(":");
    let mm = this.state.hour_start.split(":").slice(1, 2).join(":");
    let minutes = [];
    if (+hh === selectedHour) {
      for (let i = 0; i <= +mm; i++) {
        minutes.push(i);
      }
    }
    return minutes;
  };

  render() {
    const { Option } = Select;
    const format = "HH:mm";

    return (
      <div>
        <Row>
          <Col
            md={{ span: 5 }}
            lg={{ span: 5 }}
            xl={{ span: 3 }}
          >
            <h4 className="teacher-title-add teacher-title-add-time">Thứ:</h4>
            <Select
              labelInValue
              defaultValue={{ key: "1" }}
              onChange={this.handleChange_th_by_week}
              className="class-all-day"
              name="th"
            >
              <Option value="1">Thứ 2</Option>
              <Option value="2">Thứ 3</Option>
              <Option value="3">Thứ 4</Option>
              <Option value="4">Thứ 5</Option>
              <Option value="5">Thứ 6</Option>
              <Option value="6">Thứ 7</Option>
              <Option value="0">Chủ nhật</Option>
            </Select>
          </Col>
          <Col
            md={{ span: 5 }}
            lg={{ span: 5 }}
            xl={{ span: 3 }}
            span={3}
            offset={1}
          >
            <h4 className="teacher-title-add teacher-title-add-time">Thời gian bắt đầu:</h4>
            <TimePicker
              onChange={this.handleChange_Hour_start}
              defaultValue={moment("00:00", format)}
              format={format}
              className="class-all-TimePicker"
              id="Hour_start"
            />
          </Col>
          <Col
            md={{ span: 5 }}
            lg={{ span: 5 }}
            xl={{ span: 3 }}
            span={3}
            offset={1}
          >
            <h4 className="teacher-title-add teacher-title-add-time">Thời gian kết thúc:</h4>
            <TimePicker
              onChange={this.handleChange_Hour_end}
              defaultValue={moment("00:00", format)}
              format={format}
              className="class-all-TimePicker"
              id="Hour_end"
              disabledHours={() => this.getDisabledHours()}
              disabledMinutes={(selectedHour) =>
                this.getDisabledMinutes(selectedHour)
              }
            />
          </Col>
          <Col span={3} offset={1}>
            <Form.Item>
              <Button
                onClick={this.Add_new_time_day}
                className="btn-addnew-date"
              >
                Thêm
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <div className="ant-form-explain-class-all-error">
            {/* {this.state.time_day.map((item, key) => {
                          <div>{item}</div>;
                        })} */}
          </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

const Date_Class_All = Form.create({ name: "normal_login" })(
  withRouter(DateClassAll)
);
export default connect(mapStateToProps, mapDispatchToProps)(Date_Class_All);
