import React from "react";
import { connect } from "react-redux";
import { Row, Table, Button, Icon } from "antd";

import { actRequestDeleteDayByWeek } from "../../actions/class.action";
import { switch_th } from "../../helpers/base.helper";

class ListDateByWeek extends React.Component {
  onDelete = id => {
    this.props.onDeleteDayByWeek(id);
  };

  render() {
    let { _class } = this.props;
    let time_day = _class.date_time_by_week;

    const columns = [
      {
        title: "STT",
        dataIndex: "STT",
        render: (text, record) => time_day.indexOf(record) + 1
      },
      {
        title: "Thứ",
        dataIndex: "th",
        render: (text, record) => <span>{switch_th(text)}</span>
      },
      {
        title: "Thời gian bắt đầu",
        dataIndex: "hour_start"
      },
      {
        title: "Thời gian kết thúc",
        dataIndex: "hour_end"
      },
      {
        title: "",
        render: (text, record) => (
          <span>
            <Button
              className="btn-delete btn-button"
              onClick={() => this.onDelete(text._id)}
            >
              <Icon type="delete" />
            </Button>
          </span>
        )
      }
    ];

    return (
      <div>
        <Row>
          <Table
            rowKey="_id"
            dataSource={time_day}
            columns={columns}
            pagination={false}
            locale={{ emptyText: "Thêm thời gian lớp học" }}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { _class: state._class };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onDeleteDayByWeek: id => {
      dispatch(actRequestDeleteDayByWeek(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((ListDateByWeek));
