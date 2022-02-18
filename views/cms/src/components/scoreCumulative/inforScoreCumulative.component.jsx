import React from "react";
import { Row, Col, Button } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../../pages/loading/loading";
import * as url from "../../utils/url_api";
import { formatNumber, switch_sex } from "../../helpers/base.helper";

import ListAffiliateUser from "./listAffiliateUser.component";

import {
  actRequestGetScoreCumulativeById,
  actRequestGetListAffById,
} from "../../actions/scoreCumulative.action";

class InforScoreCumulative extends React.Component {
  state = {
    type_aff: "F1",
  };

  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onInforScoreCumulative(id);
      this.props.onGetListAffById(id, this.state.type_aff, "", "", true);
    }
  }

  onChangeSeach_aff = (data) => {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onGetListAffById(id, data.type, data.name, data.email, false);
    }
  };

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    let { inforAdmin, scoreCumulative } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    return (
      <div>
        {scoreCumulative.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_SCORE_CUMULATIVE") ? null : (
              <div className="main-content">
                <Row>
                  <Col span={24} className="infor-people-col-image">
                    {scoreCumulative.scoreById &&
                    scoreCumulative.scoreById.image ? (
                      <img
                        src={`${url.api_url}/${
                          scoreCumulative.scoreById &&
                          scoreCumulative.scoreById.image
                        }`}
                        alt={`${
                          scoreCumulative.scoreById &&
                          scoreCumulative.scoreById.image
                        }`}
                        className="infor-people-image"
                      ></img>
                    ) : null}
                  </Col>
                </Row>
                <Row className="staff-infor">
                  <Col
                    type="flex"
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 0 }}
                    className="staff-infor-col"
                  >
                    <h3>Tên học viên</h3>
                    <p>
                      {scoreCumulative.scoreById &&
                        scoreCumulative.scoreById.name}
                    </p>
                  </Col>
                  <Col
                    type="flex"
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Giới tính</h3>
                    <p>
                      {scoreCumulative.scoreById &&
                        switch_sex(scoreCumulative.scoreById.sex)}
                    </p>
                  </Col>
                  <Col
                    type="flex"
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Ngày sinh</h3>
                    <p>
                      {scoreCumulative.scoreById &&
                        scoreCumulative.scoreById.date}
                    </p>
                  </Col>
                </Row>
                <Row className="staff-infor">
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 0 }}
                    className="staff-infor-col"
                  >
                    <h3>Địa chỉ</h3>
                    <p>
                      {scoreCumulative.scoreById &&
                        scoreCumulative.scoreById.address}
                    </p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Email</h3>
                    <p>
                      {scoreCumulative.scoreById &&
                        scoreCumulative.scoreById.email}
                    </p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Số điện thoại</h3>
                    <p>
                      {scoreCumulative.scoreById &&
                        scoreCumulative.scoreById.phone}
                    </p>
                  </Col>
                </Row>
                <Row className="staff-infor">
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 0 }}
                    className="staff-infor-col"
                  >
                    <h3>Điểm tích lũy</h3>
                    <p>
                      {scoreCumulative.scoreById.id_debit &&
                        scoreCumulative.scoreById.id_debit.wallet}
                    </p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Người giới thiệu</h3>
                    <p>
                      {scoreCumulative.scoreById.agent_code
                        ? scoreCumulative.scoreById.agent_code
                        : "Không có"}
                    </p>
                  </Col>
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 1 }}
                    className="staff-infor-col"
                  >
                    <h3>Mã giới thiệu</h3>
                    <p>
                      {scoreCumulative.scoreById &&
                        scoreCumulative.scoreById.your_agent}
                    </p>
                  </Col>
                </Row>

                <Row className="staff-infor">
                  <Col
                    xs={{ span: 23, offset: 0 }}
                    lg={{ span: 7, offset: 0 }}
                    className="staff-infor-col"
                  >
                    <h3>Tổng tiền quy đổi</h3>
                    <p>
                      {scoreCumulative.scoreById.id_debit &&
                      scoreCumulative.scoreById.id_debit.money
                        ? formatNumber(scoreCumulative.scoreById.id_debit.money)
                        : 0}{" "}
                      vnđ
                    </p>
                  </Col>
                </Row>
                <Row>
                  <ListAffiliateUser
                    listAff={
                      scoreCumulative.listAff ? scoreCumulative.listAff : {}
                    }
                    onChangeSeach_aff={this.onChangeSeach_aff}
                  />
                </Row>
                <Row>
                  <Col span={24} className="btn-component">
                    <Button onClick={this.onClose} className="btn-close">
                      Hoàn tác
                    </Button>
                  </Col>
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
    scoreCumulative: state.scoreCumulative,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onInforScoreCumulative: (id) => {
      dispatch(actRequestGetScoreCumulativeById(id));
    },

    onGetListAffById: (id_user, type_aff, name, email, loading) => {
      dispatch(
        actRequestGetListAffById(id_user, type_aff, name, email, loading)
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InforScoreCumulative));
