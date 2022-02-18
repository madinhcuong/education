import React from "react";
import { Table, Button, Icon, Tag } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { distribution_student } from "../../helpers/base.helper";

class ListDiploma extends React.Component {

  render() {
    let { listDiploma, inforAdmin, onChange_pagination } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    const columns = [
      {
        title: "STT",
        dataIndex: "STT",
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"],
        render: (text, record) =>
          listDiploma && listDiploma.docs.indexOf(record) + 1,
        width: 90,
      },
      {
        title: "Mã chứng chỉ",
        dataIndex: "diploma_code",
      },
      {
        title: "Khóa học",
        dataIndex: "id_Courses.name",
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
        title: "Điểm trung bình",
        dataIndex: "total_score",
      },
      {
        title: "Xếp loại",
        render: (text, record) => (
          <Tag color={distribution_student(text.total_score).color}>
            {distribution_student(text.total_score).name}
          </Tag>
        ),
        width: "15%",
      },
      {
        title: "",
        render: (text, record) => (
          <span>
            {!permissions.includes("READ_DIPLOMA") ? null : (
              <Link to={`/admin/thong-tin-chung-chi/${text._id}`}>
                <Button className="staff-bnt-view btn-button">
                  <Icon type="eye" />
                </Button>
              </Link>
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
          dataSource={listDiploma && listDiploma.docs}
          scroll={{ x: 600 }}
          onChange={onChange_pagination}
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListDiploma);
