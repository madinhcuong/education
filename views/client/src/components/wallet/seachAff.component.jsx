import React from "react";
import { Button, Input, Form, Row, Col } from "antd";
import { connect } from "react-redux";

class SeachAff extends React.Component {
  state = {
    name: "",
    email: "",
  };

  onChangeSeach = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onSeachAff_component = (e) => {
    e.preventDefault();
    this.props.onSeachAff(this.state);
  };

  render() {
    return (
      <div>
        <Form
          layout="inline"
          onSubmit={this.onSeachAff_component}
          className="seach-aff"
        >
          <Row>
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 7, offset: 0 }}
              md={{ span: 7, offset: 0 }}
              lg={{ span: 7, offset: 0 }}
              xl={{ span: 7, offset: 0 }}
            >
              <Form.Item className="seach-aff-name">
                <Input
                  placeholder="Nhập họ và tên ..."
                  name="name"
                  value={this.state.name}
                  onChange={this.onChangeSeach}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 7, offset: 0 }}
              md={{ span: 7, offset: 0 }}
              lg={{ span: 7, offset: 0 }}
              xl={{ span: 7, offset: 0 }}
            >
              <Form.Item className="seach-aff-email">
                <Input
                  placeholder="Nhập email ..."
                  name="email"
                  value={this.state.email}
                  onChange={this.onChangeSeach}
                />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 10, offset: 0 }}
              md={{ span: 10, offset: 0 }}
              lg={{ span: 10, offset: 0 }}
              xl={{ span: 10, offset: 0 }}
            >
              <Form.Item className="seach-aff-bnt">
                <Button htmlType="submit" className="changeScore-btn-1000">
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SeachAff);
