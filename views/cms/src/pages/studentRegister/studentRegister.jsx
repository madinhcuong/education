import React from "react";
import { withRouter } from "react-router-dom";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import * as socket from "../../utils/socket_Client";
import moment from "moment";

import {
  actRequestListStudentRegisterLearn,
  actRequestStatisticRegis,
  actRequestStatisticRegisPayment,
} from "../../actions/studentRegister.action";

import Loading from "../loading/loading";
import SeachStudentRegister from "../../components/studentRegister/seachStudentRegister.component";
import ListStudentRegister from "../../components/studentRegister/listStudentRegister.component";
import StatisticRegis from "../../components/studentRegister/statisticRegis.component";

class StudentRegister extends React.Component {
  componentDidMount() {
    let time = moment(new Date()).format("MM/YYYY");
    this.props.onStatisticRegis(time, true);
    this.props.onListStudentRegisterLearn("", "", "", "", "", true);
    this.props.onStatisticRegisPayment(time, true);

    // Khi co người đăng ký mới get lại list
    socket.url_socket.on("GET_LIST_STUDENT_REGISTER", (message) => {
      this.props.onListStudentRegisterLearn("", "", "", "", "", false);
      this.props.onStatisticRegis(time, false);
      this.props.onStatisticRegisPayment(time, true);
    });
  }

  render() {
    let { inforAdmin, studentRegister } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    let listStudent = [];
    if (studentRegister.list_student_register.length > 0)
      listStudent = studentRegister.list_student_register;

    return (
      <div>
        {studentRegister.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_STUDENT") ? null : (
              <div>
                <Row>
                  <Col span={24} className="seach-main-content">
                    <SeachStudentRegister />
                  </Col>
                </Row>
                <Row className="main-content">
                  <Col span={24}>
                    <StatisticRegis
                      statisticRegis={
                        studentRegister.statisticRegis.length > 0
                          ? studentRegister.statisticRegis
                          : []
                      }
                      statisticRegisPayment={
                        studentRegister.statisticRegisPayment.length > 0
                          ? studentRegister.statisticRegisPayment
                          : []
                      }
                    />
                  </Col>
                </Row>
                <Row className="staff-table main-content">
                  <Row className="title-main-content">
                    <Col span={12}>
                      <h2>Danh sách học viên đăng ký học</h2>
                    </Col>
                    <Col span={12} className="staff-addStaff">
                      {/* <Col span={24} className="staff-addStaff">
                    {!permissions.includes("CREATE_STUDENT") ? null : (
                      <Link to="/admin/them-hoc-vien">
                        <Button className="btn-add-new">Thêm học viên</Button>
                      </Link>
                    )}
                  </Col> */}
                    </Col>
                  </Row>
                  <ListStudentRegister listStudent={listStudent} />
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
    studentRegister: state.studentRegister,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListStudentRegisterLearn: (
      seach_name,
      seach_email,
      seach_class,
      loading
    ) => {
      dispatch(
        actRequestListStudentRegisterLearn(
          seach_name,
          seach_email,
          seach_class,
          loading
        )
      );
    },

    onStatisticRegis: (time, loading) => {
      dispatch(actRequestStatisticRegis(time, loading));
    },

    onStatisticRegisPayment: (time, loading) => {
      dispatch(actRequestStatisticRegisPayment(time, loading));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StudentRegister));
