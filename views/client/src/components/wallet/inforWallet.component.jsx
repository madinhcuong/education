import React from "react";
import { withRouter } from "react-router-dom";
import { Col, Row, Collapse, Tabs } from "antd";

class InforWallet extends React.Component {
  render() {
    const { Panel } = Collapse;
    const { TabPane } = Tabs;

    return (
      <div>
        <Row>
          <Col span={24}>
            <Collapse defaultActiveKey={["1"]}>
              <Panel header="Thông tin chi tiết điểm tích lũy" key="1">
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Đổi điểm thành tiền" key="1">
                    <Row>
                      <Col span={24} className="infor-score-money">
                        <div>
                          <b>Điều kiện đổi tiền:</b>{" "}
                        </div>
                        <div style={{ padding: "5px 0px 0px 15px" }}>
                          Bạn phải tích lũy từ <b> 500 điểm trở lên </b>(xếp
                          hạng: Bạc). 1 điểm tương ứng với 2 nghìn VNĐ. Mỗi khi
                          bạn đổi điểm nếu có người giới thiệu thì người giới
                          thiệu của bạn sẽ nhận được được 5% số tiền tương ứng
                          với số điểm bạn đổi, người giới thiệu của họ cũng sẽ
                          nhận được 2.5%. Số tiền sẽ được cộng trực tiếp vào ví
                          tiền.
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tab="Đổi điểm thành mã giảm giá" key="2">
                    <Row>
                      <Col span={24} className="infor-score-money">
                        <div>
                          <b>Điều kiện đổi mã giảm giá:</b>{" "}
                        </div>
                        <div style={{ padding: "5px 0px 0px 15px" }}>
                          <div>
                            - Tích đủ <b>300 điểm</b> đổi được{" "}
                            <b>25% khóa học</b>
                          </div>
                          <div>
                            - Tích đủ <b>600 điểm</b> đổi được{" "}
                            <b>50% khóa học</b>
                          </div>
                          <div>
                            - Tích đủ <b>900 điểm</b> đổi được{" "}
                            <b>75% khóa học</b>
                          </div>
                          <div>
                            - Tích đủ <b>1200 điểm</b> đổi được{" "}
                            <b>100% khóa học</b>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tab="Xếp hạng" key="3">
                    <Row>
                      <Col span={24} className="infor-score-money">
                        <div>
                          <b>Xếp hạng dựa trên số điểm:</b>{" "}
                        </div>
                        <div style={{ padding: "5px 0px 0px 15px" }}>
                          <div>
                            - Xếp hạng <b>Đồng</b> điểm nhỏ hơn 500 điểm
                          </div>
                          <div>
                            - Xếp hạng <b>Bạc</b> tích đủ <b>500 điểm</b> và
                            được cộng <b>100 điểm</b>
                          </div>
                          <div>
                            - Xếp hạng <b>Vàng</b> tích đủ <b>1000 điểm</b> và
                            được cộng <b>200 điểm</b>
                          </div>
                          <div>
                            - Xếp hạng <b>Kim cương</b> tích đủ{" "}
                            <b>10000 điểm</b> và được cộng <b>300 điểm</b>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tab="Chuyển điểm" key="4">
                    <Row>
                      <Col span={24} className="infor-score-money">
                        <div>
                          <b>Điều kiện cho điểm:</b>{" "}
                        </div>
                        <div style={{ padding: "5px 0px 0px 15px" }}>
                          <div>
                             Điểm tích lũy đã tích đủ từ 500 điểm.
                          </div>
                        </div>
                        <div>
                          <b>Điều kiện xin điểm:</b>{" "}
                        </div>
                        <div style={{ padding: "5px 0px 0px 15px" }}>
                          <div>
                             Điểm tích lũy đã tích đủ từ 500 điểm. Được xác nhận từ người cho điểm.
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                </Tabs>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(InforWallet);
