import React from "react";
import { Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as url from "../../utils/url_api";
import { switch_sex } from "../../helpers/base.helper";

class InforStudent extends React.Component {
  render() {
    let { StudentById } = this.props;

    return (
      <div>
        <Row >
          <Col span={24} className="infor-people-col-image">
            {StudentById && StudentById.image ? (
              <img
                src={`${url.api_url}/${StudentById && StudentById.image}`}
                alt={`${StudentById && StudentById.image}`}
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
            <p>{StudentById && StudentById.name}</p>
          </Col>
          <Col
            type="flex"
            xs={{ span: 23, offset: 0 }}
            lg={{ span: 7, offset: 1 }}
            className="staff-infor-col"
          >
            <h3>Giới tính</h3>
            <p>{StudentById && switch_sex(StudentById.sex)}</p>
          </Col>
          <Col
            type="flex"
            xs={{ span: 23, offset: 0 }}
            lg={{ span: 7, offset: 1 }}
            className="staff-infor-col"
          >
            <h3>Ngày sinh</h3>
            <p>{StudentById && StudentById.date}</p>
          </Col>
        </Row>
        <Row className="staff-infor">
          <Col
            xs={{ span: 23, offset: 0 }}
            lg={{ span: 7, offset: 0 }}
            className="staff-infor-col"
          >
            <h3>Địa chỉ</h3>
            <p>{StudentById && StudentById.address}</p>
          </Col>
          <Col
            xs={{ span: 23, offset: 0 }}
            lg={{ span: 7, offset: 1 }}
            className="staff-infor-col"
          >
            <h3>Email</h3>
            <p>{StudentById && StudentById.email}</p>
          </Col>
          <Col
            xs={{ span: 23, offset: 0 }}
            lg={{ span: 7, offset: 1 }}
            className="staff-infor-col"
          >
            <h3>Số điện thoại</h3>
            <p>{StudentById && StudentById.phone}</p>
          </Col>
        </Row>
        <Row className="staff-infor">
          <Col
            xs={{ span: 23, offset: 0 }}
            lg={{ span: 7, offset: 0 }}
            className="staff-infor-col"
          >
            <h3>Người giới thiệu</h3>
            <p>{StudentById && StudentById.agent_code}</p>
          </Col>
          <Col
            xs={{ span: 23, offset: 0 }}
            lg={{ span: 7, offset: 1 }}
            className="staff-infor-col"
          >
            <h3>Mã giới thiệu</h3>
            <p>{StudentById && StudentById.your_agent}</p>
          </Col>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InforStudent));
