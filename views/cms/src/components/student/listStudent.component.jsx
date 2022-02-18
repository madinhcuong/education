import React from "react";
import { Table, Button, Icon } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actRequestUpdatePaymentStatusStudent } from "../../actions/studentRegister.action";
import { switch_sex } from "../../helpers/base.helper";

class ListStudent extends React.Component {
  _Update_Status = (id, payment_status) => {
    let data = {
      payment_status: payment_status === "PENDING" ? "APPROVED" : "PENDING"
    };
    this.props.onUpdatePaymentStatusStudent(id, data);
  };

  render() {
    let { inforAdmin, listStudent } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    const columns = [
      {
        title: "STT",
        dataIndex: "STT",
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"],
        render: (text, record) => listStudent.indexOf(record) + 1,
      },
      {
        title: "Tên học viên",
        dataIndex: "name"
      },
      {
        title: "Ngày sinh",
        dataIndex: "date"
      },
      {
        title: "Giới tính",
        render: (text, record) => (
          <span>{switch_sex(text.sex )}</span>
        )
      },
      {
        title: "Email",
        dataIndex: "email",
        width: "20%",
      },
      {
        title: "Số điện thoại",
        dataIndex: "phone"
      },

      {
        title: "",
        render: (text, record) => (
          <span>
            {!permissions.includes("READ_STUDENT") ? null : (
              <Link to={`/admin/xem-thong-tin-hoc-vien/${text._id}`}>
                <Button className="btn-view">
                  <Icon type="eye" />
                </Button>
              </Link>
            )}
            {!permissions.includes("UPDATE_STUDENT") ? null : (
              <Link to={`/admin/sua-thong-tin-hoc-vien/${text._id}`}>
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
          dataSource={listStudent}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"]
          }}
          className="news-table"
          scroll={{ x: 650 }}
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
    onUpdatePaymentStatusStudent: (id, data) => {
      dispatch(actRequestUpdatePaymentStatusStudent(id, data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListStudent);
