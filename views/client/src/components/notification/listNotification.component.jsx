import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Loading from "../../pages/loading/loading";
import { Row, Col, Pagination, Button } from "antd";
import Moment from "react-moment";

import {
  actRequestGetListNoti,
  actRequestChangeStatusNoti,
} from "../../actions/notification";
import { actRequestUpdateVeriTransferScore } from "../../actions/wallet.action";

class ListNotification extends React.Component {
  componentDidMount() {
    this.props.onGetListNoti(1, 10, true);
  }

  onChangeStatusNoti = (id) => {
    this.props.onChangeStatusNoti(id);
  };

  onChange_Number = (pageNumber) => {
    this.props.onGetListNoti(pageNumber, 10, true);
  };

  // onClick button noti transfer score
  onClick_TransferScore = async (id_noti, type) => {
    await this.props.onUpdateVeriTransferScore(id_noti, { type: type });
  };

  render() {
    let { noti } = this.props;

    let arr_noti = null;
    if (noti.listNoti.docs && noti.listNoti.docs.length > 0) {
      arr_noti = noti.listNoti.docs.map((item, key) => {
        if (
          item.type_noti === "SCORE_BORROW" &&
          item.status_score_transfer === "PENDING"
        )
          return (
            <div key={key}>
              <Link to={`/client/thong-bao`}>
                <li>
                  <span>
                    {
                      <Moment format="HH:mm - DD/MM/YYYY">
                        {item.createdAt}
                      </Moment>
                    }
                  </span>
                  <div>
                    <b>{item.title}:</b>{" "}
                    {item.description.length > 70
                      ? `${item.description.slice(0, 70)}...`
                      : item.description}
                  </div>
                  <div className="noti-li-score-borrow">
                    <Button
                      onClick={() =>
                        this.onClick_TransferScore(item._id, "APPROVE")
                      }
                      className="noti-li-score-borrow-xn"
                      shape="round"
                      size="small"
                    >
                      Xác nhận
                    </Button>
                    <Button
                      onClick={() =>
                        this.onClick_TransferScore(item._id, "REJECT")
                      }
                      className="noti-li-score-borrow-tc"
                      shape="round"
                      size="small"
                    >
                      Từ chối
                    </Button>
                  </div>
                </li>
              </Link>
            </div>
          );
        return (
          <div key={key}>
            <Link to={`/client/chi-tiet-thong-bao/${item._id}`}>
              <li
                onClick={() => this.onChangeStatusNoti(item._id)}
                style={{
                  backgroundColor: item.status === "ACTIVE" ? "" : "#edf2fa",
                }}
              >
                <span>
                  {
                    <Moment format="HH:mm - DD/MM/YYYY">
                      {item.createdAt}
                    </Moment>
                  }
                </span>
                <div>
                  <b>{item.title}:</b> {item.description}
                </div>
              </li>
            </Link>
          </div>
        );
      });
    }

    return (
      <div>
        {noti.loading ? (
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
                <div className="list-notification-title">Thông báo của bạn</div>

                <div className="list-notification-item">{arr_noti}</div>
                <div className="list-notification-pagination">
                  <Pagination
                    onChange={this.onChange_Number}
                    defaultCurrent={noti.listNoti && noti.listNoti.page}
                    total={noti.listNoti && noti.listNoti.totalDocs}
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
    noti: state.noti,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetListNoti: (page, limit, loading) => {
      dispatch(actRequestGetListNoti(page, limit, loading));
    },

    onChangeStatusNoti: (id) => {
      dispatch(actRequestChangeStatusNoti(id));
    },

    // tu choi , xác nhân chuyên tiền
    onUpdateVeriTransferScore: (id_noti, body) => {
      dispatch(actRequestUpdateVeriTransferScore(id_noti, body));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListNotification));
