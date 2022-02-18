import React from "react";
import { Table, Button, Icon, Modal } from "antd";
import Moment from "react-moment";
import { connect } from "react-redux";
import {
  actRequestListTopic,
  actRequestDelteTopic,
  actRequestGetByIdTopic,
  actRequestUpDateTopic,
} from "../../actions/topic.action";
import EditTopic from "./editTopic.component";

const { confirm } = Modal;
class TopicList extends React.Component {
  state = {
    visible: false,
    infoEdit: {},
  };

  showEdit = (data) => {
    this.setState({
      infoEdit: data,
      visible: true,
    });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleEdit = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      let id = this.state.infoEdit._id ? this.state.infoEdit._id : "";
      let data = { name_topic: values.name_topic };
      this.props.onUpdate(id, data);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  onDelete = (id) => {
    confirm({
      title: "Bạn có muốn xóa không ?",
      content: "",
      okText: "Xóa",
      onOk: () => {
        this.props.onDeleteTopic(id);
      },
      cancelText: "Hủy bỏ",
      onCancel() {},
      className: "modal-error",
      okButtonProps: { type: "danger", ghost: true },
      centered: true,
      maskClosable: true,
    });
  };

  render() {
    let { topics, inforAdmin } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    const columns = [
      {
        title: "STT",
        dataIndex: "STT",
        render: (text, record) => topics.indexOf(record) + 1,
      },
      {
        title: "ID",
        dataIndex: "_id",
        key: "_id",
      },
      {
        title: "Tên chủ đề",
        dataIndex: "name_topic",
        key: "name_topic",
      },
      {
        title: "Ngày tạo",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (text) => <Moment format="DD/MM/YYYY">{text}</Moment>,
      },
      {
        title: "",
        key: "action",
        render: (text, record) => (
          <span>
            {!permissions.includes("UPDATE_TOPIC") ? null : (
              <Button
                onClick={() => this.showEdit(text)}
                className="topic-btn-edit btn-button"
              >
                <Icon type="edit" />
              </Button>
            )}
          </span>
        ),
      },
    ];
    return (
      <div>
        <Table
          className="topic-table"
          rowKey="_id"
          columns={columns}
          dataSource={topics}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
          }}
        />
        <EditTopic
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onEdit={this.handleEdit}
          infoEdit={this.state.infoEdit}
        ></EditTopic>
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
      dispatch(actRequestListTopic(seach));
    },
    onGetByIdTopic: (id) => {
      dispatch(actRequestGetByIdTopic(id));
    },
    onUpdate: (id, data) => {
      dispatch(actRequestUpDateTopic(id, data));
    },
    onDeleteTopic: (id) => {
      dispatch(actRequestDelteTopic(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicList);
