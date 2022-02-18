import React from "react";
import { connect } from "react-redux";
import { Row, Col, Collapse } from "antd";
import { withRouter } from "react-router-dom";
// import * as url from "../../utils/url_api";
import Loading from "../../page/loading/loading";

import { actRequestGetInforTrainingById } from "../../actions/inforTraining.action";
const { Panel } = Collapse;

class InforTraining extends React.Component {
  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onGetInforTrainingById(id, true);
    }
  }
  render() {
    let { inforTraining } = this.props;

    let content_inforTraining = [
      {
        name: "GIỚI THIỆU",
        text:
          inforTraining.GetInforTrainingById &&
          inforTraining.GetInforTrainingById.introduction
      },
      {
        name: "ĐIỀU KIỆN THEO HỌC",
        text:
          inforTraining.GetInforTrainingById &&
          inforTraining.GetInforTrainingById.proviso
      },
      {
        name: "MỤC TIÊU KHOÁ HỌC", // mục tiêu
        text:
          inforTraining.GetInforTrainingById &&
          inforTraining.GetInforTrainingById.target
      },
      {
        name: "SẢN PHẨM KHOÁ HỌC",
        text:
          inforTraining.GetInforTrainingById &&
          inforTraining.GetInforTrainingById.product
      },

      {
        name: "CHỨNG NHẬN",
        text:
          inforTraining.GetInforTrainingById &&
          inforTraining.GetInforTrainingById.certification
      }
      // {
      //   name: "LỊCH KHAI GIẢNG",
      //   text: inforTraining_ById.schedule
      // }
    ];

    let array_inforTraining = content_inforTraining.map((item, key) => {
      return (
        <Panel header={`${item.name}`} key={`${key}`}>
          <p
            dangerouslySetInnerHTML={{
              __html: item.text
            }}
          ></p>
        </Panel>
      );
    });

    return (
      <div>
        {inforTraining.loading ? (
          <Row>
            <Col span={24}>
              <Loading />
            </Col>
          </Row>
        ) : (
          <div>
            <Row>
              <Col span={24}>
                <div className="title-head">
                  <h1>
                    {inforTraining.GetInforTrainingById &&
                      inforTraining.GetInforTrainingById.name}
                  </h1>
                  <div className="under_title"></div>
                </div>
              </Col>
            </Row>
            {/* <Row>
              <Col span={24}>
                <div className="infor-img">
                  <img
                    src={`${url.api_url}/${inforTraining.GetInforTrainingById &&
                      inforTraining.GetInforTrainingById.image}`}
                    alt={`${inforTraining.GetInforTrainingById &&
                      inforTraining.GetInforTrainingById.image}`}
                  />
                </div>
              </Col>
            </Row> */}
            <Row>
              <div className="inforTraining-Collapse">
                <Collapse defaultActiveKey={["0"]}>
                  {array_inforTraining}
                </Collapse>
              </div>
            </Row>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    inforTraining: state.inforTraining
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetInforTrainingById: (id_training, loading) => {
      dispatch(actRequestGetInforTrainingById(id_training, loading));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InforTraining));
