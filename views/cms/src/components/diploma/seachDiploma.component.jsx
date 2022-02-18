import React from "react";
import { Button, Input, Form, Row, Col } from "antd";
import { connect } from "react-redux";
import { actRequestListDiploma } from "../../actions/diploma.action";

class SeachDiploma extends React.Component {
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

  onSeachListDiploma = (e) => {
    e.preventDefault();
    this.props.onSeachListDiploma(this.state.name, this.state.email);
  };

  render() {
    return (
      <div>
        <Form
          layout="inline"
          onSubmit={this.onSeachListDiploma}
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
                  placeholder="Họ và tên"
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
                  placeholder="Email"
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
    onSeachListDiploma: (seach_name, seach_email) => {
      dispatch(actRequestListDiploma(seach_name, seach_email));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeachDiploma);
