import React from "react";
import { Table, Button, Icon } from "antd";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";

class ListRole extends React.Component {
  render() {
    let { ListRole, inforAdmin } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    const columns = [
      {
        title: "STT",
        dataIndex: "STT",
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"],
        render: (text, record) => ListRole.indexOf(record) + 1
      },
      {
        title: "Tên quyền",
        dataIndex: "name"
      },
      {
        title: "Ngày tạo",
        dataIndex: "createdAt",
        render: text => <Moment format="DD/MM/YYYY">{text}</Moment>
      },
      {
        title: "Mô tả",
        dataIndex: "description"
      },
      {
        title: "",
        render: (text, record) => (
          <span>
            <Link to={`/admin/xem-phan-quyen/${text._id}`}>
              <Button className="role-bnt-viewRole btn-button">
                <Icon type="eye" />
              </Button>
            </Link>
          </span>
        )
      }
    ];

    return (
      <div>
        {!permissions.includes("READ_ADMINROLE") ? null : (
          <Table
            rowKey="_id"
            columns={columns}
            dataSource={ListRole}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"]
            }}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    inforAdmin: state.inforAdmin
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListRole);
