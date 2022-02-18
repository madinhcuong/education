import React from "react";
import { Button, Input, Form, Row, Col } from "antd";
import { connect } from "react-redux";
import { actRequestListStudent } from "../../actions/student.action";

class SeachStudent extends React.Component {
  state = {
    name: "",
    email: "",
    seach: true,
  };

  onChangeSeach = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onSeachStudent = (e) => {
    e.preventDefault();

    this.props.onSeach_Student(
      this.state.name,
      this.state.email,
      this.state.seach
    );
  };

  render() {
    return (
      <div>
        <Form
          layout="inline"
          onSubmit={this.onSeachStudent}
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
                  placeholder="Nhập họ và tên ..."
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
                  placeholder="Nhập email ..."
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
    onSeach_Student: (seach_name, seach_email, seach) => {
      dispatch(actRequestListStudent(seach_name, seach_email, seach));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeachStudent);
