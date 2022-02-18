import React from "react";
import { Button, Input, Form, Select, Row, Col } from "antd";
import { connect } from "react-redux";
import { actRequestListStaff } from "../../actions/staff.action";
const { Option } = Select;

class SeachStaff extends React.Component {
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

  onSeachStaff = (e) => {
    e.preventDefault();
    this.props.onSeachStaff(
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
          onSubmit={this.onSeachStaff}
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
                  placeholder="Tên nhân viên"
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
                  placeholder="Email nhân viên"
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
    onSeachStaff: (seach_name, seach_email, seach_status) => {
      dispatch(actRequestListStaff(seach_name, seach_email, seach_status));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeachStaff);
