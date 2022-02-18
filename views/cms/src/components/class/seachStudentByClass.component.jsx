import React from "react";
import { Button, Input, Form } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { actRequestListStudentByIdClass } from "../../actions/class.action";

class SeachStudentByClass extends React.Component {
  state = {
    name_student: ""
  };

  onChangeSeach = event => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value
    });
  };

  onSeachInforTraining = e => {
    e.preventDefault();
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onSeach_StudentByIdClass(id, this.state.name_student);
    }
  };

  onSeachStatus = value => {
    this.setState({
      status_class: value.key
    });
  };

  render() {
    return (
      <div>
        <Form
          layout="inline"
          onSubmit={this.onSeachInforTraining}
          className="courses-seachName"
        >
          <Form.Item className="courses-seach">
            <Input
              placeholder="Nhập họ tên học viên ..."
              name="name_student"
              value={this.state.name_student}
              onChange={this.onChangeSeach}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" className="btn-seach">
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSeach_StudentByIdClass: (id, name_student) => {
      dispatch(actRequestListStudentByIdClass(id, name_student, false));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SeachStudentByClass));
