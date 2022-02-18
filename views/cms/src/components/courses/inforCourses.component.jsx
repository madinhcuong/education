import React from "react";
import { Row, Col, Button } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../../pages/loading/loading";
import { actRequestGetCoursesById } from "../../actions/courses.action";

class InforCourses extends React.Component {
  state = {
    _id: "",
    name_training: "",
    name: "",
    time: "",
    tuition_Fees: "",
    location: "",
    depict: "",
    status: "",
  };

  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onInforCourses(id);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.courses) {
      let data_Courses = nextProps.courses.courses_ByID;
      this.setState({
        _id: data_Courses._id,
        name_training: data_Courses.id_training
          ? data_Courses.id_training.name
          : "",
        name: data_Courses.name,
        time: data_Courses.time,
        tuition_Fees: data_Courses.tuition_Fees,
        location: data_Courses.location,
        depict: data_Courses.depict,
        status: data_Courses.status,
      });
    }
  }

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    let { inforAdmin, courses } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";
    let coursesById = this.state;
    return (
      <div>
        {courses.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_COURSES") ? null : (
              <div className="main-content">
                <Row className="staff-infor">
                  <Col
                    type="flex"
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 0 }}
                    className="staff-infor-col"
                  >
                    <h3>Đào tạo</h3>
                    <p>{coursesById.name_training}</p>
                  </Col>
                  <Col
                    type="flex"
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Tên khóa học</h3>
                    <p>{coursesById.name}</p>
                  </Col>
                  <Col
                    type="flex"
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Học phí</h3>
                    <p>{coursesById.tuition_Fees}</p>
                  </Col>
                </Row>
                <Row className="staff-infor">
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 0 }}
                    className="staff-infor-col"
                  >
                    <h3>Trạng thái</h3>
                    <p>{coursesById.status === "OPEN" ? "Mở" : "Đóng"}</p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Địa điểm</h3>
                    <p>{coursesById.location}</p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Mô tả</h3>
                    <p>{coursesById.depict}</p>
                  </Col>
                </Row>

                <Row>
                  <Col span={24} className="btn-component">
                    {!permissions.includes("UPDATE_COURSES") ? null : (
                      <Link
                        to={
                          coursesById
                            ? `/admin/sua-khoa-hoc/${coursesById._id}`
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
    courses: state.courses,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onInforCourses: (id) => {
      dispatch(actRequestGetCoursesById(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InforCourses));
