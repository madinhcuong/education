import React from "react";
import { Table, Button, Icon, Modal, Tag, Descriptions } from "antd";
import { connect } from "react-redux";
import Moment from "react-moment";
import { formatNumber } from "../../helpers/base.helper";

import {
  actRequestUpDatePay,
  actRequestGetPayById,
} from "../../actions/pay.action";
const { confirm } = Modal;

class ListPay extends React.Component {
  state = { visible: false };

  Update_Status = (id) => {
    return confirm({
      title: "Thanh toán tiền cho học viên ?",
      content: "",
      okText: "Thanh toán",
      onOk: () => {
        this.props.onUpDatePay(id);
      },
      cancelText: "Hủy bỏ",
      onCancel() {},
      className: "modal-error",
      okButtonProps: { type: "danger", ghost: true },
      centered: true,
      maskClosable: true,
    });
  };

  callback_model = (data) => {
    if (data) {
      this.setState({
        visible: true,
      });
    }
  };

  showModal = (id) => {
    this.props.onGetPayById(id, this.callback_model);
  };

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    let { pay, listPay, inforAdmin, onChange_pagination } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    const columns = [
      {
        title: "STT",
        dataIndex: "STT",
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"],
        render: (text, record) => listPay && listPay.docs.indexOf(record) + 1,
        width: 90,
      },
      {
        title: "Họ và tên",
        dataIndex: "id_student.name",
      },
      {
        title: "Email",
        dataIndex: "id_student.email",
        width: "20%",
      },
      {
        title: "Số tiền",
        render: (text, record) => <span>{formatNumber(text.money)} vnđ</span>,
      },
      {
        title: "Trạng thái",
        render: (text) => (
          <span>
            <Tag color={`${text.status === "PENDING" ? "#d42a2a" : "#41a211"}`}>
              {text.status === "PENDING" ? `Chưa thanh toán` : `Đã thanh toán`}
            </Tag>
          </span>
        ),
        width: "15%",
      },
      {
        title: "Ngày yêu cầu",
        render: (text) => (
          <Moment format="HH:mm:ss-DD/MM/YYYY">{text.createdAt}</Moment>
        ),
      },
      {
        title: "Ngày thanh toán",
        render: (text) => (
          <span>
            {text.status === "PENDING" ? (
              "- - -"
            ) : (
              <Moment format="HH:mm:ss-DD/MM/YYYY">{text.updatedAt}</Moment>
            )}
          </span>
        ),
      },
      {
        title: "",
        render: (text, record) => (
          <span>
            <Button
              onClick={() => this.showModal(text._id)}
              className="staff-bnt-view btn-button"
            >
              <Icon type="eye" />
            </Button>
            {!permissions.includes("UPDATE_PAY") ||
            text.status === "APPROVED" ? null : (
              <Button
                onClick={() => this.Update_Status(text._id)}
                className="news-btn-edit btn-button"
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
          rowKey="_id"
          columns={columns}
          dataSource={listPay && listPay.docs}
          scroll={{ x: 790 }}
          onChange={onChange_pagination}
        />

        {/* view pay */}
        <Modal
          title="Thông tin"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText="Đóng"
          okButtonProps={{ style: { display: "none" } }}
          width="55%"
        >
          <Descriptions title="">
            <Descriptions.Item label="Họ và tên">
              {pay.getPayById && pay.getPayById.id_student
                ? pay.getPayById.id_student.name
                : null}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày sinh">
              {pay.getPayById && pay.getPayById.id_student
                ? pay.getPayById.id_student.date
                : null}
            </Descriptions.Item>
            <Descriptions.Item label="Giới tính">
              {pay.getPayById && pay.getPayById.id_student
                ? pay.getPayById.id_student.sex
                : null}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {pay.getPayById && pay.getPayById.id_student
                ? pay.getPayById.id_student.email
                : null}
            </Descriptions.Item>
            <Descriptions.Item label="Số điên thoại">
              {pay.getPayById && pay.getPayById.id_student
                ? pay.getPayById.id_student.phone
                : null}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {pay.getPayById && pay.getPayById.status === "PENDING"
                ? "Chưa thanh toán"
                : "Đã thanh toán"}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày yêu cầu">
              {pay.getPayById.createdAt ? (
                <Moment format="HH:mm:ss-DD/MM/YYYY">
                  {pay.getPayById.createdAt}
                </Moment>
              ) : null}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày thanh toán">
              {pay.getPayById.updatedAt ? (
                <Moment format="HH:mm:ss-DD/MM/YYYY">
                  {pay.getPayById.updatedAt}
                </Moment>
              ) : null}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">
              {pay.getPayById && pay.getPayById.id_student
                ? pay.getPayById.id_student.address
                : null}
            </Descriptions.Item>
            <Descriptions.Item label="Mô tả">
              {pay.getPayById.description ? pay.getPayById.description : null}
            </Descriptions.Item>
          </Descriptions>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pay: state.pay,
    inforAdmin: state.inforAdmin,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onUpDatePay: (id) => {
      dispatch(actRequestUpDatePay(id));
    },

    // get Pay By id
    onGetPayById: (id_pay, callback) => {
      dispatch(actRequestGetPayById(id_pay, callback));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPay);
