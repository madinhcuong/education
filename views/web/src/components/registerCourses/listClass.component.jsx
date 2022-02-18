import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import Loading from "../../page/loading/loading";
import { formatNumber } from "../../helpers/base.helper";

import { actRequestGetDataClassById } from "../../actions/registerCourses.action";

class ListClass extends React.Component {
  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onGetDataClassById(id, "", "", true);
    }
  }

  render() {
    let { registerCourses } = this.props;

    return (
      <div>
        {registerCourses.loading ? (
          <Row>
            <Col span={24}>
              <Loading />
            </Col>
          </Row>
        ) : (
          <div>
            <Row>
              <Col span={20} offset={2} style={{ marginTop: "30px" }}>
                <div className="table-listclass-courses">
                  <table>
                    <thead>
                      <tr>
                        <th>Tên khóa học</th>
                        <th>Tên lớp học</th>
                        <th>Học phí gốc</th>
                        <th>Học phí ưu đãi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {registerCourses.dataClass &&
                            registerCourses.dataClass.name_courses}
                        </td>
                        <td>
                          {registerCourses.dataClass &&
                            registerCourses.dataClass.name_class}
                        </td>
                        <td>
                          {registerCourses.dataClass &&
                          registerCourses.dataClass.tuition_Fees
                            ? formatNumber(
                                registerCourses.dataClass.tuition_Fees
                              )
                            : 0} vnđ
                        </td>
                        <td>
                          {registerCourses.dataClass &&
                          registerCourses.dataClass.tuition_Fees_code
                            ? formatNumber(
                                registerCourses.dataClass.tuition_Fees_code
                              )
                            : 0} vnđ
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
            <Row>
              <Col
                span={20}
                offset={2}
                className="total-tuition_Fees_code"
              >
                Học phí thực đóng:{" "}
                {registerCourses.dataClass &&
                registerCourses.dataClass.tuition_Fees_code
                  ? formatNumber(registerCourses.dataClass.tuition_Fees_code)
                  : 0} vnđ
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    registerCourses: state.registerCourses
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetDataClassById: (id_class, email, discount_code, loading) => {
      dispatch(
        actRequestGetDataClassById(id_class, email, discount_code, loading)
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListClass));
