import React from "react";
import { withRouter } from "react-router-dom";
import { Descriptions, Row, Col, Pagination, Tag, Empty } from "antd";
import {
  distribution_student,
  _Status_ClassAll,
} from "../../helpers/base.helper";

class ListScore extends React.Component {
  render() {
    let { _class, onChange_pagination } = this.props;

    let arr_scoreClass = null;

    if (_class.docs && _class.docs.length > 0) {
      arr_scoreClass = _class.docs.map((item, key) => {
        return (
          <Col span={22} offset={1} className="schedule-col" key={key}>
            <div className="schedule-courses">
              Khóa học: {item.id_Courses && item.id_Courses.name}
            </div>
            <Descriptions
              //  column={{ xs: 2, sm: 4, md: 4, lg: 4 }}
              column={{ xs: 2, sm: 4, md: 4, lg: 4 }}
              layout="vertical"
              bordered
            >
              <Descriptions.Item label="Lớp">
                {item && item.name}
              </Descriptions.Item>
              <Descriptions.Item label="Giáo viên">
                {item.id_teacher && item.id_teacher.fullName}
              </Descriptions.Item>
              <Descriptions.Item label="Điểm 30%">
                {item && item.score_30}
              </Descriptions.Item>
              <Descriptions.Item label="Điểm 70%">
                {item && item.score_70}
              </Descriptions.Item>
              <Descriptions.Item label="Điểm trung bình">
                <p style={{ fontWeight: "bold" }}>{item && item.total_score}</p>
              </Descriptions.Item>
              <Descriptions.Item label="Xếp loại">
                <p
                  style={{
                    color: `${
                      distribution_student(item && item.total_score).color
                    }`,
                    fontWeight: "bold",
                  }}
                >
                  {distribution_student(item && item.total_score).name}
                </p>
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag color={_Status_ClassAll(item.status && item.status).color}>
                  {_Status_ClassAll(item.status && item.status).name}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Mã chứng chỉ">
                {item && item.status === "CLOSE" ? item.diploma_code : null}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        );
      });
    }

    return (
      <div>
        <Row className="schedule-row">
          {arr_scoreClass === null || arr_scoreClass.length < 1 ? (
            <Empty style={{ margin: "20px 0px 20px 0px" }} />
          ) : (
            arr_scoreClass
          )}
          <Row>
            <Col
              span={24}
              style={{ textAlign: "center", marginBottom: "30px" }}
            >
              <Pagination
                onChange={onChange_pagination}
                defaultCurrent={1}
                total={_class.totalDocs && _class.totalDocs}
              />
            </Col>
          </Row>
        </Row>
      </div>
    );
  }
}

export default withRouter(ListScore);
