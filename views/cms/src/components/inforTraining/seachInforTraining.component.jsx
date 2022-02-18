import React from "react";
import { Button, Input, Form, Row, Col } from "antd";
import { connect } from "react-redux";
import { actRequestListInforTraining } from "../../actions/inforTraining";
class SeachInforTraining extends React.Component {
  state = {
    name_inforTraining: "",
    name_training: "",
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

    this.props.onSeach_Infor_Training(
      this.state.name_inforTraining,
      this.state.name_training
    );
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
                  name="name_training"
                  value={this.state.name_training}
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
                  placeholder="Tên thông tin khóa học"
                  name="name_inforTraining"
                  value={this.state.name_inforTraining}
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
    onSeach_Infor_Training: (name_inforTraining, name_training) => {
      dispatch(
        actRequestListInforTraining(name_inforTraining, name_training, false)
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeachInforTraining);
