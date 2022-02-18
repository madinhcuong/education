import React from "react";
import { Row, Col, Button, Collapse } from "antd";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import * as url from "../../utils/url_api";
import Loading from "../../pages/loading/loading";
import { actRequestInforTrainingById } from "../../actions/inforTraining";
const { Panel } = Collapse;

class InforTrainingComponent extends React.Component {
  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onGetInforTrainingById(id);
    }
  }

  onClose = () => {
    this.props.history.goBack();
  };
  render() {
    let { inforTraining, inforAdmin } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";
    let inforTraining_ById = inforTraining ? inforTraining.infoTraining : {};

    let content_inforTraining = [
      {
        name: "GIỚI THIỆU",
        text: inforTraining_ById.introduction,
      },
      {
        name: "ĐIỀU KIỆN THEO HỌC",
        text: inforTraining_ById.proviso,
      },
      {
        name: "MỤC TIÊU KHOÁ HỌC", // mục tiêu
        text: inforTraining_ById.target,
      },
      {
        name: "SẢN PHẨM KHOÁ HỌC",
        text: inforTraining_ById.product,
      },

      {
        name: "CHỨNG NHẬN",
        text: inforTraining_ById.certification,
      },
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
              __html: item.text,
            }}
          ></p>
        </Panel>
      );
    });

    return (
      <div>
        {inforTraining.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_INFORTRAINING") ? null : (
              <div className="main-content">
                <Row>
                  <Col span={11}>
                    <div className="name-training">
                      Đào tạo:
                      <h3>
                        {inforTraining_ById.id_training
                          ? inforTraining_ById.id_training.name
                          : null}
                      </h3>
                    </div>
                    <div className="name-infotraining">
                      Tên thông tin khóa học:
                      <h3>
                        <p>{inforTraining_ById.name}</p>
                      </h3>
                    </div>
                  </Col>
                  <Col span={11} offset={2}>
                    <h4>Ảnh:</h4>
                    {inforTraining_ById && inforTraining_ById.image ? (
                      <div className="inforTraining-img">
                        <img
                          src={`${url.api_url}/${inforTraining_ById.image}`}
                          alt={inforTraining_ById.image}
                        ></img>
                      </div>
                    ) : null}
                  </Col>
                </Row>
                <Row>
                  <div className="inforTraining-Collapse">
                    <Collapse defaultActiveKey={["0"]}>
                      {array_inforTraining}
                    </Collapse>
                  </div>
                </Row>
                <Row>
                  <Col span={24} className="btn-component">
                    {!permissions.includes("UPDATE_INFORTRAINING") ? null : (
                      <Link
                        to={
                          inforTraining_ById
                            ? `/admin/sua-thong-tin-khoa-hoc/${inforTraining_ById._id}`
                            : null
                        }
                      >
                        <Button className="btn-edit">Chỉnh sửa</Button>
                      </Link>
                    )}
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
    inforTraining: state.inforTraining,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetInforTrainingById: (id) => {
      dispatch(actRequestInforTrainingById(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InforTrainingComponent));
