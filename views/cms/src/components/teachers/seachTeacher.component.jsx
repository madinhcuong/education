import React from "react";
import { Button, Input, Form, Select, Row, Col } from "antd";
import { connect } from "react-redux";
import { actRequestListTeacher } from "../../actions/teacher.action";
const { Option } = Select;

class SeachTeacher extends React.Component {
  state = {
    name: "",
    email: "",
    status: "",
  };

  onChangeSeach = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onSeachTeacher = (e) => {
    e.preventDefault();
    this.props.onSeachTeacher(
      this.state.name,
      this.state.email,
      this.state.status
    );
  };

  onSeachStatus = (value) => {
    this.setState({
      status: value.key,
    });
  };

  render() {
    return (
      <div>
        <Form
          layout="inline"
          onSubmit={this.onSeachTeacher}
          className="trn-seachName"
        >
          <Row>
            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              xl={{ span: 7 }}
            >
              <Form.Item className="trn-seach">
                <Input
                  placeholder="Tên giáo viên"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChangeSeach}
                />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              xl={{ span: 7 }}
            >
              <Form.Item className="trn-seach">
                <Input
                  placeholder="Email giáo viên"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChangeSeach}
                />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              xl={{ span: 5 }}
              style={{ padding: "0px 10px" }}
            >
              <Select
                labelInValue
                defaultValue={{ key: this.state.status }}
                onChange={this.onSeachStatus}
                className="staff-select-seach"
              >
                <Option value="">Tất cả</Option>
                <Option value="ACTIVATE">Hoạt động</Option>
                <Option value="INACTIVE">Bị khóa</Option>
              </Select>
            </Col>
            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              xl={{ span: 5 }}
            >
              <Form.Item>
                <Button htmlType="submit" className="trn-bnt-seach">
                  Tìm kiếm
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSeachTeacher: (seach_name, seach_email, seach_status) => {
      dispatch(
        actRequestListTeacher(seach_name, seach_email, seach_status, false)
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeachTeacher);
