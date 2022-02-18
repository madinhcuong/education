import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, Row, Col, Progress, Avatar } from "antd";
import { ScoreCumulative_Rank } from "../../helpers/base.helper";
import Moment from "react-moment";

class HeaderHome extends React.Component {
  onPanelChange = (value, mode) => {
    console.log(value, mode);
  };

  render() {
    let { inforClient } = this.props;
    return (
      <div>
        <Row>
          <Col span={24} className="header-home">
            <Row>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 20, offset: 2 }}
                md={{ span: 10, offset: 1 }}
                lg={{ span: 10, offset: 1 }}
                xl={{ span: 10, offset: 1 }}
              >
                <Card style={{ width: "100%" }}>
                  <Col span={12} className="header-home-score">
                    <p>
                      {inforClient.infoClient.id_debit &&
                        inforClient.infoClient.id_debit.wallet}
                    </p>
                  </Col>
                  <Col span={12}>
                    <p>
                      Cập nhật:{" "}
                      {
                        <Moment format="DD/MM/YYYY">
                          {inforClient.infoClient.id_debit &&
                            inforClient.infoClient.id_debit.updatedAt}
                        </Moment>
                      }
                    </p>
                    <p className="header-home-name">
                      {
                        ScoreCumulative_Rank(
                          inforClient.infoClient.id_debit &&
                            inforClient.infoClient.id_debit.level
                        )
                      }
                    </p>
                  </Col>
                  <Row>
                    <Col span={10}>
                      <Progress
                        percent={100}
                        showInfo={false}
                        status="exception"
                      />
                    </Col>
                    <Col span={7} offset={1}>
                      <Progress
                        percent={100}
                        showInfo={false}
                        status="active"
                      />
                    </Col>
                    <Col span={5} offset={1}>
                      <Progress percent={100} showInfo={false} />
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 20, offset: 2 }}
                md={{ span: 10, offset: 2 }}
                lg={{ span: 10, offset: 2 }}
                xl={{ span: 10, offset: 2 }}
              >
                <Card
                  style={{ width: "100%" }}
                  className="header-home-cartcode"
                >
                  <Col span={12}>
                    <div className="header-home-cartavatar">
                      <Avatar size={80} icon="user" />
                    </div>
                  </Col>
                  <Col span={12} className="header-home-code">
                    <div>
                      <p>Mã giới thiệu</p>
                      <p className="header-home-code2">
                        {inforClient.infoClient &&
                          inforClient.infoClient.your_agent}
                      </p>
                    </div>
                  </Col>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HeaderHome));
