import React from "react";
import { withRouter } from "react-router-dom";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import { actRequestListStudent } from "../../actions/student.action";

import Loading from "../loading/loading";
import SeachStudent from "../../components/student/seachStudent.component";
import ListStudent from "../../components/student/listStudent.component";

class Student extends React.Component {
  componentDidMount() {
    this.props.onListStudent("", "");
  }

  render() {
    let { inforAdmin, student } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    let listStudent = [];
    if (student.list_student.length > 0) listStudent = student.list_student;

    return (
      <div>
        {student.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_STUDENT") ? null : (
              <div>
                <Row>
                  <Col span={24} className="seach-main-content">
                    <SeachStudent />
                  </Col>
                </Row>
                <Row className="staff-table main-content">
                  <Row className="title-main-content">
                    <Col span={12}>
                      <h2>Danh sách học viên</h2>
                    </Col>
                  </Row>
                  <ListStudent listStudent={listStudent} />
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
    student: state.student,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListStudent: (seach_name, seach_email) => {
      dispatch(actRequestListStudent(seach_name, seach_email, false));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Student));
