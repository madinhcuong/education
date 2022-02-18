import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Row, Col, Button } from "antd";
import { connect } from "react-redux";
import Loading from "../loading/loading";
import { actRequestListInforTraining } from "../../actions/inforTraining";

import SeachInforTraining from "../../components/inforTraining/seachInforTraining.component";
import ListInforTraining from "../../components/inforTraining/listInforTraining.component";

class InForTraining extends React.Component {
  componentDidMount() {
    this.props.onListInforTraining("", "");
  }

  render() {
    let { inforTraining, inforAdmin } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    return (
      <div>
        {inforTraining.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_INFORTRAINING") ? null : (
              <div>
                <Row>
                  <Col span={24} className="seach-main-content">
                    <SeachInforTraining />
                  </Col>
                </Row>
                <Row className="staff-table main-content">
                  <Row className="title-main-content">
                    <Col span={12}>
                      <h2>Danh sách thông tin khóa học</h2>
                    </Col>
                    <Col span={12} className="staff-addStaff">
                      {!permissions.includes("CREATE_INFORTRAINING") ? null : (
                        <Link to="/admin/them-thong-tin-khoa-hoc">
                          <Button className="btn-add-new">Tạo mới</Button>
                        </Link>
                      )}
                    </Col>
                  </Row>
                  <ListInforTraining listInforTraining={inforTraining} />
                </Row>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inforAdmin: state.inforAdmin,
    inforTraining: state.inforTraining,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListInforTraining: (name_inforTraining, name_training) => {
      dispatch(
        actRequestListInforTraining(name_inforTraining, name_training, true)
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InForTraining));
