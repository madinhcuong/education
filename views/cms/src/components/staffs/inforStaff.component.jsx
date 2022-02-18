import React from "react";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actRequestStaffById } from "../../actions/staff.action";
import * as url from "../../utils/url_api";
import Loading from "../../pages/loading/loading";
import { switch_sex } from "../../helpers/base.helper";

class InforStaff extends React.Component {
  state = {
    _id: "",
    name: "",
    phone: "",
    address: "",
    date: "",
    sex: "",
    email: "",
    role: "",
    avatar: "",
    image: "",
    file: "",
  };

  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onInforStaff(id);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.staff && nextProps.staff.staff_By_id) {
      let data_staff = nextProps.staff.staff_By_id;

      this.setState({
        _id: data_staff._id,
        name: data_staff.fullName ? data_staff.fullName : "",
        phone: data_staff.phone,
        address: data_staff.address,
        date: data_staff.date,
        sex: data_staff.sex,
        email: data_staff.email,
        role: data_staff.permissionGroup ? data_staff.permissionGroup : "",
        file: `${url.api_url}/${data_staff.avatar}`,
        image: data_staff.avatar,
      });
    }
  }

  render() {
    let { inforAdmin, staff } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";
    let staffById = this.state;
    return (
      <div>
        {staff.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_ADMIN") ? null : (
              <div className="main-content">
                <Row>
                  <Col span={24}>
                    <img
                      src={this.state.file}
                      alt={`${this.state.file}`}
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
                    <p>{staffById.name}</p>
                  </Col>
                  <Col
                    type="flex"
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Ngày sinh</h3>
                    <p>{staffById.date}</p>
                  </Col>
                  <Col
                    type="flex"
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Giới tính</h3>
                    <p>{switch_sex(staffById.sex)}</p>
                  </Col>
                </Row>
                <Row className="staff-infor">
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 0 }}
                    className="staff-infor-col"
                  >
                    <h3>Email</h3>
                    <p>{staffById.email}</p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Số điện thoại</h3>
                    <p>{staffById.phone}</p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Quyền</h3>
                    <p>{staffById.role ? staffById.role.name : ""}</p>
                  </Col>
                </Row>
                <Row className="staff-infor">
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 0 }}
                    className="staff-infor-col"
                  >
                    <h3>Địa chỉ</h3>
                    <p>{staffById.address}</p>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="btn-component">
                    {!permissions.includes("UPDATE_ADMIN") ? null : (
                      <Link
                        to={
                          staffById
                            ? `/admin/sua-nhan-vien/${staffById._id}`
                            : null
                        }
                      >
                        <Button className="btn-edit">
                          Chỉnh sửa
                        </Button>
                      </Link>
                    )}
                    <Link to="/admin/nhan-vien">
                      <Button className="btn-close">Hoàn tác</Button>
                    </Link>
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
    staff: state.staff,
    inforAdmin: state.inforAdmin,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onInforStaff: (id) => {
      dispatch(actRequestStaffById(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InforStaff);
