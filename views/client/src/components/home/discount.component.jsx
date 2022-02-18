import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Collapse, Icon, Badge, Empty } from "antd";
import Moment from "react-moment";

class Discount extends React.Component {
  render() {
    const { Panel } = Collapse;
    let { inforClient } = this.props;

    let arr_discount = null;
    if (inforClient.length > 0) {
      arr_discount = inforClient.map((item, key) => {
        return (
          <Col
            key={key}
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 6, offset: 0 }}
            xl={{ span: 6, offset: 0 }}
            className="home-discount"
          >
            <div className="home-discount-box">
              <div className="home-discount-box-code">{`Mã giảm giá ${item.sale}%`}</div>
              <div className="home-discount-box-code1">
                {item.discount_code}
              </div>
              <div className="home-discount-date">
                <div className="home-discount-date1">Hạn dùng:</div>
                <div className="home-discount-date2">
                  <Moment format="DD/MM/YYYY">{item.expiry_date}</Moment>
                </div>
              </div>
            </div>
          </Col>
        );
      });
    }

    return (
      <div>
        <Row>
          <Col span={24}>
            <Row>
              <Collapse
                expandIcon={({ isActive }) => (
                  <Icon type="caret-right" rotate={isActive ? 90 : 0} />
                )}
              >
                <Panel
                  header={
                    <Badge
                      count={inforClient.length > 0 ? inforClient.length : 0}
                    >
                      Mã giảm giá khóa học
                    </Badge>
                  }
                  className="home-discount-header-Badge"
                >
                  {arr_discount === null || arr_discount.length < 1 ? (
                    <Empty style={{ margin: "20px 0px 20px 0px" }} />
                  ) : (
                    arr_discount
                  )}
                </Panel>
              </Collapse>
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
)(withRouter(Discount));
