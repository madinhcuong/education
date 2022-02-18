import React from "react";
import { connect } from "react-redux";
import { Table } from "antd";
import Loading from "../../pages/loading/loading";
import { switch_th } from "../../helpers/base.helper";

class ListScheduleTeacher extends React.Component {
  render() {
    let { _class } = this.props;

    let listClassByIdTeacher =
      _class.listClassByIdTeacher.length > 0 ? _class.listClassByIdTeacher : [];

    const columns = [
      {
        title: "Tên khóa học",
        dataIndex: "id_Courses.name"
      },
      {
        title: "Tên lớp học",
        dataIndex: "name"
      },
      {
        title: "Thời gian",
        render: (text, record) => (
          <span>
            {text.time_day && text.time_day.length > 0 ? (
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
            ) : null}
          </span>
        )
      },
      {
        title: "Ngày bắt đầu",
        dataIndex: "time_start"
      },

      {
        title: "Ngày kết thúc",
        dataIndex: "time_end"
      }
    ];

    return (
      <div>
        {_class.success ? (
          <Loading />
        ) : (
          <div>
            <Table
              rowKey="_id"
              columns={columns}
              dataSource={listClassByIdTeacher}
              pagination={false}
              className="news-table"
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    _class: state._class
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListScheduleTeacher);
