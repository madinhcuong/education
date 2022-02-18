import React from "react";
import { Checkbox, Form, Button, Row, Col, Input } from "antd";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  actRequestPermissionRole,
  actRequestUpDateRole,
} from "../../actions/role.action";
import * as helper from "../../helpers/role.helper";
import { Array_ItemEditRole } from "../../helpers/base.helper";
import Loading from "../../pages/loading/loading";

class EditRole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",

      //-- Role
      checkedList_Role: [],
      checkAll_Role: false,

      //-- Staff
      checkedList_Staff: [],
      checkAll_Staff: false,

      //-- Teacher
      checkedList_Teacher: [],
      checkAll_Teacher: false,

      //-- Topic
      checkedList_Topic: [],
      checkAll_Topic: false,

      //-- News
      checkedList_News: [],
      checkAll_News: false,

      //-- Training
      checkedList_Training: [],
      checkAll_Training: false,

      //-- Courses
      checkedList_Courses: [],
      checkAll_Courses: false,

      //-- Inffor_Training
      checkedList_InforTraining: [],
      checkAll_InforTraining: false,

      //-- Class_All
      checkedList_ClassAll: [],
      checkAll_ClassAll: false,

      //-- Logs
      checkedList_Logs: [],
      checkAll_Logs: false,

      //-- Student
      checkedList_Student: [],
      checkAll_Student: false,

      //-- Statistic
      checkedList_Statistic: [],
      checkAll_Statistic: false,

      //-- Score Cumulative
      checkedList_ScoreCumulative: [],
      checkAll_ScoreCumulative: false,

      //-- Noti
      checkedList_Noti: [],
      checkAll_Noti: false,

      //-- Diploma
      checkedList_Diploma: [],
      checkAll_Diploma: false,

      //-- Pay
      checkedList_Pay: [],
      checkAll_Pay: false,

      //-- LayoutUser
      checkedList_LayoutUser: [],
      checkAll_LayoutUser: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onPermissionById(id);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps &&
      nextProps.role &&
      nextProps.role.roleById &&
      nextProps.role.roleById.permissions
    ) {
      //-- Role
      let array_Role = Array_ItemEditRole(
        helper.Role,
        nextProps.role.roleById.permissions
      );

      //-- Staff
      let array_Staff = Array_ItemEditRole(
        helper.Staff,
        nextProps.role.roleById.permissions
      );

      //-- Teacher
      let array_Teacher = Array_ItemEditRole(
        helper.Teacher,
        nextProps.role.roleById.permissions
      );

      //-- Topic
      let array_topic = Array_ItemEditRole(
        helper.Topic,
        nextProps.role.roleById.permissions
      );

      //-- News
      let array_new = Array_ItemEditRole(
        helper.News,
        nextProps.role.roleById.permissions
      );

      //-- Training
      let array_Training = Array_ItemEditRole(
        helper.Training,
        nextProps.role.roleById.permissions
      );

      //-- Courses
      let array_Courses = Array_ItemEditRole(
        helper.Courses,
        nextProps.role.roleById.permissions
      );

      //-- Infor_Training
      let array_InforTraining = Array_ItemEditRole(
        helper.InforTraining,
        nextProps.role.roleById.permissions
      );

      //-- Class_All
      let array_ClassAll = Array_ItemEditRole(
        helper.ClassAll,
        nextProps.role.roleById.permissions
      );

      //-- Logs
      let array_Logs = Array_ItemEditRole(
        helper.Logs,
        nextProps.role.roleById.permissions
      );

      //-- Student
      let array_Student = Array_ItemEditRole(
        helper.Student,
        nextProps.role.roleById.permissions
      );

      //-- Statistic
      let array_Statistic = Array_ItemEditRole(
        helper.Statistic,
        nextProps.role.roleById.permissions
      );

      //-- ScoreCumulative
      let array_ScoreCumulative = Array_ItemEditRole(
        helper.ScoreCumulative,
        nextProps.role.roleById.permissions
      );

      //-- Noti
      let array_Noti = Array_ItemEditRole(
        helper.Noti,
        nextProps.role.roleById.permissions
      );

      //-- Diploma
      let array_Diploma = Array_ItemEditRole(
        helper.Diploma,
        nextProps.role.roleById.permissions
      );

      //-- Pay
      let array_Pay = Array_ItemEditRole(
        helper.Pay,
        nextProps.role.roleById.permissions
      );

      //-- LayoutUser
      let array_LayoutUser = Array_ItemEditRole(
        helper.LayoutUser,
        nextProps.role.roleById.permissions
      );

      this.setState({
        name: nextProps.role.roleById.name,
        description: nextProps.role.roleById.description,
        //-- Role
        checkedList_Role: array_Role,
        checkAll_Role: array_Role.length === helper.Role.length ? true : false,

        //-- Staff
        checkedList_Staff: array_Staff,
        checkAll_Staff:
          array_Staff.length === helper.Staff.length ? true : false,

        //-- Teacher
        checkedList_Teacher: array_Teacher,
        checkAll_Teacher:
          array_Teacher.length === helper.Teacher.length ? true : false,

        //-- Topic
        checkedList_Topic: array_topic,
        checkAll_Topic:
          array_topic.length === helper.Topic.length ? true : false,

        //-- News
        checkedList_News: array_new,
        checkAll_News: array_new.length === helper.News.length ? true : false,

        //-- Training
        checkedList_Training: array_Training,
        checkAll_Training:
          array_Training.length === helper.Training.length ? true : false,

        //-- Courses
        checkedList_Courses: array_Courses,
        checkAll_Courses:
          array_Courses.length === helper.Courses.length ? true : false,

        //-- Infor_Training
        checkedList_InforTraining: array_InforTraining,
        checkAll_InforTraining:
          array_InforTraining.length === helper.InforTraining.length
            ? true
            : false,

        //-- ClassAll
        checkedList_ClassAll: array_ClassAll,
        checkAll_ClassAll:
          array_ClassAll.length === helper.ClassAll.length ? true : false,

        //-- Logs
        checkedList_Logs: array_Logs,
        checkAll_Logs: array_Logs.length === helper.Logs.length ? true : false,

        //-- Student
        checkedList_Student: array_Student,
        checkAll_Student:
          array_Student.length === helper.Student.length ? true : false,

        //-- Statistic
        checkedList_Statistic: array_Statistic,
        checkAll_Statistic:
          array_Statistic.length === helper.Statistic.length ? true : false,

        //-- Statistic
        checkedList_ScoreCumulative: array_ScoreCumulative,
        checkAll_ScoreCumulative:
          array_ScoreCumulative.length === helper.ScoreCumulative.length
            ? true
            : false,

        //-- Noti
        checkedList_Noti: array_Noti,
        checkAll_Noti: array_Noti.length === helper.Noti.length ? true : false,

        //-- Diploma
        checkedList_Diploma: array_Diploma,
        checkAll_Diploma:
          array_Diploma.length === helper.Diploma.length ? true : false,

        //-- Pay
        checkedList_Pay: array_Pay,
        checkAll_Pay: array_Pay.length === helper.Pay.length ? true : false,

        //-- LayoutUser
        checkedList_LayoutUser: array_LayoutUser,
        checkAll_LayoutUser:
          array_LayoutUser.length === helper.LayoutUser.length ? true : false,
      });
    }
  }

  //--- Role
  onCheck_Role = (e) => {
    const values = helper.Role.map((record) => record.value);
    this.setState({
      checkAll_Role: e.target.checked,
      checkedList_Role: e.target.checked ? values : [],
    });
  };

  onGroupChange_Role = (checkedList_Role) => {
    this.setState({
      checkedList_Role,
      checkAll_Role: checkedList_Role.length === helper.Role.length,
    });
  };

  //--- Staff
  onCheck_Staff = (e) => {
    const values = helper.Staff.map((record) => record.value);
    this.setState({
      checkAll_Staff: e.target.checked,
      checkedList_Staff: e.target.checked ? values : [],
    });
  };

  onGroupChange_Staff = (checkedList_Staff) => {
    this.setState({
      checkedList_Staff,
      checkAll_Staff: checkedList_Staff.length === helper.Staff.length,
    });
  };

  //--- Teacher
  onCheck_Teacher = (e) => {
    const values = helper.Teacher.map((record) => record.value);
    this.setState({
      checkAll_Teacher: e.target.checked,
      checkedList_Teacher: e.target.checked ? values : [],
    });
  };

  onGroupChange_Teacher = (checkedList_Teacher) => {
    this.setState({
      checkedList_Teacher,
      checkAll_Teacher: checkedList_Teacher.length === helper.Teacher.length,
    });
  };

  // ------ Topic ------ ///
  onCheck_Topic = (e) => {
    const values = helper.Topic.map((record) => record.value);
    this.setState({
      checkAll_Topic: e.target.checked,
      checkedList_Topic: e.target.checked ? values : [],
    });
  };

  onGroupChange_Topic = (checkedList_Topic) => {
    this.setState({
      checkedList_Topic,
      checkAll_Topic: checkedList_Topic.length === helper.Topic.length,
    });
  };

  //-------- News -------//
  onCheck_News = (e) => {
    const values = helper.News.map((record) => record.value);
    this.setState({
      checkAll_News: e.target.checked,
      checkedList_News: e.target.checked ? values : [],
    });
  };

  onGroupChange_News = (checkedList_News) => {
    this.setState({
      checkedList_News,
      checkAll_News: checkedList_News.length === helper.News.length,
    });
  };

  //--- Training
  onCheck_Training = (e) => {
    const values = helper.Training.map((record) => record.value);
    this.setState({
      checkAll_Training: e.target.checked,
      checkedList_Training: e.target.checked ? values : [],
    });
  };

  onGroupChange_Training = (checkedList_Training) => {
    this.setState({
      checkedList_Training,
      checkAll_Training: checkedList_Training.length === helper.Training.length,
    });
  };

  //--- Courses
  onCheck_Courses = (e) => {
    const values = helper.Courses.map((record) => record.value);
    this.setState({
      checkAll_Courses: e.target.checked,
      checkedList_Courses: e.target.checked ? values : [],
    });
  };

  onGroupChange_Courses = (checkedList_Courses) => {
    this.setState({
      checkedList_Courses,
      checkAll_Courses: checkedList_Courses.length === helper.Courses.length,
    });
  };

  //--- Infor_Training
  onCheck_InforTraining = (e) => {
    const values = helper.InforTraining.map((record) => record.value);
    this.setState({
      checkAll_InforTraining: e.target.checked,
      checkedList_InforTraining: e.target.checked ? values : [],
    });
  };

  onGroupChange_InforTraining = (checkedList_InforTraining) => {
    this.setState({
      checkedList_InforTraining,
      checkAll_InforTraining:
        checkedList_InforTraining.length === helper.InforTraining.length,
    });
  };

  //-- Class_All
  onCheck_ClassAll = (e) => {
    const values = helper.ClassAll.map((record) => record.value);
    this.setState({
      checkAll_ClassAll: e.target.checked,
      checkedList_ClassAll: e.target.checked ? values : [],
    });
  };

  onGroupChange_ClassAll = (checkedList_ClassAll) => {
    this.setState({
      checkedList_ClassAll,
      checkAll_ClassAll: checkedList_ClassAll.length === helper.ClassAll.length,
    });
  };

  //-- Logs
  onCheck_Logs = (e) => {
    const values = helper.Logs.map((record) => record.value);
    this.setState({
      checkAll_Logs: e.target.checked,
      checkedList_Logs: e.target.checked ? values : [],
    });
  };

  onGroupChange_Logs = (checkedList_Logs) => {
    this.setState({
      checkedList_Logs,
      checkAll_Logs: checkedList_Logs.length === helper.Logs.length,
    });
  };

  //-- Student
  onCheck_Student = (e) => {
    const values = helper.Student.map((record) => record.value);
    this.setState({
      checkAll_Student: e.target.checked,
      checkedList_Student: e.target.checked ? values : [],
    });
  };

  onGroupChange_Student = (checkedList_Student) => {
    this.setState({
      checkedList_Student,
      checkAll_Student: checkedList_Student.length === helper.Student.length,
    });
  };

  //-- Statistic
  onCheck_Statistic = (e) => {
    const values = helper.Statistic.map((record) => record.value);
    this.setState({
      checkAll_Statistic: e.target.checked,
      checkedList_Statistic: e.target.checked ? values : [],
    });
  };

  onGroupChange_Statistic = (checkedList_Statistic) => {
    this.setState({
      checkedList_Statistic,
      checkAll_Statistic:
        checkedList_Statistic.length === helper.Statistic.length,
    });
  };

  //-- Score Cumulative
  onCheck_ScoreCumulative = (e) => {
    const values = helper.ScoreCumulative.map((record) => record.value);
    this.setState({
      checkAll_ScoreCumulative: e.target.checked,
      checkedList_ScoreCumulative: e.target.checked ? values : [],
    });
  };

  onGroupChange_ScoreCumulative = (checkedList_ScoreCumulative) => {
    this.setState({
      checkedList_ScoreCumulative,
      checkAll_ScoreCumulative:
        checkedList_ScoreCumulative.length === helper.ScoreCumulative.length,
    });
  };

  //-- Noti
  onCheck_Noti = (e) => {
    const values = helper.Noti.map((record) => record.value);
    this.setState({
      checkAll_Noti: e.target.checked,
      checkedList_Noti: e.target.checked ? values : [],
    });
  };

  onGroupChange_Noti = (checkedList_Noti) => {
    this.setState({
      checkedList_Noti,
      checkAll_Noti: checkedList_Noti.length === helper.Noti.length,
    });
  };

  //-- Diploma
  onCheck_Diploma = (e) => {
    const values = helper.Diploma.map((record) => record.value);
    this.setState({
      checkAll_Diploma: e.target.checked,
      checkedList_Diploma: e.target.checked ? values : [],
    });
  };

  onGroupChange_Diploma = (checkedList_Diploma) => {
    this.setState({
      checkedList_Diploma,
      checkAll_Diploma: checkedList_Diploma.length === helper.Diploma.length,
    });
  };

  //-- Pay
  onCheck_Pay = (e) => {
    const values = helper.Pay.map((record) => record.value);
    this.setState({
      checkAll_Pay: e.target.checked,
      checkedList_Pay: e.target.checked ? values : [],
    });
  };

  onGroupChange_Pay = (checkedList_Pay) => {
    this.setState({
      checkedList_Pay,
      checkAll_Pay: checkedList_Pay.length === helper.Pay.length,
    });
  };

  //-- LayoutUser
  onCheck_LayoutUser = (e) => {
    const values = helper.LayoutUser.map((record) => record.value);
    this.setState({
      checkAll_LayoutUser: e.target.checked,
      checkedList_LayoutUser: e.target.checked ? values : [],
    });
  };

  onGroupChange_LayoutUser = (checkedList_LayoutUser) => {
    this.setState({
      checkedList_LayoutUser,
      checkAll_LayoutUser:
        checkedList_LayoutUser.length === helper.LayoutUser.length,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.form.validateFields((err, values) => {
        if (!err) {
          let array_permissions = this.state.checkedList_Role.concat(
            this.state.checkedList_Staff,
            this.state.checkedList_Teacher,
            this.state.checkedList_Topic,
            this.state.checkedList_News,
            this.state.checkedList_Training,
            this.state.checkedList_InforTraining,
            this.state.checkedList_Courses,
            this.state.checkedList_ClassAll,
            this.state.checkedList_Logs,
            this.state.checkedList_Student,
            this.state.checkedList_Statistic,
            this.state.checkedList_ScoreCumulative,
            this.state.checkedList_Noti,
            this.state.checkedList_Diploma,
            this.state.checkedList_Pay,
            this.state.checkedList_LayoutUser
          );

          let data = {
            name: values.name,
            description: values.description,
            permissions: array_permissions,
          };
          this.props.onUpdateRole(id, data, this.props.history);
        }
      });
    }
  };

  Delay_Submit = () => {
    window.location = "/admin/phan-quyen";
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let { inforAdmin, role } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    let checkbox_config = [
      {
        name: "Quản lý phân quyền",
        onChange: this.onCheck_Role,
        checked: this.state.checkAll_Role,
        options: helper.Role,
        onChange_Group: this.onGroupChange_Role,
        value: this.state.checkedList_Role,
      },
      {
        name: "Thống kê",
        onChange: this.onCheck_Statistic,
        checked: this.state.checkAll_Statistic,
        options: helper.Statistic,
        onChange_Group: this.onGroupChange_Statistic,
        value: this.state.checkedList_Statistic,
      },
      {
        name: "Quản lý nhân viên",
        onChange: this.onCheck_Staff,
        checked: this.state.checkAll_Staff,
        options: helper.Staff,
        onChange_Group: this.onGroupChange_Staff,
        value: this.state.checkedList_Staff,
      },
      {
        name: "Quản lý giáo viên",
        onChange: this.onCheck_Teacher,
        checked: this.state.checkAll_Teacher,
        options: helper.Teacher,
        onChange_Group: this.onGroupChange_Teacher,
        value: this.state.checkedList_Teacher,
      },
      {
        name: "Quản lý chủ đề tin tức",
        onChange: this.onCheck_Topic,
        checked: this.state.checkAll_Topic,
        options: helper.Topic,
        onChange_Group: this.onGroupChange_Topic,
        value: this.state.checkedList_Topic,
      },
      {
        name: "Quản lý tin tức",
        onChange: this.onCheck_News,
        checked: this.state.checkAll_News,
        options: helper.News,
        onChange_Group: this.onGroupChange_News,
        value: this.state.checkedList_News,
      },
      {
        name: "Quản lý đào tạo",
        onChange: this.onCheck_Training,
        checked: this.state.checkAll_Training,
        options: helper.Training,
        onChange_Group: this.onGroupChange_Training,
        value: this.state.checkedList_Training,
      },
      {
        name: "Quản lý khóa học",
        onChange: this.onCheck_Courses,
        checked: this.state.checkAll_Courses,
        options: helper.Courses,
        onChange_Group: this.onGroupChange_Courses,
        value: this.state.checkedList_Courses,
      },
      {
        name: "Quản lý thông tin khóa học",
        onChange: this.onCheck_InforTraining,
        checked: this.state.checkAll_InforTraining,
        options: helper.InforTraining,
        onChange_Group: this.onGroupChange_InforTraining,
        value: this.state.checkedList_InforTraining,
      },
      {
        name: "Quản lý lớp học",
        onChange: this.onCheck_ClassAll,
        checked: this.state.checkAll_ClassAll,
        options: helper.ClassAll,
        onChange_Group: this.onGroupChange_ClassAll,
        value: this.state.checkedList_ClassAll,
      },
      {
        name: "Quản lý học viên",
        onChange: this.onCheck_Student,
        checked: this.state.checkAll_Student,
        options: helper.Student,
        onChange_Group: this.onGroupChange_Student,
        value: this.state.checkedList_Student,
      },
      {
        name: "Quản lý điểm tích lũy",
        onChange: this.onCheck_ScoreCumulative,
        checked: this.state.checkAll_ScoreCumulative,
        options: helper.ScoreCumulative,
        onChange_Group: this.onGroupChange_ScoreCumulative,
        value: this.state.checkedList_ScoreCumulative,
      },
      {
        name: "Quản lý điểm chứng chỉ",
        onChange: this.onCheck_Diploma,
        checked: this.state.checkAll_Diploma,
        options: helper.Diploma,
        onChange_Group: this.onGroupChange_Diploma,
        value: this.state.checkedList_Diploma,
      },
      {
        name: "Thanh toán tiền",
        onChange: this.onCheck_Pay,
        checked: this.state.checkAll_Pay,
        options: helper.Pay,
        onChange_Group: this.onGroupChange_Pay,
        value: this.state.checkedList_Pay,
      },
      {
        name: "Thông báo",
        onChange: this.onCheck_Noti,
        checked: this.state.checkAll_Noti,
        options: helper.Noti,
        onChange_Group: this.onGroupChange_Noti,
        value: this.state.checkedList_Noti,
      },
      {
        name: "Giao diện người dùng",
        onChange: this.onCheck_LayoutUser,
        checked: this.state.checkAll_LayoutUser,
        options: helper.LayoutUser,
        onChange_Group: this.onGroupChange_LayoutUser,
        value: this.state.checkedList_LayoutUser,
      },
      {
        name: "Quản lý lịch sử",
        onChange: this.onCheck_Logs,
        checked: this.state.checkAll_Logs,
        options: helper.Logs,
        onChange_Group: this.onGroupChange_Logs,
        value: this.state.checkedList_Logs,
      },
    ];

    let checkbox_array = checkbox_config.map((item, key) => {
      return (
        <div key={key} className="role-checkbox-array">
          <Row>
            <Checkbox
              onChange={item.onChange}
              checked={item.checked}
              className="role-checkbox-all"
            >
              {item.name}
            </Checkbox>
          </Row>

          <Row>
            <Checkbox.Group
              options={item.options}
              onChange={item.onChange_Group}
              value={item.value}
              className="role-checkgroup"
            ></Checkbox.Group>
          </Row>
        </div>
      );
    });

    return (
      <div>
        {role.success ? (
          <Loading />
        ) : (
          <div className="main-content">
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <Row>
                <Col span={12}>
                  <h4 className="role-title-addRole">Tên quyền:</h4>
                  <Form.Item className="role-input-name">
                    {getFieldDecorator("name", {
                      initialValue: this.state.name,
                      rules: [
                        {
                          required: true,
                          message: "Tên quyền không được để trống !",
                        },
                      ],
                    })(<Input placeholder="Nhập tên quyền ..." />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <h4 className="role-title-addRole">Mô tả:</h4>
                  <Form.Item className="role-input-name">
                    {getFieldDecorator("description", {
                      initialValue: this.state.description,
                    })(<Input placeholder="Nhập tên quyền ..." />)}
                  </Form.Item>
                </Col>
              </Row>
              {/* ---- Role --- */}
              {checkbox_array}
              {/* --- End Role ----- */}

              <Row className="btn-component">
                <Form.Item>
                  {!permissions.includes("UPDATE_ADMINROLE") ? null : (
                    <Button htmlType="submit" className="btn-create-new">
                      Lưu lại
                    </Button>
                  )}
                  <Link to="/admin/phan-quyen">
                    <Button className="btn-close">Hoàn tác</Button>
                  </Link>
                </Form.Item>
              </Row>
            </Form>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    role: state.role,
    inforAdmin: state.inforAdmin,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onPermissionById: (id) => {
      dispatch(actRequestPermissionRole(id));
    },
    onUpdateRole: (id, data, history) => {
      dispatch(actRequestUpDateRole(id, data, history));
    },
  };
};

const Edit_Role = Form.create({ name: "normal_login" })(withRouter(EditRole));
export default connect(mapStateToProps, mapDispatchToProps)(Edit_Role);
