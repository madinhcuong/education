import React from "react";
import { Table, Button, Icon } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
class ListInforTraining extends React.Component {
  render() {
    let { listInforTraining, inforAdmin } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";
    let data_inforTraining = listInforTraining ? listInforTraining.data : [];

    const columns = [
      {
        title: "STT",
        dataIndex: "STT",
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"],
        render: (text, record) => data_inforTraining.indexOf(record) + 1
      },
      {
        title: "Tên đào tạo",
        dataIndex: "training.name",
        sorter: (a, b) => a.training.name.length - b.training.name.length,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "Tên thông tin khóa học",
        dataIndex: "name"
      },
      {
        title: "Ngày tạo mới",
        dataIndex: "createdAt",
        render: text => <Moment format="HH:mm-DD/MM/YYYY">{text}</Moment>
      },
      {
        title: "Ngày cập nhật",
        dataIndex: "updatedAt",
        render: text => <Moment format="HH:mm-DD/MM/YYYY">{text}</Moment>
      },
      {
        title: "",
        render: (text, record) => (
          <span>
            {!permissions.includes("READ_INFORTRAINING") ? null : (
              <Link to={`/admin/xem-thong-tin-khoa-hoc/${text._id}`}>
                <Button className="role-bnt-viewRole btn-button">
                  <Icon type="eye" />
                </Button>
              </Link>
            )}
            {!permissions.includes("UPDATE_INFORTRAINING") ? null : (
              <Link to={`/admin/sua-thong-tin-khoa-hoc/${text._id}`}>
                <Button className="news-btn-edit btn-button">
                  <Icon type="edit" />
                </Button>
              </Link>
            )}
          </span>
        )
      }
    ];
    return (
      <div>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={data_inforTraining}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"]
          }}
          className="news-table"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { inforAdmin: state.inforAdmin };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListInforTraining);
