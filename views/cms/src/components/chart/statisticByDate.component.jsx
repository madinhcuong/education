import React from "react";
import { connect } from "react-redux";
import { Row, Col, Table, Button, Select, Icon } from "antd";
import moment from "moment";
import Moment from "react-moment";
import { DatePicker } from "antd";
import { formatNumber } from "../../helpers/base.helper";
import * as url from "../../utils/url_api";
import {
  actRequestGetStatisticByDate,
  ResetStatistic,
} from "../../actions/statistic.action";

class StatisticByDate extends React.Component {
  state = {
    timeStart: "",
    timeEnd: "",
    total_seach: "REVENUE",
  };

  onChangeDate = (value, dateString) => {
    let timeStart = moment(dateString[0], "DD/MM/YYYY").format("YYYY-MM-DD");
    let timeEnd = moment(dateString[1], "DD/MM/YYYY").format("YYYY-MM-DD");
    this.setState({
      timeStart: timeStart,
      timeEnd: timeEnd,
    });
  };

  seach_ByDate = () => {
    if (
      this.state.timeStart &&
      this.state.timeStart !== "Invalid date" &&
      this.state.timeEnd &&
      this.state.timeEnd !== "Invalid date" &&
      this.state.total_seach
    ) {
      this.props.onGetStatisticByDate(
        this.state.timeStart,
        this.state.timeEnd,
        this.state.total_seach,
        false
      );
    }
  };

  handleChange_Total_Seach = (value) => {
    this.props.onResetStatistic();
    this.setState({
      total_seach: value,
    });
  };

  render() {
    const { Option } = Select;
    const { RangePicker } = DatePicker;
    let { statisticByDate, inforAdmin } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    // Can not select days before today and today
    function disabledDate(current) {
      return current && current >= moment().endOf("day");
    }

    const columns = [
      {
        title: "STT",
        dataIndex: "STT",
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend", "ascend"],
        render: (text, record) =>
          statisticByDate.data_total.indexOf(record) + 1,
          width: "10%",
      },
      {
        title: "Tên học viên",
        dataIndex: "id_student.name",
      },
      {
        title: "Lớp học",
        dataIndex: "id_Class.name",
      },
      {
        title: "Học phí",
        render: (text, record) => (
          <span>
            {text.tuition_Fees ? formatNumber(text.tuition_Fees) : 0} vnđ
          </span>
        ),
      },
      {
        title: "Giảm giá",
        render: (text, record) => <span>{text.sale_percent}%</span>,
      },
      {
        title: "Tổng tiền",
        render: (text, record) => (
          <span>
            {text.tuition_Fees_discount
              ? formatNumber(text.tuition_Fees_discount)
              : null}{" "}
            vnđ
          </span>
        ),
      },
      {
        title: "Ngày thanh toán",
        render: (text) => (
          <span>
            <Moment format="HH:mm-DD/MM/YYYY">{text.payment_date}</Moment>
          </span>
        ),
      },
    ];

    const columns_cost = [
      {
        title: "Tên học viên",
        dataIndex: "id_student.name",
      },
      {
        title: "Ngày sinh",
        dataIndex: "id_student.date",
      },
      {
        title: "Email",
        dataIndex: "id_student.email",
        width: "20%",
      },
      {
        title: "Loại hình",
        render: (text, record) => <span>{"Thanh toán tiền"}</span>,
      },
      {
        title: "Tổng tiền",
        render: (text, record) => (
          <span>{text.money ? formatNumber(text.money) : null} vnđ</span>
        ),
      },
      {
        title: "Ngày thanh toán",
        render: (text) => (
          <span>
            <Moment format="HH:mm-DD/MM/YYYY">{text.updatedAt}</Moment>
          </span>
        ),
      },
    ];

    const columns_sumScore = [
      {
        title: "Tên học viên",
        dataIndex: "id_student.name",
      },
      {
        title: "Ngày sinh",
        dataIndex: "id_student.date",
      },
      {
        title: "Email",
        dataIndex: "id_student.email",
        width: "20%",
      },
      {
        title: "Loại hình",
        render: (text, record) => (
          <span>
            {text.type === "PAY_MONEY" ? "Thanh toán tiền" : "Hoa hồng"}
          </span>
        ),
      },
      {
        title: "Tổng tiền",
        render: (text, record) => (
          <span>{text.money ? formatNumber(text.money) : null} vnđ</span>
        ),
      },
      {
        title: "Ngày cộng",
        render: (text) => (
          <span>
            <Moment format="HH:mm-DD/MM/YYYY">{text.createdAt}</Moment>
          </span>
        ),
      },
    ];

    const switch_StatisticBydate = (param) => {
      switch (param) {
        case "REVENUE":
          return { name: "doanh thu", table: columns };
        case "SUM_SCORE":
          return { name: "hoa hồng", table: columns_sumScore };
        case "COST":
          return { name: "chi tiêu", table: columns_cost };
        default:
          return null;
      }
    };

    return (
      <div className="main-content">
        <Row >
          <Col span={24} className="chart-name">
            <h3>Chi tiết doanh thu và chi tiêu</h3>
            <div className="thanh"></div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <h5>Tìm kiếm</h5>
            <RangePicker
              onChange={this.onChangeDate}
              disabledDate={disabledDate}
              format="DD/MM/YYYY"
            />
            <Select
              onChange={this.handleChange_Total_Seach}
              defaultValue="REVENUE"
              style={{ width: 110, marginLeft: "10px" }}
            >
              <Option value="REVENUE">Doanh thu</Option>
              <Option value="COST">Chi tiêu</Option>
              <Option value="SUM_SCORE">Hoa hồng</Option>
            </Select>
            <Button
              onClick={this.seach_ByDate}
              className="staff-bnt-seach"
              style={{ margin: "10px" }}
            >
              Tìm kiếm
            </Button>

            {!permissions.includes("EXPORT_STATISTIC") ? null : (
              <a
                href={`${url.api_url}/cms/api/export-excel-statistic-by-date?timeStart=${this.state.timeStart}&timeEnd=${this.state.timeEnd}&total_seach=${this.state.total_seach}`}
                download
              >
                <Button
                  className="btn-export btn-export-statistical"
                  disabled={
                    !this.state.timeStart && !this.state.timeEnd ? true : false
                  }
                >
                  <Icon type="export" />
                  Xuất báo cáo
                </Button>
              </a>
            )}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="chart-yearTotals">
              Tổng {switch_StatisticBydate(this.state.total_seach).name}:{" "}
              {statisticByDate.total_money
                ? formatNumber(statisticByDate.total_money)
                : 0}{" "}
              vnđ
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              rowKey="_id"
              columns={switch_StatisticBydate(this.state.total_seach).table}
              dataSource={statisticByDate.data_total}
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "30"],
              }}
              className="news-table"
              scroll={{ x: 650 }}
            />
          </Col>
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
    onGetStatisticByDate: (timeStart, timeEnd, total_seach, loading) => {
      dispatch(
        actRequestGetStatisticByDate(timeStart, timeEnd, total_seach, loading)
      );
    },

    onResetStatistic: () => {
      dispatch(ResetStatistic());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticByDate);
