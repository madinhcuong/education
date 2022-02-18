import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Avatar, Card, Tag } from "antd";

//import { actRequestGetStatisticByYear } from "../../actions/statistic.action";

class QuantityStatistic extends React.Component {
  render() {
    let { total_statistic } = this.props;
    // let permissions = inforAdmin ? inforAdmin.permissions : "";

    return (
      <div>
        <Row style={{ margin: "10px 10px 0px 10px" }}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
            xl={{ span: 6 }}
            className="statistic"
          >
            <Link to="/admin/khoa-hoc">
              <Card className="statistic-card">
                <Row>
                  <Col span={12}>
                    <div className="statistic-card-image">
                      <Avatar size={64} icon="ordered-list" />
                    </div>
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    <div className="statistic-card-total">{total_statistic.total_course}</div>
                    <div className="statistic-card-name">
                      <Tag color="#009efb">Khóa học</Tag>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Link>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
            xl={{ span: 6 }}
            className="statistic"
          >
             <Link to="/admin/lop-hoc">
              <Card className="statistic-card">
                <Row>
                  <Col span={12}>
                    <div className="statistic-card-image1">
                      <Avatar size={64} icon="cluster" />
                    </div>
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    <div className="statistic-card-total">{total_statistic.total_class}</div>
                    <div className="statistic-card-name">
                      <Tag color="#55ce63">Lớp học</Tag>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Link>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
            xl={{ span: 6 }}
            className="statistic"
          >
             <Link to="/admin/hoc-vien/danh-sach-hoc-vien">
              <Card className="statistic-card">
                <Row>
                  <Col span={12}>
                    <div className="statistic-card-image2">
                      <Avatar size={64} icon="usergroup-add" />
                    </div>
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    <div className="statistic-card-total">{total_statistic.total_student}</div>
                    <div className="statistic-card-name">
                      <Tag color="#7a92a3">Học viên</Tag>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Link>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
            xl={{ span: 6 }}
            className="statistic"
          >
             <Link to="/admin/hoc-vien/danh-sach-hoc-vien">
              <Card className="statistic-card">
                <Row>
                  <Col span={12}>
                    <div className="statistic-card-image3">
                      <Avatar size={64} icon="usergroup-add" />
                    </div>
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    <div className="statistic-card-total">{total_statistic.total_register}</div>
                    <div className="statistic-card-name">
                      <Tag color="#ffbc35">Học viên đăng ký</Tag>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inforAdmin: state.inforAdmin,
    // statistic: state.statistic
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    // onGetStatisticByYear: (year, loading) => {
    //   dispatch(actRequestGetStatisticByYear(year, loading));
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuantityStatistic);
