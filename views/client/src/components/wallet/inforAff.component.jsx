import React from "react";
import { withRouter } from "react-router-dom";
import { Col, Row, Table, Descriptions, Avatar, Pagination } from "antd";
import { switch_sex } from "../../helpers/base.helper";
import * as url from "../../utils/url_api";

class InforAff extends React.Component {
  render() {
    let { listAff } = this.props;

    const columns = [
      {
        title: "Họ và tên",
        dataIndex: "name",
      },
      {
        title: "Ngày sinh",
        dataIndex: "date",
        className: "inforAff-date",
      },
      {
        title: "Giới tính",
        dataIndex: "sex",
        render: (text, record) => <span>{switch_sex(text)}</span>,
      },
      {
        title: "Số điện thoại",
        dataIndex: "phone",
      },
    ];

    return (
      <div>
      
        <Row>
          <Col span={24}>
            <Table
              rowKey="_id"
              columns={columns}
              expandedRowRender={(record) => (
                <div>
                  <Row>
                    <Col span={22} offset={1} className="inforUser-image">
                      <Avatar
                        src={`${url.api_url}/${record && record.image}`}
                        shape="square"
                        size={110}
                        icon="user"
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "20px" }}>
                    <Col span={22} offset={1}>
                      <Descriptions className="inforUser-title">
                        <Descriptions.Item label="Mã giới thiệu">
                          {record.your_agent}
                        </Descriptions.Item>

                        <Descriptions.Item label="Email">
                          {record.email}
                        </Descriptions.Item>

                        <Descriptions.Item label="Địa chỉ">
                          {record.address}
                        </Descriptions.Item>

                        <Descriptions.Item
                          label="Ngày sinh"
                          className="inforUser-sex"
                        >
                          {record.date}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Row>
                </div>
              )}
              dataSource={
                listAff.docs && listAff.docs.length > 0 ? listAff.docs : []
              }
              pagination={false}
              className="inforAff"
            />
          </Col>
        </Row>
        <Row style={{ textAlign: "center", margin: "20px 0px" }}>
          <Pagination
            defaultCurrent={listAff.page && listAff.page}
            total={listAff.totalDocs && listAff.totalDocs}
          />
        </Row>
      </div>
    );
  }
}

export default withRouter(InforAff);
