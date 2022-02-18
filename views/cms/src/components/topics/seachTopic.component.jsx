import React from "react";
import {Button, Input, Form, Row, Col } from "antd";
import { connect } from "react-redux";
import { actRequestListTopic } from "../../actions/topic.action";

class SeachTopic extends React.Component {
  state = { seach_topic: "" };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  onChangeSeach = (event) => {
    let target = event.target;
    this.setState({
      seach_topic: target.value,
    });
  };

  onSeachTopic = (e) => {
    e.preventDefault();
    this.props.onListTopic(this.state.seach_topic);
  };

  render() {
    return (
      <div>
        <Col span={24}>
          <Form
            layout="inline"
            onSubmit={this.onSeachTopic}
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
                    placeholder="Nhập tên chủ đề ..."
                    name="seach_topic"
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
        </Col>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inforAdmin: state.inforAdmin,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListTopic: (seach) => {
      dispatch(actRequestListTopic(seach, false));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeachTopic);
