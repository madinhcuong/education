import React from "react";
import { Table, Button, Icon, Modal } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { truncate } from "../../helpers/base.helper";
import { actRequestDeletePerceptions } from "../../actions/perceptions";

const { confirm } = Modal;

class ListPerceptions extends React.Component {
  onDelete = (id) => {
    confirm({
      title: "Bạn có muốn xóa không ?",
      content: "",
      okText: "Xóa",
      onOk: () => {
        this.props.onDeletePerceptions(id);
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
    let { dataPerceptions } = this.props;

    const columns = [
      {
        title: "STT",
        dataIndex: "STT",
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"],
        render: (text, record) =>
          dataPerceptions && dataPerceptions.docs.indexOf(record) + 1,
        width: 90,
      },
      {
        title: "Họ và tên",
        dataIndex: "name",
      },
      {
        title: "Mô tả",
        dataIndex: "description",
        render: (text, record) => truncate(text, 50),
      },
      {
        title: "",
        render: (text, record) => (
          <span>
            <Link to={`/admin/thong-tin-cam-nhan-hoc-vien/${text._id}`}>
              <Button className="role-bnt-viewRole btn-button">
                <Icon type="eye" />
              </Button>
            </Link>

            <Link to={`/admin/sua-cam-nhan-hoc-vien/${text._id}`}>
              <Button className="news-btn-edit btn-button">
                <Icon type="edit" />
              </Button>
            </Link>

            <Button
              className="topic-btn-delete btn-button"
              onClick={() => this.onDelete(text._id)}
            >
              <Icon type="delete" className="topic-delete-item" />
            </Button>
          </span>
        ),
      },
    ];

    return (
      <div>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={dataPerceptions && dataPerceptions.docs}
          scroll={{ x: 790 }}
          // onChange={onChange_pagination}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onDeletePerceptions: (id) => {
      dispatch(actRequestDeletePerceptions(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPerceptions);
