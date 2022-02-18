import React from "react";
import { Table, Button, Icon, Popconfirm, Tag, Modal } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { formatNumber, Payments } from "../../helpers/base.helper";
import Moment from "react-moment";

import PrintInvoiceStudent from "./printInvoiceStudent.component";

import {
  actRequestUpdatePaymentStatusStudent,
  actRequestGetStudentRegisterById,
  actRequestCheckInvoice,
} from "../../actions/studentRegister.action";

class ListStudentRegister extends React.Component {
  // --- modal invoiceStudent
  state = {
    id_register: "",
    visible_PrintInvoiStudent: false,
  };

  setModal_callback = (err, result) => {
    if (result) {
      this.setState({
        visible_PrintInvoiStudent: true,
      });
    }
  };

  showModalPrintInvoiStudent = (id) => {
    this.props.onInforstudentRegister(id, this.setModal_callback);
    this.setState({
      id_register: id,
    });
  };

  printInvoice_callback = (err, result) => {
    if (result) {
      window.print();
    }
  };

  handleOk_PrintInvoiStudent = () => {
    this.props.onCheckInvoice(
      this.state.id_register,
      this.printInvoice_callback
    );
  };

  handleCancel_PrintInvoiStudent = (e) => {
    this.setState({
      visible_PrintInvoiStudent: false,
    });
  };
  // --- end modal invoiceStudent

  _Update_Status = (id, payment_status) => {
    let data = {
      payment_status: payment_status === "PENDING" ? "APPROVED" : "PENDING",
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
        render: (text, record) => listStudent.indexOf(record) + 1,
        width: 60,
      },
      {
        title: "Tên lớp học",
        dataIndex: "id_Class.name",
      },
      {
        title: "Tên học viên",
        dataIndex: "id_student.name",
      },
      {
        title: "Email",
        dataIndex: "id_student.email",
        width: "20%",
      },
      {
        title: "Học phí",
        render: (text, record) => (
          <span>{formatNumber(text.tuition_Fees_discount)} vnđ</span>
        ),
      },
      {
        title: "Hình thức thanh toán",
        render: (text, record) => <span>{Payments(text.payment_method)}</span>,
        width: "10%",
      },
      {
        title: "Ngày đăng ký",
        dataIndex: "createdAt",
        render: (text) => <Moment format="HH:mm-DD/MM/YYYY">{text}</Moment>,
      },
      {
        title: "Đóng tiền",
        render: (text, record) => (
          <span>
            {text.payment_status === "APPROVED" ? (
              <span>
                <Tag
                  color={`${
                    text.payment_status === "PENDING" ? "#d42a2a" : "#41a211"
                  }`}
                >
                  {text.payment_status === "PENDING" ? `Chưa đóng` : `Đã đóng`}
                </Tag>
              </span>
            ) : (
              <Popconfirm
                title={`${
                  text.payment_status === "PENDING" ? "Đã" : "Chưa"
                } đóng tiền ?`}
                onConfirm={() => {
                  this._Update_Status(text._id, text.payment_status);
                }}
                okText="Thay đổi"
                cancelText="Đóng"
              >
                <Tag
                  color={`${
                    text.payment_status === "PENDING" ? "#d42a2a" : "#41a211"
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  {text.payment_status === "PENDING" ? `Chưa đóng` : `Đã đóng`}
                </Tag>
              </Popconfirm>
            )}
          </span>
        ),
      },
      {
        title: "",
        render: (text, record) => (
          <span>
            {!permissions.includes("INVOICE_STUDENT") ||
            text.check_invoice === "EXPORT" ||
            text.payment_status === "PENDING" ? null : (
              <Button
                onClick={() => this.showModalPrintInvoiStudent(text._id)}
                className="news-btn-edit btn-button"
              >
                <Icon type="printer" />
              </Button>
            )}
            {!permissions.includes("READ_STUDENT") ? null : (
              <Link to={`/admin/thong-tin-hoc-vien/${text._id}`}>
                <Button className="btn-view">
                  <Icon type="eye" />
                </Button>
              </Link>
            )}
            {/* {text.payment_status === "APPROVED" ? null : (
              <span>
                {!permissions.includes("UPDATE_STUDENT") ? null : (
                  <Link to={`/admin/hoc-vien/sua-hoc-vien/${text._id}`}>
                    <Button className="btn-edit">
                      <Icon type="edit" />
                    </Button>
                  </Link>
                )}
              </span>
            )} */}
          </span>
        ),
      },
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
            pageSizeOptions: ["10", "20", "30"],
          }}
          className="news-table"
          scroll={{ x: 650 }}
        />

        <Modal
          className="modal-printInvoiceStudent"
          title="Hóa đơn"
          visible={this.state.visible_PrintInvoiStudent}
          style={{ top: 20 }}
          width={800}
          onCancel={this.handleCancel_PrintInvoiStudent}
          footer={[
            <Button
              type="primary"
              ghost
              onClick={this.handleOk_PrintInvoiStudent}
              key="handleOk_PrintInvoiStudent"
            >
              In hóa đơn
            </Button>,
            <Button
              onClick={this.handleCancel_PrintInvoiStudent}
              key="handleCancel_PrintInvoiStudent"
              className="btn-component-close"
            >
              Đóng
            </Button>,
          ]}
        >
          <PrintInvoiceStudent id_student={this.state.id_student} />
        </Modal>
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
    onUpdatePaymentStatusStudent: (id, data) => {
      dispatch(actRequestUpdatePaymentStatusStudent(id, data));
    },

    onInforstudentRegister: (id, callback) => {
      dispatch(actRequestGetStudentRegisterById(id, callback, false));
    },

    onCheckInvoice: (id, callback) => {
      dispatch(actRequestCheckInvoice(id, callback));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListStudentRegister);
