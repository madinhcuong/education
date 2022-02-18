import React from "react";
import { Button, Input, Form, Row, Col } from "antd";
import { connect } from "react-redux";
import { actRequestListCourses } from "../../actions/courses.action";
class SeachCourses extends React.Component {
  state = {
    name_courses: "",
    name_training: "",
  };

  onChangeSeach = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onSeachInforTraining = (e) => {
    e.preventDefault();

    this.props.onSeach_Courses(
      this.state.name_courses,
      this.state.name_training
    );
  };

  render() {
    return (
      <div>
        <Form
          layout="inline"
          onSubmit={this.onSeachInforTraining}
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
                  placeholder="Tên đào tạo"
                  name="name_training"
                  value={this.state.name_training}
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
                  placeholder="Tên khóa học"
                  name="name_courses"
                  value={this.state.name_courses}
                  onChange={this.onChangeSeach}
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
    onSeach_Courses: (name_courses, name_training) => {
      dispatch(actRequestListCourses(name_courses, name_training, false));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeachCourses);
