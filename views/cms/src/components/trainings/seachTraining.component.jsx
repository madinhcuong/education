import React from "react";
import { Button, Input, Form, Row, Col } from "antd";
import { connect } from "react-redux";
import { actRequestListTraiNing } from "../../actions/training.action";

class SeachTraining extends React.Component {
  state = {
    name: "",
  };

  onChangeSeach = (event) => {
    let target = event.target;
    this.setState({
      name: target.value,
    });
  };

  onSeachRole = (e) => {
    e.preventDefault();
    this.props.onListTraining(this.state.name);
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
                  placeholder="Tên đào tạo"
                  name=""
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
    onListTraining: (seach) => {
      dispatch(actRequestListTraiNing(seach, false));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeachTraining);
