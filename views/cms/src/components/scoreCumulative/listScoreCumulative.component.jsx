import React from "react";
import { Table, Button, Icon, Tag } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ScoreCumulative_Rank } from "../../helpers/base.helper";

class ListScoreCumulative extends React.Component {
  render() {
    let { inforAdmin, listScoreCumulative } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    const columns = [
      {
        title: "STT",
        dataIndex: "STT",
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"],
        render: (text, record) => listScoreCumulative.indexOf(record) + 1,
      },
      {
        title: "Họ và tên",
        dataIndex: "name",
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
        title: "Điểm",
        dataIndex: "id_debit.wallet",
      },
      {
        title: "Xếp hạng",
        render: (text, record) => (
          <Tag color={`${ScoreCumulative_Rank(text.id_debit.level).color}`}>
            {ScoreCumulative_Rank(text.id_debit.level).name}
          </Tag>
        ),
      },
      {
        title: "",
        render: (text, record) => (
          <span>
            {!permissions.includes("READ_SCORE_CUMULATIVE") ? null : (
              <Link to={`/admin/thong-tin-diem-tich-luy/${text._id}`}>
                <Button className="btn-view">
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
          dataSource={listScoreCumulative}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
          }}
          className="news-table"
          scroll={{ x: 650 }}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListScoreCumulative);
