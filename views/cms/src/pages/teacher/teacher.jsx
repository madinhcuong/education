import React from "react";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../loading/loading";
import { actRequestListTeacher } from "../../actions/teacher.action";

import SeachTeacher from "../../components/teachers/seachTeacher.component";
import ListTeacher from "../../components/teachers/listTeacher.component";

class Staff extends React.Component {
  componentDidMount() {
    this.props.onSeachTeacher("", "", "");
  }

  render() {
    let { inforAdmin, teacher } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";
    return (
      <div>
        {teacher.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_TEACHER") ? null : (
              <div>
                <Row>
                  <Row>
                    <Col span={24} className="seach-main-content">
                      <SeachTeacher />
                    </Col>
                  </Row>
                </Row>
                <Row className="staff-table main-content">
                  <Row className="title-main-content">
                    <Col span={12}>
                      <h2>Danh sách giáo viên</h2>
                    </Col>
                    <Col span={12} className="staff-addStaff">
                      {!permissions.includes("CREATE_TEACHER") ? null : (
                        <Link to="/admin/them-giao-vien">
                          <Button className="btn-add-new">Tạo mới</Button>
                        </Link>
                      )}
                    </Col>
                  </Row>
                  <ListTeacher onListTeacher={teacher.list_Teacher} />
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
    teacher: state.teacher,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSeachTeacher: (seach_name, seach_email, seach_status) => {
      dispatch(
        actRequestListTeacher(seach_name, seach_email, seach_status, true)
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Staff);
