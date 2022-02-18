import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Row, Col, Button } from "antd";
import { connect } from "react-redux";
import Loading from "../loading/loading";
import { actRequestListCourses } from "../../actions/courses.action";

import SeachCourses from "../../components/courses/seachCourses.component";
import ListCourses from "../../components/courses/listCourse.component";

class Courses extends React.Component {
  componentDidMount() {
    this.props.onListCourses("", "");
  }

  render() {
    let { courses, inforAdmin } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    return (
      <div>
        {courses.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_COURSES") ? null : (
              <div>
                <Row>
                  <Col span={24} className="seach-main-content">
                    <SeachCourses />
                  </Col>
                </Row>
                <Row className="staff-table main-content">
                  <Row className="title-main-content">
                    <Col span={12}>
                      <h2>Danh sách khóa học</h2>
                    </Col>
                    <Col span={12} className="staff-addStaff">
                      {!permissions.includes("CREATE_COURSES") ? null : (
                        <Link to="/admin/them-khoa-hoc">
                          <Button className="btn-add-new">Tạo mới</Button>
                        </Link>
                      )}
                    </Col>
                  </Row>
                  <ListCourses listCourse={courses} />
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
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListCourses: (name_courses, name_training) => {
      dispatch(actRequestListCourses(name_courses, name_training, true));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Courses));
