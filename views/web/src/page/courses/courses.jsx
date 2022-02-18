import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Collapse } from "antd";
import Loading from "../../page/loading/loading";
import { Link } from "react-router-dom";
import "../../assets/css/opening_sh.css";
import { formatNumber, switch_th } from "../../helpers/base.helper";

import { actRequestGetListCourses } from "../../actions/courses.action";
import { ResetStateRegister } from "../../actions/registerCourses.action";

class PageCourses extends Component {
  componentDidMount() {
    this.props.onGetListCourses();

    // reste store đăng ký học
    this.props.onResetStateRegister();
  }
  render() {
    let { courses } = this.props;
    const { Panel } = Collapse;

    function list_timeday(data) {
      if (data.length > 0) {
        return data.map((item, key) => {
          return (
            <div key={key}>
              {`${switch_th(item.th)} (${item.hour_start} - ${item.hour_end}) `}
            </div>
          );
        });
      }
    }

    function list_class(data) {
      if (data.length > 0) {
        return data.map((item, key) => {
          return (
            <tr key={key}>
              <td data-label="Account">{item.name}</td>
              <td data-label="Due Date">{list_timeday(item.time_day)}</td>
              <td data-label="Amount">{`${item.time_start} - ${item.time_end}`}</td>
              <td className="table-data-courses-dk">
                <Link
                  to={`/dang-ky-khoa-hoc/${item._id}`}
                  className="btn btn-success btn-sm register-btn"
                >
                  Đăng ký
                </Link>
              </td>
            </tr>
          );
        });
      }
    }

    let list_course = [];
    if (courses.listCourse.length > 0) {
      list_course = courses.listCourse.map((item, key) => {
        return (
          <Panel
            header={`${item.name} (${item.class.length} khóa học)`}
            key={`${key}`}
          >
            <div className="courses-item-name">
              <p>Khóa học: {item.name}</p>
            </div>
            <div className="courses-item-location">
              <p>HỌC PHÍ: {formatNumber(item.tuition_Fees)} vnđ</p>
            </div>
            <div className="courses-item-location">
              <p>ĐỊA CHỈ: {item.location}</p>
            </div>
            <div>
              <table className="table-data-courses">
                <thead>
                  <tr>
                    <th scope="col">Lớp</th>
                    <th scope="col">Thời gian học</th>
                    <th scope="col">Ngày học</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>{list_class(item.class)}</tbody>
              </table>
            </div>
          </Panel>
        );
      });
    }

    return (
      <div>
        {courses.loading ? (
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
                  <h1>Lịch khai giảng</h1>
                  <div className="under_title"></div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24} className="courese-schedule">
                {list_course.length < 1 ? (
                  <div className="infortraining-null">
                    <p>Không có khóa học</p>
                  </div>
                ) : (
                  <Collapse defaultActiveKey={["0"]}></Collapse>
                )}
                {list_course.length < 1 ? (
                  <div className="infortraining-null">
                    <p></p>
                  </div>
                ) : (
                  <Collapse defaultActiveKey={["0"]}>{list_course}</Collapse>
                )}
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
    courses: state.courses,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetListCourses: () => {
      dispatch(actRequestGetListCourses(true));
    },

    onResetStateRegister: () => {
      dispatch(ResetStateRegister());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PageCourses));
