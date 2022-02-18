import React, { Component } from "react";
import { connect } from "react-redux";
import * as url from "../../utils/url_api";
import { Row, Col } from "antd";

import { actRequestGetTeacherById } from "../../actions/teacher.action";

class Teacher extends Component {
  handle = (id) => {
    this.props.onGetTeacherById(id);
  };

  render() {
    let { data_teacher, teacher } = this.props;

    let list_teacher = data_teacher.map((item, key) => {
      return (
        <Col
          key={key}
          xl={{ span: 12 }}
          lg={{ span: 12 }}
          md={{ span: 12 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <div className="author">
            <span onClick={() => this.handle(item._id)}>
              <img
                src={`${url.api_url}/${item.avatar && item.avatar}`}
                alt={`${item.avatar && item.avatar}`}
              ></img>
            </span>
            <div className="author-des">
             
                <div className="author-des-name">
                  <p>Giáo viên: {item.fullName}</p>
                </div>
                <div className="author-des-content">
                  <p>{item.depict}</p>
                </div>
              
            </div>
          </div>
        </Col>
      );
    });

    return (
      <div>
        <div className="teacher-home">
          <div className="_new-content">
            <Row>
              <Col
                xl={{ span: 8 }}
                lg={{ span: 8 }}
                md={{ span: 8 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                className="col-teacher-left"
              >
                <div className="col-teacher-title">
                  <h3>Đội ngũ giảng viên chuyên nghiệp</h3>
                  <div>
                    {teacher.teacherById && teacher.teacherById.fullName ? (
                      <div className="teacher-content-fullname">
                        <p>
                          Giáo viên:{" "}
                          {teacher.teacherById && teacher.teacherById.fullName}
                        </p>
                        <div className="teacher-content-depict">
                          {teacher.teacherById && teacher.teacherById.depict}
                        </div>
                      </div>
                    ) : (
                      <span>
                        Đội ngũ giảng viên trẻ trung, đầy nhiệt huyết, hướng dẫn
                        tận tình. Hỗ trợ kịp thời khó khăn trong quá trình học
                        tập. 100% thầy cô giáo giỏi với nhiều năm kinh nghiệm
                        đào tạo tại trung tâm và các doanh nghiệp.
                      </span>
                    )}
                  </div>
                </div>
              </Col>
              <Col
                xl={{ span: 16 }}
                lg={{ span: 16 }}
                md={{ span: 16 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                className="col-teacher-right"
              >
                <div>
                  <Row>{list_teacher}</Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    teacher: state.teacher,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetTeacherById: (id) => {
      dispatch(actRequestGetTeacherById(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Teacher);
