import React from "react";
import { Table, Button, Icon, Switch } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actRequestUpDateStatusTeacher } from "../../actions/teacher.action";
class ListTeacher extends React.Component {
  state = {
    defaultChecked: false
  };

  onUpdateStatus = (id, status, text) => {
    let data = { status: status === "ACTIVATE" ? "INACTIVE" : "ACTIVATE" };
    this.props.onUpdateSatusTeacher(id, data);
  };

  render() {
    let { onListTeacher, inforAdmin } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    const columns = [
      {
        title: "STT",
        dataIndex: "STT",
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"],
        render: (text, record) => onListTeacher.indexOf(record) + 1,
        width: 90,
      },
      {
        title: "Họ và tên",
        dataIndex: "fullName",
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "Email",
        dataIndex: "email",
        width: "20%",
      },
      {
        title: "Chuyên nghành",
        dataIndex: "specialize"
      },
      {
        title: "Quyền",
        dataIndex: "role"
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
            {/* <Switch
              defaultChecked={text.status === "INACTIVE" ? true : false}
              size="small"
              onClick={() => this.onUpdateStatus(text._id, text.status, text)}
            /> */}
          </span>
        )
      },
      {
        title: "",
        render: (text, record) => (
          <span>
            {!permissions.includes("READ_TEACHER") ? null : (
              <Link to={`/admin/thong-tin-giao-vien/${text._id}`}>
                <Button className="staff-bnt-view btn-button">
                  <Icon type="eye" />
                </Button>
              </Link>
            )}
            {!permissions.includes("UPDATE_TEACHER") ? null : (
              <Link to={`/admin/sua-giao-vien/${text._id}`}>
                <Button className="news-btn-edit btn-button">
                  <Icon type="edit" />
                </Button>
              </Link>
            )}
          </span>
        )
      }
    ];

    function onChange(pagination, filters, sorter, extra) {}
    return (
      <div>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={onListTeacher}
          onChange={onChange}
          scroll={{ x: 600 }}
        />
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
  return {
    onUpdateSatusTeacher: (id, data) => {
      dispatch(actRequestUpDateStatusTeacher(id, data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTeacher);
