import React from "react";
import { Table, Button, Icon } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Modal } from "antd";
import { actRequestDelteNews } from "../../actions/news.action";

const { confirm } = Modal;
class ListNews extends React.Component {
  onDelete = (id) => {
    confirm({
      title: "Bạn có muốn xóa không ?",
      content: "",
      okText: "Xóa",
      onOk: () => {
        this.props.onDeleteNews(id);
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
    let { listNews, inforAdmin } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    const columns = [
      {
        title: "STT",
        dataIndex: "STT",
        sorter: (a, b) => a.name_news.length - b.name_news.length,
        sortDirections: ["descend", "ascend"],
        render: (text, record) => listNews.indexOf(record) + 1,
      },
      {
        title: "Tiêu đề",
        dataIndex: "name_news",
        sorter: (a, b) => a.name_news.length - b.name_news.length,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Chủ đề",
        dataIndex: "topic.name_topic",
      },
      {
        title: "Ngày đăng",
        dataIndex: "createdAt",
        render: (text) => <Moment format="HH:mm-DD/MM/YYYY">{text}</Moment>,
      },
      {
        title: "Ngày cập nhật",
        dataIndex: "updatedAt",
        render: (text) => <Moment format="HH:mm-DD/MM/YYYY">{text}</Moment>,
      },
      {
        title: "",
        render: (text, record) => (
          <span>
            {!permissions.includes("READ_NEWS") ? null : (
              <Link to={`/admin/tin-tuc/xem-noi-dung-tin-tuc/${text._id}`}>
                <Button className="role-bnt-viewRole btn-button">
                  <Icon type="eye" />
                </Button>
              </Link>
            )}
            {!permissions.includes("UPDATE_NEWS") ? null : (
              <Link to={`/admin/tin-tuc/sua-noi-dung-tin-tuc/${text._id}`}>
                <Button className="news-btn-edit btn-button">
                  <Icon type="edit" />
                </Button>
              </Link>
            )}
            {!permissions.includes("DELETE_NEWS") ? null : (
              <Button
                className="topic-btn-delete btn-button"
                onClick={() => this.onDelete(text._id)}
              >
                <Icon type="delete" className="topic-delete-item" />
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
          dataSource={listNews}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
          }}
          className="news-table"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { inforAdmin: state.inforAdmin };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onDeleteNews: (id) => {
      dispatch(actRequestDelteNews(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListNews);
