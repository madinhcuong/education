import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Table, Button, Col, Form, Select } from "antd";
import Loading from "../../pages/loading/loading";

import {
  actRequestGetClassAllById,
  actRequestGetClassByIdTeacher,
  actRequestUpDateTeacherByIdClass,
} from "../../actions/class.action";
import { actRequestTeacherByIdClass } from "../../actions/teacher.action";
import { Array_ItemEditRole } from "../../helpers/validate";
import { switch_th } from "../../helpers/base.helper";
import ListScheduleTeacher from "./listScheduleTeacher.component";
const { Option } = Select;

class ArrangeSchedule extends React.Component {
  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onInforClassAll(id);
      this.props.onListTeacherByIdClass(id);
    }
  }

  onChange_Select_Teacher = async (value, event) => {
    this.props.onListClassByIdTeacher(value);
  };

  _Update_Teacher_Class_handleSubmit = (e) => {
    e.preventDefault();
    let { match } = this.props;
    this.props.form.validateFields((err, body) => {
      if (!err && match && !this.props._class.error) {
        let id = match.params.id;
        this.props.onCreateClassByIdTeacher(id, body, this.props.history);
      }
    });
  };

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    let { inforAdmin, _class, teacher } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";
    const { getFieldDecorator } = this.props.form;

    let list_teacher = null;
    if (teacher.listTeachByIdClass.length > 0) {
      list_teacher = teacher.listTeachByIdClass.map((item, key) => {
        return (
          <Option value={`${item._id}`} key={key}>
            {item.fullName}
          </Option>
        );
      });
    }

    const columns = [
      {
        title: "Tên khóa học",
        dataIndex: "id_Courses.name",
      },
      {
        title: "Tên lớp học",
        dataIndex: "name",
      },
      {
        title: "Thời gian",
        render: (text, record) => (
          <span>
            {text.time_day && text.time_day.length > 0 ? (
              <div>
                {text.time_day.map((item, key) => {
                  return (
                    <span key={key}>
                      {switch_th(item.th)} ({item.hour_start}-{item.hour_end})
                      <br></br>
                    </span>
                  );
                })}
              </div>
            ) : null}
          </span>
        ),
      },
      {
        title: "Ngày bắt đầu",
        dataIndex: "time_start",
      },

      {
        title: "Ngày kết thúc",
        dataIndex: "time_end",
      },
    ];

    return (
      <div>
        {_class.success && teacher.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("UPDATE_CLASSALL") ? null : (
              <div className="main-content">
                <Row>
                  <Form
                    onSubmit={this._Update_Teacher_Class_handleSubmit}
                    className=""
                  >
                    <Row>
                      <Col span={10}>
                        <h4
                          className="teacher-title-addT"
                          style={{ paddingTop: "6px" }}
                        >
                          Giáo viên:
                        </h4>
                        <Form.Item>
                          {getFieldDecorator(
                            "id_teacher",
                            {
                              initialValue:
                                _class.classAll_ByID.id_teacher &&
                                _class.classAll_ByID.id_teacher._id,
                              rules: Array_ItemEditRole(
                                "Giáo viên không được để trống"
                              ).rules,
                            }
                            // Array_ItemEditRole("Giáo viên không được để trống")
                          )(
                            <Select
                              onChange={this.onChange_Select_Teacher}
                              className={
                                _class.error ? `error-class-select` : null
                              }
                            >
                              {!list_teacher ? null : list_teacher}
                            </Select>
                          )}
                          {_class.error ? (
                            <div className="ant-form-explain error-class">
                              {_class.error}
                            </div>
                          ) : null}
                        </Form.Item>
                      </Col>
                      <Col
                        span={10}
                        offset={2}
                        className="btn-schedule-teacher"
                      >
                        <Form.Item>
                          <Button htmlType="submit" className="btn-edit">
                            Lưu lại
                          </Button>
                          <Button onClick={this.onClose} className="btn-close">
                            Hoàn tác
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Row>
                <Row style={{ marginTop: "30px" }}>
                  <Col span={24}>
                    <h3>Lớp học cần sắp xếp giáo viên:</h3>
                  </Col>
                  {_class.classAll_ByID ? (
                    <Table
                      rowKey="_id"
                      columns={columns}
                      dataSource={[
                        _class.classAll_ByID && _class.classAll_ByID,
                      ]}
                      pagination={false}
                      className="news-table"
                    />
                  ) : null}
                </Row>
                <Row style={{ marginBottom: "10px", marginTop: "50px" }}>
                  <Col span={24}>
                    <h3>Lịch giảng dạy của giáo viên:</h3>
                  </Col>
                  <ListScheduleTeacher />
                  {/* <Col span={24}>
                    <h3>Lịch giảng dạy của giáo viên:</h3>
                  </Col>
                  {_class.classAll_ByID ? (
                    <Table
                      rowKey="_id"
                      columns={columns}
                      dataSource={[
                        _class.classAll_ByID && _class.classAll_ByID
                      ]}
                      pagination={false}
                      className="news-table"
                    />
                  ) : null} */}
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
    teacher: state.teacher,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onInforClassAll: (id) => {
      dispatch(actRequestGetClassAllById(id));
    },
    onListTeacherByIdClass: (id) => {
      dispatch(actRequestTeacherByIdClass(id));
    },
    onListClassByIdTeacher: (id) => {
      dispatch(actRequestGetClassByIdTeacher(id));
    },
    onCreateClassByIdTeacher: (id, body, history) => {
      dispatch(actRequestUpDateTeacherByIdClass(id, body, history));
    },
  };
};

const Arrange_Schedule = Form.create()(withRouter(ArrangeSchedule));
export default connect(mapStateToProps, mapDispatchToProps)(Arrange_Schedule);
