import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Row, Col, Button } from "antd";
import { connect } from "react-redux";
import {
  actRequestGetStudentById,
  actRequestGetClassStudentById,
} from "../../actions/student.action";

import Loading from "../loading/loading";
import InforStudent from "../../components/student/inforStudent.component";
import ClassStudent from "../../components/student/classStudent.component";

class InforStudentPage extends React.Component {
  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onStudentById(id);
      this.props.onClassStudentById(id);
    }
  }

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    let { inforAdmin, student } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    let class_StudentById = [];
    if (student.classStudentById.length > 0)
      class_StudentById = student.classStudentById;

    let student_ById = {};
    if (student.studentById) student_ById = student.studentById;

    return (
      <div>
        {student.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_STUDENT") ? null : (
              <div className="main-content">
                <InforStudent StudentById={student_ById} />
                <Row className="inforStudent-tableClass">
                  <h3>Danh sách lớp học</h3>
                  <ClassStudent classStudentById={class_StudentById} />
                </Row>
                <Row>
                  <Col span={24} className="btn-component">
                    {!permissions.includes("UPDATE_STUDENT") ? null : (
                      <Link
                        to={
                          student_ById
                            ? `/admin/sua-thong-tin-hoc-vien/${student_ById._id}`
                            : null
                        }
                      >
                        <Button className="btn-edit">Chỉnh sửa</Button>
                      </Link>
                    )}
                    <Button onClick={this.onClose} className="btn-close">
                      Hoàn tác
                    </Button>
                  </Col>
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
    onStudentById: (id) => {
      dispatch(actRequestGetStudentById(id));
    },
    onClassStudentById: (id) => {
      dispatch(actRequestGetClassStudentById(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InforStudentPage));
