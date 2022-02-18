import React from "react";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";
import { Row, Col, Select, DatePicker } from "antd";
import { formatNumber } from "../../helpers/base.helper";
import moment from "moment";

import {
  actRequestGetStatisticByYear,
  actRequestGetStatisticByMonth,
} from "../../actions/statistic.action";

const { Option } = Select;

class Chart extends React.Component {
  state = {
    year: "",
    status_chart: "YEAR",
    dayOfMonth: [],
    month: "",
  };

  componentDidMount() {
    const date = new Date();
    let year = date.getFullYear();
    this.setState({ year: year });
  }

  async onChange_DateChartByMonth(date, dateString) {
    this.props.onGetStatisticByMonth(dateString, false);

    // get day
    let month = dateString.split("/").slice(0, 1).join("/");
    let year = dateString.split("/").slice(1, 2).join("/");
    let dayTotal = moment(`${year}-${month}`, "YYYY-MM").daysInMonth();

    let dayOfMonth = [];
    for (let item = 1; item <= dayTotal; item++) {
      if (item < 10) {
        dayOfMonth.push(`Ngày 0${item}`);
      } else {
        dayOfMonth.push(`Ngày ${item}`);
      }
    }

    this.setState({
      status_chart: "MONTH",
      dayOfMonth: dayOfMonth,
      month: dateString,
    });
  }

  onChange_Select = (value) => {
    this.props.onGetStatisticByYear(value, false);
    this.setState({ year: value, status_chart: "YEAR" });
  };

  render() {
    const { MonthPicker } = DatePicker;
    let { statistic, statistic_ByYear } = this.props;
    const date = new Date();
    let year = date.getFullYear();

    function disabledDate(current) {
      return (
        (current && current > moment().endOf("day")) ||
        !current ||
        current.isSameOrBefore("2018-12-31")
      );
    }

    let arr_year = [];
    for (let item = year; item >= 2019; item--) {
      arr_year.push(item);
    }

    let option_year = arr_year.map((item, key) => {
      return (
        <Option value={`${item}`} key={key}>
          {item}
        </Option>
      );
    });

    let data_year = {
      labels: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ],
      datasets: [
        {
          label: "Doanh thu",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "#4A90E2",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "#c98a0d",
          pointBackgroundColor: "#4A90E2",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#c98a0d",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: statistic_ByYear.total_money_revenue
            ? statistic_ByYear.total_money_revenue.monthTotals
            : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          label: "Chi tiêu",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "#f8c854",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#f8c854",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: statistic_ByYear.total_money_cost
            ? statistic_ByYear.total_money_cost.monthTotals_cost
            : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
    };

    let data_month = {
      labels: this.state.dayOfMonth,
      datasets: [
        {
          label: "Doanh thu",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "#4A90E2",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#4A90E2",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data:
            statistic.statistic_ByMonth &&
            statistic.statistic_ByMonth.total_money_revenue
              ? statistic.statistic_ByMonth.total_money_revenue.monthTotalByDay
              : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          label: "Chi tiêu",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "#f8c854",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#f8c854",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data:
            statistic.statistic_ByMonth &&
            statistic.statistic_ByMonth.total_money_cost
              ? statistic.statistic_ByMonth.total_money_cost
                  .monthTotalByDay_cost
              : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
    };

    let option_null = {
      //  tooltips: { enabled: false },
      //  hover: { mode: null },
      plugins: {
        datalabels: {
          display: false,
        },
      },
    };

    return (
      <div className="main-content">
        <Row >
          <Col span={24}>
            <div className="chart-seach-year">
              <h5>Tìm kiếm theo năm</h5>
              <Select
                defaultValue={year}
                style={{ width: 120 }}
                onChange={this.onChange_Select}
              >
                {option_year}
              </Select>
            </div>

            <div>
              <h5>Tìm kiếm theo tháng</h5>
              <MonthPicker
                format="MM/YYYY"
                // defaultValue=
                disabledDate={disabledDate}
                placeholder="Chọn tháng"
                onChange={(date, dateString) =>
                  this.onChange_DateChartByMonth(date, dateString)
                }
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24} className="total-chart">
            <div className="chart-yearTotals">
              {this.state.status_chart === "YEAR" ? (
                <div>
                  Tổng doanh thu năm {this.state.year}:{" "}
                  {statistic_ByYear.total_money_revenue
                    ? formatNumber(
                        statistic_ByYear.total_money_revenue.yearTotals
                      )
                    : 0}
                  vnđ
                </div>
              ) : (
                <div>
                  Tổng doanh thu tháng {this.state.month}:{" "}
                  {statistic.statistic_ByMonth &&
                  statistic.statistic_ByMonth.total_money_revenue
                    ? formatNumber(
                        statistic.statistic_ByMonth.total_money_revenue
                          .monthTotals
                      )
                    : 0}
                  vnđ
                </div>
              )}
            </div>
            <div className="chart-yearTotals">
              {this.state.status_chart === "YEAR" ? (
                <div>
                  Tổng chi tiêu năm {this.state.year}:{" "}
                  {statistic_ByYear.total_money_cost
                    ? formatNumber(
                        statistic_ByYear.total_money_cost.yearTotals_cost
                      )
                    : 0}
                  vnđ
                </div>
              ) : (
                <div>
                  Tổng chi tiêu tháng {this.state.month}:{" "}
                  {statistic.statistic_ByMonth &&
                  statistic.statistic_ByMonth.total_money_cost
                    ? formatNumber(
                        statistic.statistic_ByMonth.total_money_cost
                          .monthTotals_cost
                      )
                    : 0}
                  vnđ
                </div>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div>
              <Line
                data={
                  this.state.status_chart === "YEAR" ? data_year : data_month
                }
                options={option_null}
                width={100}
                height={30}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={12} className="statistic-total-revenue">
            <div className="statistic-total-revenue-title">Tổng doanh thu:</div>
            <div className="statistic-total-revenue-money">
              {statistic_ByYear.total_money_revenue
                ? formatNumber(statistic_ByYear.total_money_revenue.total_money)
                : 0}{" "}
              vnđ
            </div>
          </Col>
          <Col span={12} className="statistic-total-revenue">
            <div className="statistic-total-revenue-title">Tổng chi tiêu:</div>
            <div className="statistic-total-revenue-money-expend">
              {statistic_ByYear.total_money_cost
                ? formatNumber(
                    statistic_ByYear.total_money_cost.total_money_cost
                  )
                : 0}{" "}
              vnđ
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inforAdmin: state.inforAdmin,
    statistic: state.statistic,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetStatisticByYear: (year, loading) => {
      dispatch(actRequestGetStatisticByYear(year, loading));
    },

    onGetStatisticByMonth: (month, loading) => {
      dispatch(actRequestGetStatisticByMonth(month, loading));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
