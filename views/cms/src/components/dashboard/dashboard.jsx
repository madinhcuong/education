import React from "react";
import { connect } from "react-redux";
import {Result, Alert } from "antd";
import Loading from "../../pages/loading/loading";
import Chart from "../chart/chart.component";
import QuantityStatistic from "../chart/quantityStatisticHeader.component";
import StatisticByDate from "../chart/statisticByDate.component";

import {
  actRequestGetStatisticByYear,
  actRequestGetTotalStatistic,
  actRequestGetStatisticByDate,
} from "../../actions/statistic.action";

class DashBoard extends React.Component {
  state = {
    year: "",
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    const date = new Date();
    let year = date.getFullYear();
    this.props.onGetStatisticByYear(year, true);
    this.props.onGetTotalStatistic(true);
    this.props.onGetStatisticByDate("", "", true);
    this.setState({ year: year });
  }

  render() {
    let { inforAdmin, statistic } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    if (statistic.error && statistic.error === "") {
      return (
        <div>
          <Alert
            message="Error"
            description={statistic.error && statistic.error}
            type="error"
            closable
          />
        </div>
      );
    }
    return (
      <div>
        {statistic.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_STATISTIC") ? (
              <div>
                <Result
                  status="success"
                  title="Chào mừng bạn đã trở lại với Trí Nguyễn !!!"
                  subTitle=""
                />
              </div>
            ) : (
              <div >
                <QuantityStatistic
                  total_statistic={statistic ? statistic.total_statistic : {}}
                />
                <Chart statistic_ByYear={statistic ? statistic.statistic_obj : {}}  />
                <StatisticByDate
                  statisticByDate={statistic ? statistic.statisticByDate : {}}
                />
              </div>
            )}
          </div>
        )}
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
    onGetTotalStatistic: (loading) => {
      dispatch(actRequestGetTotalStatistic(loading));
    },
    onGetStatisticByDate: (timeStart, timeEnd, loading) => {
      dispatch(actRequestGetStatisticByDate(timeStart, timeEnd, loading));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
