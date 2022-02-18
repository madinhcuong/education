import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Loading from "../../pages/loading/loading";
import { Row, Col, Button, Descriptions } from "antd";
import Moment from "react-moment";
import { switch_sex } from "../../helpers/base.helper";

import { actRequestGetInforNoti } from "../../actions/notification";

class InforNotification extends React.Component {
  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onGetInforNoti(id, true);
    }
  }

  OnClose = () => {
    this.props.history.goBack();
  };
  render() {
    let { noti } = this.props;

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
                <div className="list-notification-title">
                  Chi tiết thông báo:{" "}
                </div>

                <div className="list-notification-item">
                  <div className="list-notification-item-nd">
                    <span style={{ fontWeight: "bold" }}>Thời gian: </span>
                    <span>
                      <Moment format="HH:mm - DD/MM/YYYY">
                        {noti.inforNoti && noti.inforNoti.time}
                      </Moment>
                    </span>
                  </div>
                  <div className="list-notification-item-nd">
                    <span style={{ fontWeight: "bold" }}>
                      {noti.inforNoti && noti.inforNoti.title}:{" "}
                    </span>
                    <span>{noti.inforNoti && noti.inforNoti.description}</span>
                  </div>
                  {noti.inforNoti && noti.inforNoti.type_infor ? (
                    <div className="list-notification-item-nd">
                      <p style={{ fontWeight: "bold" }}>{`Thông tin ${
                        noti.inforNoti && noti.inforNoti.agent
                      } của bạn`}</p>
                      <Descriptions>
                        <Descriptions.Item label="Họ và tên">
                          {noti.inforNoti && noti.inforNoti.name_agent}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày sinh">
                          {noti.inforNoti && noti.inforNoti.date_agent}
                        </Descriptions.Item>
                        <Descriptions.Item label="Giới tính">
                          {noti.inforNoti &&
                            switch_sex(noti.inforNoti.sex_agent)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                          {noti.inforNoti && noti.inforNoti.email_agent}
                        </Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">
                          {noti.inforNoti && noti.inforNoti.phone_agent}
                        </Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ">
                          {noti.inforNoti && noti.inforNoti.address_agent}
                        </Descriptions.Item>
                      </Descriptions>
                    </div>
                  ) : (
                    <div>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: noti.inforNoti && noti.inforNoti.detailed_des,
                        }}
                      ></p>
                    </div>
                  )}
                </div>
                <div className="list-notification-pagination">
                  <Button onClick={this.OnClose} className="changeScore-btn-10">
                    Quay lại
                  </Button>
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
    onGetInforNoti: (id, loading) => {
      dispatch(actRequestGetInforNoti(id, loading));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InforNotification));
