import React from "react";
import { Table, Button, Icon, Switch } from "antd";
import { Link,withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actRequestUpDateStatusStaff } from "../../actions/staff.action";
class ListStaff extends React.Component {
  onUpdateStatus = (id, status) => {
    let data = { status: status === "ACTIVATE" ? "INACTIVE" : "ACTIVATE" };
    this.props.onUpdateSatusStaff(id, data);
  };

  render() {
    let { onListStaff, inforAdmin } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    const columns = [
      {
        title: "STT",
        dataIndex: "STT",
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"],
        render: (text, record) => onListStaff.indexOf(record) + 1,
        width: 90,
      },
      {
        title: "Họ và tên",
        dataIndex: "fullName",
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Ngày sinh",
        dataIndex: "date",
      },
      {
        title: "Email",
        dataIndex: "email",
        width: "20%",
      },
      {
        title: "Quyền",
        dataIndex: "role",
      },
      {
        title: "Khóa hoạt động",
        render: (text, record) => (
          <span>
            <Switch
              checkedChildren="Tắt"
              unCheckedChildren="Bật"
              defaultChecked={text.status === "INACTIVE" ? true : false}
              onClick={() => this.onUpdateStatus(text._id, text.status)}
            />
          </span>
        ),
      },
      {
        title: "",
        render: (text, record) => (
          <span>
            {!permissions.includes("READ_ADMIN") ? null : (
              <Link to={`/admin/thong-tin-nhan-vien/${text._id}`}>
                <Button className="staff-bnt-view btn-button">
                  <Icon type="eye" />
                </Button>
              </Link>
            )}
            {!permissions.includes("UPDATE_ADMIN") ? null : (
              <Button
                onClick={() =>
                  this.props.history.push(`/admin/sua-nhan-vien/${text._id}`)
                }
                className="news-btn-edit btn-button"
              >
                <Icon type="edit" />
              </Button>
              // <Link to={`/admin/sua-nhan-vien/${text._id}`}>
              //   <Button className="news-btn-edit btn-button">
              //     <Icon type="edit" />
              //   </Button>
              // </Link>
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
          dataSource={onListStaff}
          onChange={onChange}
          scroll={{ x: 600 }}
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
    onUpdateSatusStaff: (id, data) => {
      dispatch(actRequestUpDateStatusStaff(id, data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListStaff));
