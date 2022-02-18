import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Col, Row, Pagination } from "antd";
import Loading from "../../pages/loading/loading";
import Moment from "react-moment";

import { actRequestHistoryChangeScore } from "../../actions/wallet.action";

class HistoryChnageScore extends React.Component {
  componentDidMount() {
    this.props.onHistoryChangeScore(1, 10, true);
  }

  onChange_Number = (pageNumber) => {
    this.props.onHistoryChangeScore(pageNumber, 10, true);
  };

  renderSwitch(param) {
    switch (param) {
      case "SCORE_MONEY":
        return "Đổi điểm thành tiền";

      case "SCORE_CODE":
        return "Đổi điểm thành mã giảm giá";
      default:
        return null;
    }
  }

  render() {
    let { wallet } = this.props;

    let arr_history = null;
    if (
      wallet.historyChangeScore.docs &&
      wallet.historyChangeScore.docs.length > 0
    ) {
      arr_history = wallet.historyChangeScore.docs.map((item, key) => {
        return (
          <div key={key}>
            <li style={{ color: "#1890ff" }}>
              <span>
                {<Moment format="HH:mm - DD/MM/YYYY">{item.createdAt}</Moment>}
              </span>
              <div>
                <b>{this.renderSwitch(item.type)}:</b> Bạn đã đổi{" "}
                {item.change_score} điểm
              </div>
            </li>
          </div>
        );
      });
    }

    return (
      <div>
        {wallet.loading ? (
          <Loading />
        ) : (
          <div>
            <Row>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 24, offset: 0 }}
                md={{ span: 18, offset: 3 }}
                lg={{ span: 18, offset: 3 }}
                xl={{ span: 18, offset: 3 }}
                className="list-notification"
              >
                <div className="list-notification-title">Lịch sử đổi điểm</div>

                <div className="list-notification-item">{arr_history}</div>
                <div className="list-notification-pagination">
                  <Pagination
                    onChange={this.onChange_Number}
                    defaultCurrent={
                      wallet.historyChangeScore &&
                      wallet.historyChangeScore.page
                    }
                    total={
                      wallet.historyChangeScore &&
                      wallet.historyChangeScore.totalDocs
                    }
                  />
                </div>
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onHistoryChangeScore: (page, limit, loading) => {
      dispatch(actRequestHistoryChangeScore(page, limit, loading));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HistoryChnageScore));
