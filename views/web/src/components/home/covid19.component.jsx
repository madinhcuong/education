import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
//import Loading from "../../page/loading/loading";
import { formatNumber } from "../../helpers/base.helper";

import {
  actRequestGetInforCovid19VI,
  actRequestGetInforCovid19WD,
} from "../../actions/covid19.action";

class Covid19 extends Component {
  componentDidMount() {
    this.props.onGetInforCovid19VI();
    this.props.onGetInforCovid19WD();
  }

  render() {
    let { covid19 } = this.props;

    return (
      <div>
        {
          // covid19.loading ? (
          //   <Row>
          //     <Col span={24}>
          //       <Loading />
          //     </Col>
          //   </Row>
          covid19.inforCovid19Vi &&
          !covid19.inforCovid19Vi.cases &&
          covid19.inforCovid19WD &&
          !covid19.inforCovid19WD.cases ? null : (
            <div className="layout-covi19">
              <div className="title-covid19">
                Thống kê COVID-19
                <div className="title-time">( Hệ thống TEST )</div>
                {/* <div className="title-time">
                Số liệu cập nhật:{" "}
                <Moment format="HH:mm - DD/MM/YYYY">{time_GMT}</Moment>
              </div> */}
              </div>

              <Row type="flex" justify="center" align="top" className="covid19">
                <Col xs={24} sm={4} md={4} className="covid19-col">
                  <div className="covid19-col-div">
                    <span className="box-vn">Việt Nam</span>
                  </div>
                </Col>
                <Col xs={12} sm={4} md={4} className="covid19-col">
                  <div className="covid19-col-div text-danger-new">
                    Số ca nhiễm
                    <br></br>
                    <span className="font24">
                      {covid19.inforCovid19Vi && covid19.inforCovid19Vi.cases}
                    </span>
                  </div>
                </Col>
                <Col xs={12} sm={4} md={4} className="covid19-col">
                  <div className="covid19-col-div text-warning ">
                    Đang điều trị
                    <br></br>
                    <span className="font24">
                      {covid19.inforCovid19Vi && covid19.inforCovid19Vi.active}
                    </span>
                  </div>
                </Col>
                <Col xs={12} sm={4} md={4} className="covid19-col">
                  <div className="covid19-col-div text-primary">
                    Khỏi
                    <br></br>
                    <span className="font24">
                      {covid19.inforCovid19Vi &&
                        covid19.inforCovid19Vi.recovered}
                    </span>
                  </div>
                </Col>
                <Col xs={12} sm={4} md={4} className="covid19-col">
                  <div className="covid19-col-div text-danger-new1">
                    Tử vong
                    <br></br>
                    <span className="font24">
                      {covid19.inforCovid19Vi && covid19.inforCovid19Vi.deaths}
                    </span>
                  </div>
                </Col>
              </Row>
              <Row
                type="flex"
                justify="center"
                align="top"
                className="covid19-World"
              >
                <Col xs={24} sm={4} md={4} className="covid19-col">
                  <div className="covid19-col-div">
                    <span className="box-world">Thế giới</span>
                  </div>
                </Col>
                <Col xs={12} sm={4} md={4} className="covid19-col">
                  <div className="covid19-col-div text-danger-new">
                    Số ca nhiễm
                    <br></br>
                    <span className="font24">
                      {covid19.inforCovid19WD.cases &&
                        formatNumber(covid19.inforCovid19WD.cases)}
                    </span>
                  </div>
                </Col>
                <Col xs={12} sm={4} md={4} className="covid19-col">
                  <div className="covid19-col-div text-warning ">
                    Đang điều trị
                    <br></br>
                    <span className="font24">
                      {covid19.inforCovid19WD.active &&
                        formatNumber(covid19.inforCovid19WD.active)}
                    </span>
                  </div>
                </Col>
                <Col xs={12} sm={4} md={4} className="covid19-col">
                  <div className="covid19-col-div text-primary">
                    Khỏi
                    <br></br>
                    <span className="font24">
                      {covid19.inforCovid19WD.recovered &&
                        formatNumber(covid19.inforCovid19WD.recovered)}
                    </span>
                  </div>
                </Col>
                <Col xs={12} sm={4} md={4} className="covid19-col">
                  <div className="covid19-col-div text-danger-new1">
                    Tử vong
                    <br></br>
                    <span className="font24">
                      {covid19.inforCovid19WD.deaths &&
                        formatNumber(covid19.inforCovid19WD.deaths)}
                    </span>
                  </div>
                </Col>
              </Row>
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    covid19: state.covid19,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetInforCovid19VI: () => {
      dispatch(actRequestGetInforCovid19VI(true));
    },
    onGetInforCovid19WD: () => {
      dispatch(actRequestGetInforCovid19WD(true));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Covid19);
