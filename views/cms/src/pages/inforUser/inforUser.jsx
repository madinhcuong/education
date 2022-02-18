import React from "react";
import { Row, Col, Button } from "antd";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import * as url from "../../utils/url_api";
import av2 from "../../assets/img/avatar/av2.png";
import { switch_sex } from "../../helpers/base.helper";

class InForUser extends React.Component {
  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    let { inforAdmin } = this.props;
    return (
      <div className="main-content">
        <Row>
          <Col span={24}>
            <img
              src={
                inforAdmin.avatar ? `${url.api_url}/${inforAdmin.avatar}` : av2
              }
              alt={`${inforAdmin.avatar}`}
              className="infor-people-image"
            ></img>
          </Col>
        </Row>
        <Row className="staff-infor">
          <Col
            type="flex"
            xs={{ span: 23, offset: 0 }}
            lg={{ span: 7, offset: 0 }}
            className="staff-infor-col"
          >
            <h3>Họ và tên</h3>
            <p>{inforAdmin.fullName}</p>
          </Col>
          <Col
            type="flex"
            xs={{ span: 23, offset: 0 }}
            lg={{ span: 7, offset: 1 }}
            className="staff-infor-col"
          >
            <h3>Ngày sinh</h3>
            <p>{inforAdmin.date}</p>
          </Col>
          <Col
            type="flex"
            xs={{ span: 23, offset: 0 }}
            lg={{ span: 7, offset: 1 }}
            className="staff-infor-col"
          >
            <h3>Giới tính</h3>
            <p>{switch_sex(inforAdmin.sex)}</p>
          </Col>
        </Row>
        <Row className="staff-infor">
          <Col
            xs={{ span: 23, offset: 0 }}
            lg={{ span: 7, offset: 0 }}
            className="staff-infor-col"
          >
            <h3>Email</h3>
            <p>{inforAdmin.email}</p>
          </Col>
          <Col
            xs={{ span: 23, offset: 0 }}
            lg={{ span: 7, offset: 1 }}
            className="staff-infor-col"
          >
            <h3>Số điện thoại</h3>
            <p>{inforAdmin.phone}</p>
          </Col>
          <Col
            xs={{ span: 23, offset: 0 }}
            lg={{ span: 7, offset: 1 }}
            className="staff-infor-col"
          >
            <h3>Quyền</h3>
            <p>{inforAdmin.name}</p>
          </Col>
        </Row>
        <Row className="staff-infor">
          <Col
            xs={{ span: 23, offset: 0 }}
            lg={{ span: 7, offset: 0 }}
            className="staff-infor-col"
          >
            <h3>Địa chỉ</h3>
            <p>{inforAdmin.address}</p>
          </Col>
        </Row>
        <Row>
          <Col span={24} className="btn-component">
            <Link to={`/admin/sua-thong-tin-nguoi-dung`}>
              <Button className="btn-edit">Chỉnh sửa</Button>
            </Link>
            <Link
              to={`/admin/thay-doi-mat-khau`}
              style={{ marginLeft: "10px" }}
            >
              <Button className="btn-close">Thay đổi mật khẩu</Button>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inforAdmin: state.inforAdmin,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InForUser));
