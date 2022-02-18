import React from "react";
import { Button, Input, Form, Select, Row, Col } from "antd";
import { connect } from "react-redux";
import { actRequestListClassAll } from "../../actions/class.action";
const { Option } = Select;

class SeachClass extends React.Component {
  state = {
    name_courses: "",
    name_class: "",
    status_class: "",
  };

  onChangeSeach = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onSeachInforTraining = (e) => {
    e.preventDefault();

    this.props.onSeach_ClassAll(
      this.state.name_courses,
      this.state.name_class,
      this.state.status_class
    );
  };

  onSeachStatus = (value) => {
    this.setState({
      status_class: value.key,
    });
  };

  render() {
    return (
      <div>
        <Form
          layout="inline"
          onSubmit={this.onSeachInforTraining}
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
                  placeholder="Tên khóa học"
                  name="name_courses"
                  value={this.state.name_courses}
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
                  placeholder="Tên lớp học"
                  name="name_class"
                  value={this.state.name_class}
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
                defaultValue={{ key: this.state.status_class }}
                onChange={this.onSeachStatus}
                className="staff-select-seach"
              >
                <Option value="">Tất cả</Option>
                <Option value="OPEN">Đang mở</Option>
                <Option value="STUDYING">Đang học</Option>
                <Option value="CLOSE">Kết thúc</Option>
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
    onSeach_ClassAll: (name_courses, name_class, status_class) => {
      dispatch(
        actRequestListClassAll(name_courses, name_class, status_class, false)
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeachClass);
