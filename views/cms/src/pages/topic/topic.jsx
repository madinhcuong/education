import React from "react";
import { Row, Col, Button } from "antd";
import { connect } from "react-redux";
import Loading from "../loading/loading";
import {
  actRequestCreateTopic,
  actRequestListTopic,
} from "../../actions/topic.action";
import TopicList from "../../components/topics/topicList.component";
import AddNewTopic from "../../components/topics/addNewTopic.component";
import SeachTopic from "../../components/topics/seachTopic.component";

class Topic extends React.Component {
  state = {
    visible: false,
    seach_topic: "",
  };

  componentDidMount() {
    this.props.onListTopic("");
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.onCreateTopic(values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

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
    let { inforAdmin, topics } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    return (
      <div>
        {topics.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_TOPIC") ? null : (
              <div>
                <Row>
                  <Col span={24} className="seach-main-content">
                    <SeachTopic />
                  </Col>
                </Row>
                <Row className="staff-table main-content">
                  <Row className="title-main-content">
                    <Col span={12}>
                      <h2>Chủ đề tin tức</h2>
                    </Col>
                    <Col span={12} className="staff-addStaff">
                      {!permissions.includes("CREATE_ADMIN") ? null : (
                        <Button
                          onClick={this.showModal}
                          className="btn-add-new"
                        >
                          Tạo mới
                        </Button>
                      )}
                      <AddNewTopic
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                      />
                    </Col>
                  </Row>
                  <TopicList
                    topics={topics.topics.length > 0 ? topics.topics : []}
                  />
                </Row>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inforAdmin: state.inforAdmin,
    topics: state.topics,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListTopic: (seach) => {
      dispatch(actRequestListTopic(seach, true));
    },
    onCreateTopic: (body) => {
      dispatch(actRequestCreateTopic(body));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Topic);
