import React from "react";
import { Table, Button, Icon, Modal } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//import UpdateStatusClassAll from "./updateStatusClassAll.component";
//import { actRequestUpDateStatusClassAll } from "../../actions/class.action";
import { actRequestGetStatisticClassById } from "../../actions/class.action";
import { switch_th, _Status_ClassAll } from "../../helpers/base.helper";

const { confirm } = Modal;
class ListClassAll extends React.Component {
  state = {
    visible: false,
    data_ClassAll: "",
  };

  showModal_UpdateStatus = (data) => {
    this.setState({
      visible: true,
      data_ClassAll: data,
    });
  };

  handleOk_UpdateStatus = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) return err;

      if (this.state.data_ClassAll._id) {
        confirm({
          title: "Bạn có muốn sửa trạng thái không ?",
          content: "",
          okText: "Đồng ý",
          onOk: () => {
            let id = this.state.data_ClassAll
              ? this.state.data_ClassAll._id
              : "";
            let data = { status: values.status };
            this.props.onUpdateStatusCLassAll(id, data);
          },
          cancelText: "Hủy bỏ",
          onCancel() {},
          className: "modal-error",
          okButtonProps: { type: "danger", ghost: true },
          centered: true,
          maskClosable: true,
        });
      }
      this.setState({ visible: false });
      form.resetFields();
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  handleCancel_UpdateStatus = () => {
    const { form } = this.formRef.props;
    form.resetFields();
    this.setState({ visible: false });
  };

  onChange_RowTable = async (id_class) => {
    await this.props.onGetStatisticClassById(id_class, false);
    await window.scrollTo(0, 0);
  };

  render() {
    let { listClassAll, inforAdmin } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";
    let data_Class = listClassAll ? listClassAll.dataClassALL : [];

    const columns = [
      {
        title: "STT",
        dataIndex: "STT",
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"],
        render: (text, record) => data_Class.indexOf(record) + 1,
        width: 80,
      },
      {
        title: "Tên khóa học",
        dataIndex: "id_Courses.name",
      },
      {
        title: "Tên lớp học",
        dataIndex: "name",
      },
      {
        title: "Thời gian",
        width: 175,
        render: (text, record) => (
          <span>
            <div>
              {text.time_day.map((item, key) => {
                return (
                  <span key={key}>
                    {switch_th(item.th)} ({item.hour_start}-{item.hour_end})
                    <br></br>
                  </span>
                );
              })}
            </div>
          </span>
        ),
      },
      {
        title: "Ngày bắt đầu",
        dataIndex: "time_start",
      },

      {
        title: "Ngày kết thúc",
        dataIndex: "time_end",
      },
      {
        title: "Trạng thái",
        render: (text, record) => (
          <span>
            <div>
              <Button
                style={{
                  backgroundColor: _Status_ClassAll(text.status).color,
                  color: "#fff",
                  padding: "1px 7px",
                  height: "auto",
                  fontSize: "12px",
                  minWidth: "65px",
                }}
                // onClick={() => this.showModal_UpdateStatus(text)}
              >
                {_Status_ClassAll(text.status).name}
              </Button>
            </div>
          </span>
        ),
      },
      {
        title: "",
        render: (text, record) => (
          <span>
            {!permissions.includes("READ_CLASSALL") ? null : (
              <Link to={`/admin/xem-thong-tin-lop-hoc/${text._id}`}>
                <Button className="btn-view">
                  <Icon type="eye" />
                </Button>
              </Link>
            )}
            {!permissions.includes("READ_CLASSALL") ? null : (
              <Link to={`/admin/danh-sach-hoc-vien/${text._id}`}>
                <Button className="btn-list-user">
                  <Icon type="usergroup-add" />
                </Button>
              </Link>
            )}
            {!permissions.includes("UPDATE_CLASSALL") ||
            text.status === "CLOSE" ? null : (
              <Link to={`/admin/sap-xep-lich-giang-day/${text._id}`}>
                <Button className="btn-sort">
                  <Icon type="idcard" />
                </Button>
              </Link>
            )}
            {/* {!permissions.includes("UPDATE_CLASSALL") ||
            text.status !== "OPEN" ||
            text.status === "CLOSE" ? null : (
              <Link to={`/admin/sua-thong-tin-lop-hoc/${text._id}`}>
                <Button className="btn-edit">
                  <Icon type="edit" />
                </Button>
              </Link>
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
          dataSource={data_Class.length > 0 ? data_Class : []}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
          }}
          className="news-table news-table-class-pointer"
          scroll={{ x: 700 }}
          onRow={(record) => {
            return {
              onClick: () => {
                this.onChange_RowTable(record._id);
              },
            };
          }}
        />

        {/* <UpdateStatusClassAll
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          handleOk_UpdateStatus={this.handleOk_UpdateStatus}
          handleCancel_UpdateStatus={this.handleCancel_UpdateStatus}
          data_ClassAll={this.state.data_ClassAll}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inforAdmin: state.inforAdmin,
    //  _class: state._class
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    // onUpdateStatusCLassAll: (id, data) => {
    //   dispatch(actRequestUpDateStatusClassAll(id, data));
    // }

    onGetStatisticClassById: (id, loading) => {
      dispatch(actRequestGetStatisticClassById(id, loading));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListClassAll);
