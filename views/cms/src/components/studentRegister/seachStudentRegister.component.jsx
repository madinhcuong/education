import React from "react";
import { connect } from "react-redux";
import { Button, Input, Form, DatePicker, Row, Col } from "antd";
import moment from "moment";
import { actRequestListStudentRegisterLearn } from "../../actions/studentRegister.action";

class SeachStudentRegister extends React.Component {
  state = {
    name_student: "",
    email: "",
    name_class: "",
    timeStart: "",
    timeEnd: "",
  };

  onChangeSeach = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onChangeDate = (value, dateString) => {
    let timeStart = moment(dateString[0], "DD/MM/YYYY").format("YYYY-MM-DD");
    let timeEnd = moment(dateString[1], "DD/MM/YYYY").format("YYYY-MM-DD");
    this.setState({
      timeStart: timeStart,
      timeEnd: timeEnd,
    });
  };

  onSeachStudent = (e) => {
    e.preventDefault();

    this.props.onSeach_StudentRegisterLearn(
      this.state.name_student,
      this.state.email,
      this.state.name_class,
      this.state.timeStart,
      this.state.timeEnd
    );
  };

  render() {
    const { RangePicker } = DatePicker;

    // Can not select days before today and today
    function disabledDate(current) {
      return current && current >= moment().endOf("day");
    }

    return (
      <div>
        <Form
          layout="inline"
          onSubmit={this.onSeachStudent}
          className="trn-seachName"
        >
          <Row>
            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              xl={{ span: 7 }}
            >
              <Form.Item className="trn-seach">
                <Input
                  placeholder="Tên lớp học"
                  name="name_class"
                  value={this.state.name_class}
                  onChange={this.onChangeSeach}
                />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              xl={{ span: 7 }}
            >
              <Form.Item className="trn-seach">
                <Input
                  placeholder="Tên học viên"
                  name="name_student"
                  value={this.state.name_student}
                  onChange={this.onChangeSeach}
                />
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              xl={{ span: 7 }}
            >
              <Form.Item className="trn-seach">
                <Input
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChangeSeach}
                />
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              xl={{ span: 7 }}
            >
              <Form.Item className="trn-seach-rangePicker">
                <RangePicker
                  onChange={this.onChangeDate}
                  disabledDate={disabledDate}
                  format="DD/MM/YYYY"
                />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              xl={{ span: 5 }}
            >
              <Form.Item>
                <Button htmlType="submit" className="trn-bnt-seach">
                  Tìm kiếm
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSeach_StudentRegisterLearn: (
      seach_name,
      seach_email,
      seach_class,
      seach_timeStart,
      seach_timeEnd
    ) => {
      dispatch(
        actRequestListStudentRegisterLearn(
          seach_name,
          seach_email,
          seach_class,
          seach_timeStart,
          seach_timeEnd,
          false
        )
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeachStudentRegister);
