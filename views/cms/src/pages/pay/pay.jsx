import React from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import Loading from "../loading/loading";
import * as socket from "../../utils/socket_Client";

import { actRequestGetListPay } from "../../actions/pay.action";

import SeachPay from "../../components/pay/seachPay.component";
import ListPay from "../../components/pay/listPay.component";

class Pay extends React.Component {
  componentDidMount() {
    this.props.onGetListPay("", "", 1, 10, true);

    socket.url_socket.on("GET_LIST_PAY_CMS", (message) => {
      this.props.onGetListPay("", "", 1, 10, false);
    });
  }

  onChange_pagination = (pagination) => {
    this.props.onGetListPay("", "", pagination.current, 10, false);
  };

  render() {
    let { inforAdmin, pay } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    return (
      <div>
        {pay.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_PAY") ? null : (
              <div>
                <Row>
                  <Col span={24} className="seach-main-content">
                    <SeachPay />
                  </Col>
                </Row>
                <Row className="staff-table main-content">
                  <Row className="title-main-content">
                    <Col span={12}>
                      <h2>Dang sách yêu cầu thanh toán tiền</h2>
                    </Col>
                  </Row>
                  <ListPay
                    listPay={pay.listPay ? pay.listPay : {}}
                    onChange_pagination={this.onChange_pagination}
                  />
                </Row>
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
    pay: state.pay,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetListPay: (name, email, page, limit, loading) => {
      dispatch(actRequestGetListPay(name, email, page, limit, loading));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pay);
