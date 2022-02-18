import React, { Component } from "react";
import { connect } from "react-redux";
import "../../assets/css/seach_diploma.css";
import { Input, Row, Col, Descriptions, Avatar, Empty } from "antd";
import { withRouter } from "react-router-dom";
import Loading from "../../page/loading/loading";
import * as url from "../../utils/url_api";
import { distribution_student, switch_sex } from "../../helpers/base.helper";

import {
  actRequestGetListDiploma,
  ResetDiploma,
} from "../../actions/diploma.action";

class SeachDiploma extends Component {
  componentDidMount() {
    this.props.onResetDiploma();
  }

  onSearch = (code) => {
    if (code && code !== "" && code !== undefined && code !== null)
      this.props.onGetListDiploma(code, true);
  };

  render() {
    const { Search } = Input;
    let { diploma } = this.props;

    let list_image_diploma = null;

    if (
      diploma.listDiploma.image_diploma &&
      diploma.listDiploma.image_diploma.length > 0
    ) {
      list_image_diploma = diploma.listDiploma.image_diploma.map(
        (item, key) => {
          return (
            <div key={key} className="diploma-view-image-key">
              <span>
                <img
                  src={`${url.api_url}/${item.image}`}
                  alt={item.image}
                ></img>
              </span>
            </div>
          );
        }
      );
    }

    return (
      <div>
        <div className="container">
          <div className="col-md-12">
            <p className="seach-title">Tra cứu chứng chỉ</p>
          </div>
        </div>
        <Row>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 12, offset: 6 }}
            lg={{ span: 8, offset: 8 }}
            xl={{ span: 8, offset: 8 }}
            className="col-seach-diploma"
          >
            <Search
              placeholder="Nhập mã chứng chỉ ..."
              enterButton="Tra cứu"
              onSearch={this.onSearch}
            />
          </Col>
        </Row>
        <Row>
          {!diploma.listDiploma.diploma_code ? (
            <div className="diploma-no-data">
              {diploma.error ? (
                <div className="diploma-error">{diploma.error}</div>
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </div>
          ) : (
            <div>
              {diploma.loading ? (
                <Row>
                  <Col span={24}>
                    <Loading />
                  </Col>
                </Row>
              ) : (
                <div className="diploma-infor">
                  <Row>
                    <Col span={20} offset={2} className="diploma-image">
                      <Avatar
                        src={`${url.api_url}/${
                          diploma.listDiploma.id_student &&
                          diploma.listDiploma.id_student.image
                        }`}
                        shape="square"
                        icon="user"
                        style={{ width: "85px", height: "110px" }}
                      />
                    </Col>
                  </Row>
                  <Row style={{ margin: "20px 0px" }}>
                    <Col span={20} offset={2}>
                      <Descriptions title="">
                        <Descriptions.Item label="Họ và tên">
                          {diploma.listDiploma.id_student &&
                            diploma.listDiploma.id_student.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày sinh">
                          {diploma.listDiploma.id_student &&
                            diploma.listDiploma.id_student.date}
                        </Descriptions.Item>
                        <Descriptions.Item label="Giới tính">
                          {diploma.listDiploma.id_student &&
                            switch_sex(diploma.listDiploma.id_student.sex)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                          {diploma.listDiploma.id_student &&
                            diploma.listDiploma.id_student.email}
                        </Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">
                          {diploma.listDiploma.id_student &&
                            diploma.listDiploma.id_student.phone}
                        </Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ">
                          {diploma.listDiploma.id_student &&
                            diploma.listDiploma.id_student.address}
                        </Descriptions.Item>
                        <Descriptions.Item label="Khóa học">
                          {diploma.listDiploma.id_Courses &&
                            diploma.listDiploma.id_Courses.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Điểm trung bình">
                          {diploma.listDiploma &&
                            diploma.listDiploma.total_score}
                        </Descriptions.Item>
                        <Descriptions.Item label="Xếp loại">
                          {diploma.listDiploma.id_Courses &&
                            distribution_student(
                              diploma.listDiploma.total_score
                            ).name}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                    <Row>
                      <Col span={24}>
                        <div className="list-image-diploma">
                          {list_image_diploma}
                        </div>
                      </Col>
                    </Row>
                  </Row>
                </div>
              )}
            </div>
          )}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    diploma: state.diploma,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetListDiploma: (code, loading) => {
      dispatch(actRequestGetListDiploma(code, loading));
    },

    onResetDiploma: () => {
      dispatch(ResetDiploma());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SeachDiploma));
