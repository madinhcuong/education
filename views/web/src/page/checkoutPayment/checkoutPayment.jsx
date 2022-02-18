import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Loading from "../../page/loading/loading";
import { Row, Col, Result, Button, Typography } from "antd";
import { api_url } from "../../utils/url_api";

import { ResetCheckoutPayment } from "../../actions/checkoutPayment";
import {
  actRequestSendIdBodyPaymentPaypal,
  actRequestSendIdBodyPaymentVnPay,
  actRequestSendIdBodyPaymentMoMo,
} from "../../actions/registerCourses.action";

class CheckoutPayment extends React.Component {
  UNSAFE_componentWillMount() {
    this.props.onResetCheckoutPayment();
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(this.props.location.search);
    const payment = urlParams.get("payment");

    let url = window.location.href;
    let data = url.split("/").slice(4).join("/");

    if (payment === "PAYPAL") {
      this.props.onRequestSendIdBodyPaymentPaypal(data);
    }

    if (payment === "VNPAY") {
      this.props.onRequestSendIdBodyPaymentVnPay(data);
    }

    if (payment === "MOMO") {
      this.props.onRequestSendIdBodyPaymentMoMo(data);
    }
  }

  render() {
    const { Paragraph, Text } = Typography;
    let { checkoutPayment } = this.props;

    return (
      <div>
        {checkoutPayment.loading ? (
          <Row>
            <Col span={24}>
              <Loading />
            </Col>
          </Row>
        ) : (
          <div className="page-payment">
            {checkoutPayment.resultStatus ? (
              <div>
                {checkoutPayment.resultData.status === "SUCCESS" ? (
                  <div>
                    <Result
                      status="success"
                      title="Thực hiện thanh toán thành công"
                      subTitle="Cám ơn bạn đã đăng ký học tại trung tâm. Vui lòng theo dõi lịch học"
                      extra={[
                        <Link to="/lich-khai-giang" key="console1">
                          <Button type="primary" key="console1" ghost>
                            Quay lại
                          </Button>
                        </Link>,
                      ]}
                      className="payment-result"
                    >
                      <div
                        className="desc"
                        style={{
                          fontSize: 16,
                          textAlign: "center",
                        }}
                      >
                        <Paragraph>
                          <Text strong>Thông tin: </Text>
                        </Paragraph>
                        <Paragraph>
                          <Text>
                            Trang học viên:{" "}
                            <a href={api_url + "/client"} target={"_blank"}>
                              {api_url + "/client"}
                            </a>
                          </Text>
                        </Paragraph>
                        <Paragraph>
                          Tài khoản: {checkoutPayment.resultData.data.email} -
                          Mật khẩu: {checkoutPayment.resultData.data.date}
                        </Paragraph>
                      </div>
                    </Result>
                  </div>
                ) : (
                  <div>
                    <Result
                      status="warning"
                      title="Thực hiện thanh toán thất bại"
                      subTitle={`${checkoutPayment.resultData.data}`}
                      extra={
                        <Link to="/lich-khai-giang" key="console2">
                          <Button type="primary" key="console2" ghost>
                            Quay lại
                          </Button>
                        </Link>
                      }
                      className="payment-result"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Result
                  title="Vui lòng đăng ký khóa học tại trung tâm"
                  extra={
                    <Link to="/lich-khai-giang" key="console3">
                      <Button type="primary" key="console3" ghost>
                        Quay lại
                      </Button>
                    </Link>
                  }
                  className="payment-result"
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
    checkoutPayment: state.checkoutPayment,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onResetCheckoutPayment: () => {
      dispatch(ResetCheckoutPayment());
    },

    // Success PayPal
    onRequestSendIdBodyPaymentPaypal: (data) => {
      dispatch(actRequestSendIdBodyPaymentPaypal(data));
    },

    // Success VnPay
    onRequestSendIdBodyPaymentVnPay: (data) => {
      dispatch(actRequestSendIdBodyPaymentVnPay(data));
    },

    // Success MomMo
    onRequestSendIdBodyPaymentMoMo: (data) => {
      dispatch(actRequestSendIdBodyPaymentMoMo(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CheckoutPayment));
