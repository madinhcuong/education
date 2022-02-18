import React from "react";
import { Row, Col, Button } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../../pages/loading/loading";
import * as url from "../../utils/url_api";
import { switch_sex } from "../../helpers/base.helper";

class InforStudentClass extends React.Component {
  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    let { _class, inforAdmin } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    return (
      <div>
        {_class.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_CLASSALL") ? null : (
              <div>
                <Row style={{ marginBottom: "10px" }}>
                  <Col span={24}>
                    <h2>Thông tin học viên</h2>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="infor-people-col-image">
                    {_class.inforStudentClass.id_student &&
                    _class.inforStudentClass.id_student.image ? (
                      <img
                        src={`${url.api_url}/${
                          _class.inforStudentClass.id_student &&
                          _class.inforStudentClass.id_student.image
                        }`}
                        alt={`${
                          _class.inforStudentClass.id_student &&
                          _class.inforStudentClass.id_student.image
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
                      {_class.inforStudentClass.id_student &&
                        _class.inforStudentClass.id_student.name}
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
                      {_class.inforStudentClass.id_student &&
                        switch_sex(_class.inforStudentClass.id_student.sex)}
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
                      {_class.inforStudentClass.id_student &&
                        _class.inforStudentClass.id_student.date}
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
                      {_class.inforStudentClass.id_student &&
                        _class.inforStudentClass.id_student.address}
                    </p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Email</h3>
                    <p>
                      {_class.inforStudentClass.id_student &&
                        _class.inforStudentClass.id_student.email}
                    </p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Số điện thoại</h3>
                    <p>
                      {_class.inforStudentClass.id_student &&
                        _class.inforStudentClass.id_student.phone}
                    </p>
                  </Col>
                </Row>
                <Row className="staff-infor">
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 0 }}
                    className="staff-infor-col"
                  >
                    <h3>Điểm 1 (30%)</h3>
                    <p>
                      {_class.inforStudentClass.score_30 &&
                        _class.inforStudentClass.score_30}
                    </p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Điểm 2 (70%)</h3>
                    <p>
                      {_class.inforStudentClass.score_70 &&
                        _class.inforStudentClass.score_70}
                    </p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Điểm trung bình</h3>
                    <p>
                      {_class.inforStudentClass.total_score &&
                        _class.inforStudentClass.total_score}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="staff-btn-edit-back">
                    <Button
                      onClick={this.onClose}
                      className="staff-edit-infor-back"
                    >
                      Quay lại
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
    _class: state._class,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InforStudentClass));
