import React from "react";
import { Row, Col, Button, Table } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../../pages/loading/loading";
import { _Status_ClassAll, switch_th } from "../../helpers/base.helper";
import { actRequestGetClassAllById } from "../../actions/class.action";

class InforClassAll extends React.Component {
  state = {
    _id: "",
    name_Courses: "",
    name: "",
    time_day: "",
    time_month: "",
    time_start: "",
    time_end: "",
    total_lesson: "",
    status: "",
    name_teacher: "",
  };

  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onInforClassAll(id);
    }
  }

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    let { inforAdmin, _class } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    const columns = [
      {
        title: "STT",
        dataIndex: "STT",
        render: (text, record) =>
          _class.classAll_ByID.time_day &&
          _class.classAll_ByID.time_day.indexOf(record) + 1,
      },
      {
        title: "Thứ",
        dataIndex: "th",
        render: (text, record) => <span>{switch_th(text)}</span>,
      },
      {
        title: "Thời gian bắt đầu",
        dataIndex: "hour_start",
      },
      {
        title: "Thời gian kết thúc",
        dataIndex: "hour_end",
      },
    ];
    return (
      <div>
        {_class.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_CLASSALL") ? null : (
              <div className="main-content">
                <Row className="staff-infor">
                  <Col
                    type="flex"
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 0 }}
                    className="staff-infor-col"
                  >
                    <h3>Tên khóa học</h3>
                    <p>
                      {_class.classAll_ByID.id_Courses &&
                        _class.classAll_ByID.id_Courses.name}
                    </p>
                  </Col>
                  <Col
                    type="flex"
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Tên lớp học</h3>
                    <p>
                      {_class.classAll_ByID.name && _class.classAll_ByID.name}
                    </p>
                  </Col>
                  <Col
                    type="flex"
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Trạng thái</h3>
                    <p>
                      {
                        _Status_ClassAll(
                          _class.classAll_ByID.status &&
                            _class.classAll_ByID.status
                        ).name
                      }
                    </p>
                    {/* <h3>Thời lượng</h3>
                    <p>
                      {_class.classAll_ByID.time_month &&
                        _class.classAll_ByID.time_month} tháng
                    </p> */}
                  </Col>
                </Row>
                <Row className="staff-infor">
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 0 }}
                    className="staff-infor-col"
                  >
                    <h3>Thời gian</h3>
                    <p>
                      {_class.classAll_ByID.time_start &&
                        _class.classAll_ByID.time_start}{" "}
                      -{" "}
                      {_class.classAll_ByID.time_end &&
                        _class.classAll_ByID.time_end}
                    </p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Giáo viên</h3>
                    <p>
                      {_class.classAll_ByID.id_teacher
                        ? _class.classAll_ByID.id_teacher.fullName
                        : "Chưa có giáo viên"}
                    </p>
                  </Col>
                </Row>
                <Row className="staff-infor">
                  <Col
                    xs={{ span: 24 }}
                    lg={{ span: 18 }}
                    className="staff-infor-col"
                  >
                    <h3>Lịch học</h3>
                    <Table
                      rowKey="_id"
                      dataSource={
                        _class.classAll_ByID.time_day &&
                        _class.classAll_ByID.time_day
                      }
                      columns={columns}
                      pagination={false}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="btn-component">
                    {!permissions.includes("UPDATE_CLASSALL") ||
                    _class.classAll_ByID.status !== "OPEN" ||
                    _class.classAll_ByID.status === "CLOSE" ? null : (
                      <Link
                        to={
                          _class.classAll_ByID
                            ? `/admin/sua-thong-tin-lop-hoc/${_class.classAll_ByID._id}`
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
    _class: state._class,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onInforClassAll: (id) => {
      dispatch(actRequestGetClassAllById(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InforClassAll));
