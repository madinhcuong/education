import React from "react";
import { Row, Col, Button } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import Loading from "../../pages/loading/loading";
import * as url from "../../utils/url_api";
import { switch_sex, formatNumber } from "../../helpers/base.helper";

import { actRequestGetStudentRegisterById } from "../../actions/studentRegister.action";

class InforStudentRegister extends React.Component {
  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onInforStudentRegister(id, this.callback);
    }
  }

  callback = (err, result) => {};

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    let { inforAdmin, studentRegister } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    return (
      <div>
        {studentRegister.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_STUDENT") ? null : (
              <div className="main-content">
                <Row>
                  <Col span={24} className="infor-people-col-image">
                    {studentRegister.studentRegisterById.id_student &&
                    studentRegister.studentRegisterById.id_student.image ? (
                      <img
                        src={`${url.api_url}/${
                          studentRegister.studentRegisterById.id_student &&
                          studentRegister.studentRegisterById.id_student.image
                        }`}
                        alt={`${
                          studentRegister.studentRegisterById.id_student &&
                          studentRegister.studentRegisterById.id_student.image
                        }`}
                        className="infor-people-image"
                      ></img>
                    ) : null}
                  </Col>
                </Row>
                <Row className="staff-infor">
                  <Col
                    type="flex"
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 0 }}
                    className="staff-infor-col"
                  >
                    <h3>Tên học viên</h3>
                    <p>
                      {studentRegister.studentRegisterById.id_student &&
                        studentRegister.studentRegisterById.id_student.name}
                    </p>
                  </Col>
                  <Col
                    type="flex"
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Giới tính</h3>
                    <p>
                      {studentRegister.studentRegisterById.id_student &&
                        switch_sex(
                          studentRegister.studentRegisterById.id_student.sex
                        )}
                    </p>
                  </Col>
                  <Col
                    type="flex"
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Ngày sinh</h3>
                    <p>
                      {studentRegister.studentRegisterById.id_student &&
                        studentRegister.studentRegisterById.id_student.date}
                    </p>
                  </Col>
                </Row>
                <Row className="staff-infor">
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 0 }}
                    className="staff-infor-col"
                  >
                    <h3>Địa chỉ</h3>
                    <p>
                      {studentRegister.studentRegisterById.id_student &&
                        studentRegister.studentRegisterById.id_student.address}
                    </p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Email</h3>
                    <p>
                      {studentRegister.studentRegisterById.id_student &&
                        studentRegister.studentRegisterById.id_student.email}
                    </p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Số điện thoại</h3>
                    <p>
                      {studentRegister.studentRegisterById.id_student &&
                        studentRegister.studentRegisterById.id_student.phone}
                    </p>
                  </Col>
                </Row>
                <Row className="staff-infor">
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 0 }}
                    className="staff-infor-col"
                  >
                    <h3>Lớp học</h3>
                    <p>
                      {studentRegister.studentRegisterById.id_Class &&
                        studentRegister.studentRegisterById.id_Class.name}
                    </p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Người giới thiệu</h3>
                    <p>
                      {studentRegister.studentRegisterById.id_student &&
                      studentRegister.studentRegisterById.id_student
                        .agent_code ? (
                        studentRegister.studentRegisterById.id_student
                          .agent_code
                      ) : (
                        <i className="data-null">null</i>
                      )}
                    </p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Mã giới thiệu</h3>
                    <p>
                      {studentRegister.studentRegisterById.id_student &&
                        studentRegister.studentRegisterById.id_student
                          .your_agent}
                    </p>
                  </Col>
                </Row>
                <Row className="staff-infor">
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 0 }}
                    className="staff-infor-col"
                  >
                    <h3>Học phí</h3>
                    <p>
                      {studentRegister.studentRegisterById &&
                      studentRegister.studentRegisterById.tuition_Fees
                        ? formatNumber(
                            studentRegister.studentRegisterById.tuition_Fees
                          )
                        : 0}{" "}
                      vnđ
                    </p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Giảm giá</h3>
                    <p>
                      {studentRegister.studentRegisterById &&
                        studentRegister.studentRegisterById.sale_percent}{" "}
                      %
                    </p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Học phí ưu đãi</h3>
                    <p>
                      {studentRegister.studentRegisterById &&
                      studentRegister.studentRegisterById.tuition_Fees_discount
                        ? formatNumber(
                            studentRegister.studentRegisterById
                              .tuition_Fees_discount
                          )
                        : 0}{" "}
                      vnđ
                    </p>
                  </Col>
                </Row>
                <Row className="staff-infor">
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 0 }}
                    className="staff-infor-col"
                  >
                    <h3>Ngày đăng ký</h3>
                    <p>
                      {studentRegister.studentRegisterById &&
                      studentRegister.studentRegisterById.createdAt ? (
                        <Moment format="HH:mm-DD/MM/YYYY">
                          {studentRegister.studentRegisterById.createdAt}
                        </Moment>
                      ) : null}
                    </p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Ngày thanh toán</h3>
                    <p>
                      {studentRegister.studentRegisterById &&
                      studentRegister.studentRegisterById.payment_date ? (
                        <Moment format="HH:mm-DD/MM/YYYY">
                          {studentRegister.studentRegisterById.payment_date}
                        </Moment>
                      ) : (
                        "- - -"
                      )}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="btn-component">
                    {!permissions.includes("UPDATE_STUDENT") ||
                    (studentRegister.studentRegisterById &&
                      studentRegister.studentRegisterById.payment_status ===
                        "APPROVED") ? null : (
                      <Link
                        to={
                          studentRegister.studentRegisterById
                            ? `/admin/hoc-vien/sua-hoc-vien/${studentRegister.studentRegisterById._id}`
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
    studentRegister: state.studentRegister,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onInforStudentRegister: (id, callback) => {
      dispatch(actRequestGetStudentRegisterById(id, callback, true));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InforStudentRegister));
