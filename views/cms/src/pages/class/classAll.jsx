import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Row, Col, Button } from "antd";
import { connect } from "react-redux";

import Loading from "../loading/loading";
import {
  actRequestListClassAll,
  actRequestGetStatisticClassAll,
} from "../../actions/class.action";
import SeachClass from "../../components/class/seachClassAll.component";
import ListClassAll from "../../components/class/listClassAll.component";
import StatisticClass from "../../components/class/statisticClass.component";

class ClassAll extends React.Component {
  componentDidMount() {
    this.props.onListClassAll("", "", "");
    this.props.onGetStatisticClassAll();
  }

  render() {
    let { inforAdmin, _class } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    return (
      <div>
        {_class.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_CLASSALL") ? null : (
              <div>
                <Row>
                  <Col span={24} className="seach-main-content">
                    <SeachClass />
                  </Col>
                </Row>
                {/* --- Statistic ---*/}
                <StatisticClass />
                {/* --- end statistic  --- */}

                <Row className="staff-table main-content">
                  <Row className="title-main-content">
                    <Col span={12}>
                      <h2>Danh sách lớp học</h2>
                    </Col>
                    <Col span={12} className="staff-addStaff">
                      {!permissions.includes("CREATE_CLASSALL") ? null : (
                        <Link to="/admin/them-lop-hoc">
                          <Button className="btn-add-new">Tạo mới</Button>
                        </Link>
                      )}
                    </Col>
                  </Row>
                  <ListClassAll listClassAll={_class} />
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
    _class: state._class,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListClassAll: (name_courses, name_class, status_class) => {
      dispatch(
        actRequestListClassAll(name_courses, name_class, status_class, true)
      );
    },
    onGetStatisticClassAll: () => {
      dispatch(actRequestGetStatisticClassAll());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClassAll));
