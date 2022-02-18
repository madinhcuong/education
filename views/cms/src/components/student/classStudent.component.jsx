import React from "react";
import { Table, Button, Tag } from "antd";
import { connect } from "react-redux";
import { switch_th, _Status_ClassAll } from "../../helpers/base.helper";

class ClassStudent extends React.Component {
  render() {
    let { classStudentById } = this.props;

    const columns = [
      {
        title: "STT",
        dataIndex: "STT",
        render: (text, record) => classStudentById.indexOf(record) + 1
      },
      {
        title: "Tên lớp học",
        dataIndex: "id_Class.name"
      },
      {
        title: "Thời gian",
        render: (text, record) => (
          <span>
            <div>
              {text.id_Class.time_day.map((item, key) => {
                return (
                  <span key={key}>
                    {switch_th(item.th)} ({item.hour_start}-{item.hour_end})
                    <br></br>
                  </span>
                );
              })}
            </div>
          </span>
        )
      },
      {
        title: "Ngày bắt đầu",
        dataIndex: "id_Class.time_start"
      },
      {
        title: "Ngày kết thúc",
        dataIndex: "id_Class.time_end"
      },
      {
        title: "Trạng thái",
        render: (text, record) => (
          <span>
            <div>
              <Button
                style={{
                  backgroundColor: _Status_ClassAll(text.id_Class.status).color,
                  color: "#fff",
                  padding: "1px 7px",
                  height: "auto",
                  fontSize: "12px",
                  minWidth: "65px"
                }}
              >
                {_Status_ClassAll(text.id_Class.status).name}
              </Button>
            </div>
          </span>
        )
      },
      {
        title: "Đóng tiền",
        render: (text, record) => (
          <span>
            <Tag
              color={`${
                text.payment_status === "PENDING" ? "#d42a2a" : "#41a211"
              }`}
            >
              {text.payment_status === "PENDING" ? `Chưa đóng` : `Đã đóng`}
            </Tag>
          </span>
        )
      }
    ];
    return (
      <div>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={classStudentById}
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
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassStudent);
