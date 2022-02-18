import React from "react";
import { Button, Input, Form, Row, Col } from "antd";
import { connect } from "react-redux";
import { actRequestListRole } from "../../actions/role.action";

class SeachRole extends React.Component {
  state = {
    seach_role: "",
  };

  onChangeSeach = (event) => {
    let target = event.target;
    this.setState({
      seach_role: target.value,
    });
  };

  onSeachRole = (e) => {
    e.preventDefault();
    this.props.onListRole(this.state.seach_role);
  };
  render() {
    return (
      <div>
        <Form
          layout="inline"
          onSubmit={this.onSeachRole}
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
                  placeholder="Tên bộ quyền"
                  name="seach_role"
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
    onListRole: (seach_name) => {
      dispatch(actRequestListRole(seach_name));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeachRole);
