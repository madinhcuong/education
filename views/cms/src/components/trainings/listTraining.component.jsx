import React from "react";
import { Table, Button, Icon, Switch } from "antd";
import { connect } from "react-redux";
import Moment from "react-moment";
import {
  actRequestUpDateTraining,
  actRequestUpDateStatusTraining,
} from "../../actions/training.action";
import EditTraining from "./editTraining.component";
import Upload_Image from "../../utils/upload_Image";

class ListTraining extends React.Component {
  state = {
    visible: false,
    dataEdit: {},
    imageUrl: "",
  };

  onEdit = (data) => {
    this.setState({
      visible: true,
      dataEdit: data,
      imageUrl: "",
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  //--- upload image
  _onChange_image = (event) => {
    event.persist();

    let target = event.target.files[0];
    const formData = new FormData();
    formData.append("file", target);

    //-- resize image main news
    formData.append("width", 512);
    formData.append("height", 512);

    Upload_Image("cms/api/upload-image", formData).then((res) => {
      if (res.data && res.status === 200) {
        this.setState({
          imageUrl: URL.createObjectURL(target),
          image: res.data,
        });
      }
    });
  };

  handleUpdate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      let id = this.state.dataEdit ? this.state.dataEdit._id : "";
      let data = { name: values.name, image: this.state.image };
      this.props.onEditTraining(id, data);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  //--- Update Status
  onUpdateStatus = (id, status, text) => {
    let data = { status: status === "ACTIVATE" ? "INACTIVE" : "ACTIVATE" };
    this.props.onUpDateStatusTraining(id, data);
  };

  render() {
    let { onListTraing, inforAdmin } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    const columns = [
      {
        title: "STT",
        dataIndex: "STT",
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"],
        render: (text, record) => onListTraing.indexOf(record) + 1,
      },
      {
        title: "Tên đào tạo",
        dataIndex: "name",
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Khóa hoạt động",
        render: (text, record) => (
          <span>
            <Switch
              checkedChildren="Tắt"
              unCheckedChildren="Bật"
              defaultChecked={text.status === "INACTIVE" ? true : false}
              onClick={() => this.onUpdateStatus(text._id, text.status, text)}
            />
          </span>
        ),
      },
      {
        title: "Ngày tạo",
        dataIndex: "createdAt",
        render: (text) => <Moment format="DD/MM/YYYY">{text}</Moment>,
      },
      {
        render: (text, record) => (
          <span>
            {!permissions.includes("UPDATE_TRAINING") ? null : (
              <Button
                onClick={() => this.onEdit(text)}
                className="staff-bnt-view btn-button"
              >
                <Icon type="eye" />
              </Button>
            )}
          </span>
        ),
      },
    ];

    function onChange(pagination, filters, sorter, extra) {}
    return (
      <div>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={onListTraing}
          onChange={onChange}
        />
        <EditTraining
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onUpdate={this.handleUpdate}
          onEdit={this.state.dataEdit}
          _onChange_image={this._onChange_image}
          imageUrl={this.state.imageUrl}
        />
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
    onEditTraining: (id, data) => {
      dispatch(actRequestUpDateTraining(id, data));
    },
    onUpDateStatusTraining: (id, data) => {
      dispatch(actRequestUpDateStatusTraining(id, data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTraining);
