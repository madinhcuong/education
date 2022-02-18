import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Row, Col, Tabs, Avatar, Descriptions, Button } from "antd";
import * as url from "../../utils/url_api";
import { switch_sex } from "../../helpers/base.helper";

class InforUser extends React.Component {
  render() {
    const { TabPane } = Tabs;
    let { inforClient, inforAgentCode } = this.props;

    return (
      <div>
        <Row>
          <Col span={24}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Thông tin cá nhân" key="1">
                <Row style={{ marginTop: "20px" }}>
                  <Col span={22} offset={1}>
                    <Descriptions className="inforUser-title">
                      <Descriptions.Item label="Họ và tên">
                        {inforClient.name}
                      </Descriptions.Item>
                      <Descriptions.Item label="Giới tính">
                        {switch_sex(inforClient.sex)}
                      </Descriptions.Item>
                      <Descriptions.Item label="Ngày sinh">
                        {inforClient.date}
                      </Descriptions.Item>
                      <Descriptions.Item label="Email">
                        {inforClient.email}
                      </Descriptions.Item>
                      <Descriptions.Item label="Số điện thoại">
                        {inforClient.phone}
                      </Descriptions.Item>
                      <Descriptions.Item label="Địa chỉ">
                        {inforClient.address}
                      </Descriptions.Item>
                      <Descriptions.Item label="Mã giới thiệu">
                        {inforClient.your_agent}
                      </Descriptions.Item>
                      <Descriptions.Item label="Mã người giới thiệu">
                        {inforClient.agent_code
                          ? inforClient.agent_code
                          : `Trống`}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                  <div className="inforUser-btn-edit">
                    <Link to="/client/chinh-sua-thong-tin">
                      <Button className="changeScore-btn-10">
                        Chỉnh sửa thông tin
                      </Button>
                    </Link>
                  </div>
                </Row>
              </TabPane>
              <TabPane tab="Thông tin người giới thiệu" key="2">
                <Row>
                  <Col span={22} offset={1} className="inforUser-image">
                    <Avatar
                      src={`${url.api_url_image}/${
                        inforAgentCode && inforAgentCode.image
                      }`}
                      shape="square"
                      size={110}
                      icon="user"
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: "20px" }}>
                  <Col span={22} offset={1}>
                    <Descriptions className="inforUser-title">
                      <Descriptions.Item label="Họ và tên">
                        {inforAgentCode.name}
                      </Descriptions.Item>
                      <Descriptions.Item label="Giới tính">
                        {switch_sex(inforAgentCode.sex)}
                      </Descriptions.Item>
                      <Descriptions.Item label="Ngày sinh">
                        {inforAgentCode.date}
                      </Descriptions.Item>
                      <Descriptions.Item label="Email">
                        {inforAgentCode.email}
                      </Descriptions.Item>
                      <Descriptions.Item label="Số điện thoại">
                        {inforAgentCode.phone}
                      </Descriptions.Item>
                      <Descriptions.Item label="Địa chỉ">
                        {inforAgentCode.address}
                      </Descriptions.Item>
                      <Descriptions.Item label="Mã giới thiệu">
                        {inforAgentCode.your_agent}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InforUser));
