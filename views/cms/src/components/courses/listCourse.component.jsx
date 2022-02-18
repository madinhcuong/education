import React from "react";
import { Table, Button, Icon, Popconfirm, Tag } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { formatNumber } from "../../helpers/base.helper";
import { actRequestUpDateStatusCourses } from "../../actions/courses.action";
class ListCourses extends React.Component {
  _Update_Status = (id, status) => {
    let data = { status: status === "OPEN" ? "CLOSE" : "OPEN" };
    this.props.onUpdateStatusCourses(id, data);
  };

  render() {
    let { listCourse, inforAdmin } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";
    let data_Courses = listCourse ? listCourse.data : [];

    const columns = [
      {
        title: "STT",
        dataIndex: "STT",
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"],
        render: (text, record) => data_Courses.indexOf(record) + 1
      },
      {
        title: "Tên đào tạo",
        dataIndex: "id_training.name",
        sorter: (a, b) => a.id_training.name.length - b.id_training.name.length,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "Tên khóa học",
        dataIndex: "name"
      },
      {
        title: "Học phí",
        render: (text, record) => <span>{formatNumber(text.tuition_Fees)} vnđ</span>
      },
      {
        title: "Địa điểm",
        dataIndex: "location"
      },
      {
        title: "Trạng thái",
        render: (text, record) => (
          <span>
            <Popconfirm
              title={`${text.status === "OPEN" ? "Đóng" : "Mở"} khóa học`}
              onConfirm={() => {
                this._Update_Status(text._id, text.status);
              }}
              okText="Thay đổi"
              cancelText="Đóng"
            >
              <Tag
                color={`${text.status === "OPEN" ? "#41a211" : "#d42a2a"}`}
                style={{ cursor: "pointer" }}
              >
                {text.status === "OPEN" ? `Đang mở` : `Đã đóng`}
              </Tag>
            </Popconfirm>
          </span>
        )
      },
      {
        title: "",
        render: (text, record) => (
          <span>
            {!permissions.includes("READ_COURSES") ? null : (
              <Link to={`/admin/xem-khoa-hoc/${text._id}`}>
                <Button className="courses-bnt-viewRole btn-button">
                  <Icon type="eye" />
                </Button>
              </Link>
            )}
            {!permissions.includes("UPDATE_COURSES") ? null : (
              <Link to={`/admin/sua-khoa-hoc/${text._id}`}>
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
          dataSource={data_Courses}
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
  return {
    inforAdmin: state.inforAdmin,
    courses: state.courses
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onUpdateStatusCourses: (id, data) => {
      dispatch(actRequestUpDateStatusCourses(id, data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCourses);
