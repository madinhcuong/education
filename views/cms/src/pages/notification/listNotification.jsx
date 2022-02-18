import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Loading from "../../pages/loading/loading";
import { Row, Col, Pagination } from "antd";
import Moment from "react-moment";

import { actRequestGetListNoti } from "../../actions/noti.action";

class ListNotification extends React.Component {
  componentDidMount() {
    this.props.onGetListNoti(1, 10, true);
  }

  onChange_Number = (pageNumber) => {
    this.props.onGetListNoti(pageNumber, 10, true);
  };

  render() {
    let { noti, inforAdmin } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    let arr_noti = null;
    if (noti.listNoti.docs && noti.listNoti.docs.length > 0) {
      arr_noti = noti.listNoti.docs.map((item, key) => {
        return (
          <li key={key}>
            <span>
              <Moment format="HH:mm - DD/MM/YYYY">{item.createdAt}</Moment>
            </span>
            <div>
              <b>{item.title}:</b> {item.description}
            </div>
          </li>
        );
      });
    }

    return (
      <div>
        {noti.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_NOTI") ? null : (
              <Row>
                <Col
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 24, offset: 0 }}
                  md={{ span: 18, offset: 3 }}
                  lg={{ span: 18, offset: 3 }}
                  xl={{ span: 18, offset: 3 }}
                  className="list-notification"
                >
                  <div className="list-notification-title">
                    Thông báo của bạn
                  </div>
                  <div className="list-notification-item">{arr_noti}</div>
                  <div className="list-notification-pagination">
                    <Pagination
                      onChange={this.onChange_Number}
                      defaultCurrent={noti.listNoti.page && noti.listNoti.page}
                      total={noti.listNoti.totalDocs && noti.listNoti.totalDocs}
                    />
                  </div>
                </Col>
              </Row>
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
    noti: state.noti,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetListNoti: (page, limit, loading) => {
      dispatch(actRequestGetListNoti(page, limit, loading));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListNotification));
