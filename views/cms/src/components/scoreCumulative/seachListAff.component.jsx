import React from "react";
import { Button, Input, Form, Select } from "antd";
import { connect } from "react-redux";

class SeachListAfff extends React.Component {
  state = {
    name: "",
    email: "",
    type: "F1",
  };

  onChangeSeach = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value,
    });
  };

  oChange_Type_Aff = (value) => {
    this.setState({
      type: value,
    });
  };

  onSeachInforTraining = (e) => {
    e.preventDefault();
    //console.log(this.state);
    this.props.onChangeSeach_aff(this.state);
  };

  render() {
    const { Option } = Select;

    return (
      <div>
        <Form
          layout="inline"
          onSubmit={this.onSeachInforTraining}
          className="courses-seachName"
        >
          <Form.Item className="courses-seach">
            <Input
              placeholder="Nhập họ và tên ..."
              name="name"
              value={this.state.name}
              onChange={this.onChangeSeach}
            />
          </Form.Item>
          <Form.Item className="courses-seach">
            <Input
              placeholder="Nhập email ..."
              name="email"
              value={this.state.email}
              onChange={this.onChangeSeach}
            />
          </Form.Item>
          <Form.Item>
            <Select
              onChange={this.oChange_Type_Aff}
              defaultValue="F1"
              style={{ width: 110, marginLeft: "10px" }}
            >
              <Option value="F1">F1</Option>
              <Option value="F2">F2</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" className="staff-bnt-seach">
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(SeachListAfff);
