import React from "react";
import { connect } from "react-redux";
import { Row, Col, Card } from "antd";
import { Doughnut } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

class StatisticClass extends React.Component {
  render() {
    let { _class, inforAdmin } = this.props;

    const data_classAll = {
      labels: ["Tổng số lớp", "Đang mở", "Đang học", "Kết thúc"],
      datasets: [
        {
          data:
            _class.statisticClassAll.length > 0
              ? _class.statisticClassAll
              : [0, 0, 0, 0],
          backgroundColor: ["#005277", "#8bc652", "#e94649", "#6faab0"],
          hoverBackgroundColor: ["#005277", "#8bc652", "#e94649", "#6faab0"],
        },
      ],
    };

    const data_class = {
      labels: [
        "Tổng số học viên",
        "Học viên đã nộp tiền",
        "Học viên chưa nộp tiền",
      ],
      datasets: [
        {
          data:
            _class.statisticByIdClass && _class.statisticByIdClass.static_class
              ? _class.statisticByIdClass.static_class
              : [0, 0, 0],

          backgroundColor: ["#005277", "#f6b53f", "#e94649"],
          hoverBackgroundColor: ["#005277", "#f6b53f", "#e94649"],
        },
      ],
    };

    let option_classAll = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
          color: "white",
          font: {
            size: 15,
            weight: 600,
          },
        },
      },
      legend: {
        position: "bottom",
      },
    };

    //---- data null
    const data_class_null = {
      labels: ["Tổng số học viên"],
      datasets: [
        {
          data: [100, 0, 0],
          backgroundColor: ["#E6E6E6", "#f6b53f", "#e94649"],
        },
      ],
    };

    let option_null = {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: { enabled: false },
      hover: { mode: null },
      plugins: {
        datalabels: {
          display: false,
        },
      },
      legend: {
        position: "bottom",
      },
    };
    //---- end data null

    return (
      <div>
        <Row>
          {inforAdmin && inforAdmin.type === "TEACHER" ? null : (
            <Col span={12} className="statistic-class">
              <Card
                title="Thống kê lớp học"
                bordered={true}
                className="statistic-regis-Card chart-container"
              >
                <Doughnut data={data_classAll} options={option_classAll} />
              </Card>
            </Col>
          )}
          <Col span={12} className="statistic-class">
            {!_class.statisticByIdClass.name_class &&
            !_class.statisticByIdClass.static_class ? (
              <Card
                title={`Không có lớp học`}
                bordered={true}
                className="statistic-regis-Card chart-container"
              >
                <Doughnut data={data_class_null} options={option_null} />
              </Card>
            ) : (
              <Card
                title={`Lớp ${
                  _class.statisticByIdClass &&
                  _class.statisticByIdClass.name_class
                    ? _class.statisticByIdClass.name_class.name
                    : ""
                }`}
                bordered={true}
                className="statistic-regis-Card chart-container"
              >
                {_class.statisticByIdClass.static_class &&
                _class.statisticByIdClass.static_class[0] === 0 ? (
                  <Doughnut data={data_class_null} options={option_null} />
                ) : (
                  <div>
                    <Doughnut data={data_class} options={option_classAll} />
                  </div>
                )}
              </Card>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    _class: state._class,
    inforAdmin: state.inforAdmin,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    // onListCoursesNoPremission: () => {
    //   dispatch(actRequestGetCoursesNoPermission());
    // },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StatisticClass);
