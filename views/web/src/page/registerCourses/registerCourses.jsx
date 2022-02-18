import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import { withRouter } from "react-router-dom";

import RigisterCoursesForm from "../../components/registerCourses/registerCoursesForm.component";

class PageRigisterCourses extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={24}>
            <div className="title-head">
              <h1>Đăng ký khóa học</h1>
              <div className="under_title"></div>
            </div>
          </Col>
        </Row>
        <RigisterCoursesForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    news: state.news,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PageRigisterCourses));
