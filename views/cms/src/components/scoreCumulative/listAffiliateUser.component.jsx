import React from "react";
import { Table, Button, Icon, Row, Col } from "antd";
import { connect } from "react-redux";
import { switch_sex } from "../../helpers/base.helper";

import SeachListAfff from "./seachListAff.component";

import {
  actRequestGetScoreCumulativeById,
  actRequestGetListAffById,
} from "../../actions/scoreCumulative.action";

class ListAffiliateUser extends React.Component {
  state = {
    type_aff: "F1",
  };

  onInforStudent = (id) => {
    this.props.onInforScoreCumulative(id);
    this.props.onGetListAffById(id, this.state.type_aff, "", "", true);
  };

  render() {
    let { listAff, inforAdmin, onChangeSeach_aff } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    const columns = [
      {
        title: "STT",
        dataIndex: "STT",
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"],
        render: (text, record) => listAff.docs.indexOf(record) + 1,
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
        title: "Giới tính",
        render: (text, record) => <span>{switch_sex(text.sex)}</span>,
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "",
        render: (text, record) => (
          <span>
            {!permissions.includes("READ_SCORE_CUMULATIVE") ? null : (
              <Button
                onClick={() => this.onInforStudent(text._id)}
                className="btn-view"
              >
                <Icon type="eye" />
              </Button>
            )}
          </span>
        ),
      },
    ];
    return (
      <div>
        <Row>
          <Col span={24} style={{ marginTop: "50px" }}>
            <h3>Danh sách người giới thiệu</h3>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <SeachListAfff onChangeSeach_aff={onChangeSeach_aff} />
          </Col>
        </Row>
        <Row>
          <Table
            rowKey="_id"
            columns={columns}
            dataSource={listAff.docs}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
            }}
            className="news-table"
          />
        </Row>
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
    onInforScoreCumulative: (id) => {
      dispatch(actRequestGetScoreCumulativeById(id));
    },

    onGetListAffById: (id_user, type_aff, name, email, loading) => {
      dispatch(
        actRequestGetListAffById(id_user, type_aff, name, email, loading)
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListAffiliateUser);
