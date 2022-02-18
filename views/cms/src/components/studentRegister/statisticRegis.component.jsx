import React from "react";
import { Card, Col, Row, Icon, DatePicker } from "antd";
import { connect } from "react-redux";
import moment from "moment";

import {
  actRequestStatisticRegis,
  actRequestStatisticRegisPayment,
} from "../../actions/studentRegister.action";

class StatisticRegis extends React.Component {
  async onChange_TimeStatistic(date, dateString, id) {
    await this.props.onStatisticRegis(dateString, false);
  }

  async onChange_TimeStatisticPayPal(date, dateString, id) {
    await this.props.onStatisticRegisPayment(dateString, false);
  }

  render() {
    const { MonthPicker } = DatePicker;
    const dateFormat = "MM/YYYY";
    let { statisticRegis, statisticRegisPayment } = this.props;

    function disabledDate(current) {
      return current && current > moment().endOf("day");
    }

    // chưa thanh toán
    let unpaid =
      statisticRegis.length > 0
        ? statisticRegis.find((x) => x._id === "PENDING")
          ? statisticRegis.find((x) => x._id === "PENDING").count
          : 0
        : 0;

    // đã thanh toán
    let paid =
      statisticRegis.length > 0
        ? statisticRegis.find((x) => x._id === "APPROVED")
          ? statisticRegis.find((x) => x._id === "APPROVED").count
          : 0
        : 0;

    // tổng đăng ký
    let total_payment =
      statisticRegis.length > 0
        ? statisticRegis.reduce((a, b) => a + (b["count"] || 0), 0)
        : 0;

    let local =
      statisticRegisPayment.length > 0
        ? statisticRegisPayment.find((x) => x._id === "LOCAL")
          ? statisticRegisPayment.find((x) => x._id === "LOCAL").count
          : 0
        : 0;

    // let paypal =
    //   statisticRegisPayment.length > 0
    //     ? statisticRegisPayment.find((x) => x._id === "PAYPAL")
    //       ? statisticRegisPayment.find((x) => x._id === "PAYPAL").count
    //       : 0
    //     : 0;

    let vnpay =
      statisticRegisPayment.length > 0
        ? statisticRegisPayment.find((x) => x._id === "VNPAY")
          ? statisticRegisPayment.find((x) => x._id === "VNPAY").count
          : 0
        : 0;

    let momo =
      statisticRegisPayment.length > 0
        ? statisticRegisPayment.find((x) => x._id === "MOMO")
          ? statisticRegisPayment.find((x) => x._id === "MOMO").count
          : 0
        : 0;

    return (
      <div>
        <Row gutter={24}>
          <Col span={12} className="statistic-regis-col">
            <Card
              title="Quản lý"
              bordered={true}
              className="statistic-regis-Card-li"
            >
              <div className="statistic-regis-MonthPicker">
                <MonthPicker
                  format={dateFormat}
                  defaultValue={moment(new Date(), dateFormat)}
                  disabledDate={disabledDate}
                  placeholder="Select month"
                  onChange={(date, dateString) =>
                    this.onChange_TimeStatistic(date, dateString, 1)
                  }
                />
              </div>

              <Row>
                <Col span={12} className="statistic-regis-total">
                  <Icon type="bar-chart" />
                </Col>
                <Col span={12}>
                  <div>
                    <ul className="statistic-regis-ul">
                      <li>Đăng ký: {total_payment}</li>
                      <li>Đã thanh toán: {paid}</li>
                      <li>Chưa thanh toán: {unpaid}</li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={12} className="statistic-regis-col">
            <Card
              title="Thanh toán"
              bordered={true}
              className="statistic-regis-Card-li"
            >
              <div className="statistic-regis-MonthPicker">
                <MonthPicker
                  format={dateFormat}
                  defaultValue={moment(new Date(), dateFormat)}
                  disabledDate={disabledDate}
                  placeholder="Select month"
                  onChange={(date, dateString) =>
                    this.onChange_TimeStatisticPayPal(date, dateString, 1)
                  }
                />
              </div>

              <Row>
                <Col span={12} className="statistic-regis-total">
                  <Icon type="account-book" />
                </Col>
                <Col span={12}>
                  <div>
                    <ul className="statistic-regis-ul">
                      <li>Trực tiếp: {local}</li>
                      {/* <li>PayPal: {paypal}</li> */}
                      <li>VnPay: {vnpay}</li>
                      <li>MoMo: {momo}</li> 
                    </ul>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onStatisticRegis: (time, loading) => {
      dispatch(actRequestStatisticRegis(time, loading));
    },

    onStatisticRegisPayment: (time, loading) => {
      dispatch(actRequestStatisticRegisPayment(time, loading));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticRegis);
