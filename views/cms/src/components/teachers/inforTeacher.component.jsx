import React from "react";
import { Row, Col, Button } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as url from "../../utils/url_api";
import Loading from "../../pages/loading/loading";
import { switch_sex } from "../../helpers/base.helper";
import { actRequestTeacherById } from "../../actions/teacher.action";

class InforTeacher extends React.Component {
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
    specialize: "",
    depict: "",
    image: "",
    file: "",
  };

  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onInforTeacher(id);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.teacher && nextProps.teacher.teacher_By_id) {
      let data_teacher = nextProps.teacher.teacher_By_id;

      this.setState({
        _id: data_teacher._id,
        name: data_teacher.fullName ? data_teacher.fullName : "",
        phone: data_teacher.phone,
        address: data_teacher.address,
        date: data_teacher.date,
        sex: data_teacher.sex,
        email: data_teacher.email,
        specialize: data_teacher.specialize ? data_teacher.specialize.name : "",
        role: data_teacher.permissionGroup ? data_teacher.permissionGroup : "",
        depict: data_teacher.depict,
        file: `${url.api_url}/${data_teacher.avatar}`,
        image: data_teacher.avatar,
      });
    }
  }

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    let { inforAdmin, teacher } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";
    let TeacherById = this.state;
    return (
      <div>
        {teacher.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_TEACHER") ? null : (
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
                    <p>{TeacherById.name}</p>
                  </Col>
                  <Col
                    type="flex"
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Ngày sinh</h3>
                    <p>{TeacherById.date}</p>
                  </Col>
                  <Col
                    type="flex"
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Giới tính</h3>
                    <p>{switch_sex(TeacherById.sex)}</p>
                  </Col>
                </Row>
                <Row className="staff-infor">
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 0 }}
                    className="staff-infor-col"
                  >
                    <h3>Email</h3>
                    <p>{TeacherById.email}</p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Số điện thoại</h3>
                    <p>{TeacherById.phone}</p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Chuyên nghành</h3>
                    <p>{TeacherById.specialize}</p>
                  </Col>
                </Row>
                <Row className="staff-infor">
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 0 }}
                    className="staff-infor-col"
                  >
                    <h3>Địa chỉ</h3>
                    <p>{TeacherById.address}</p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Quyền</h3>
                    <p>{TeacherById.role ? TeacherById.role.name : ""}</p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Mô tả</h3>
                    <p>{TeacherById.depict}</p>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="btn-component">
                    {!permissions.includes("UPDATE_TEACHER") ? null : (
                      <Link
                        to={
                          TeacherById
                            ? `/admin/sua-giao-vien/${TeacherById._id}`
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
    teacher: state.teacher,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onInforTeacher: (id) => {
      dispatch(actRequestTeacherById(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InforTeacher));
