import React from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import Loading from "../loading/loading";
import SeachDiploma from "../../components/diploma/seachDiploma.component";
import ListDiploma from "../../components/diploma/listDiploma.component";

import { actRequestListDiploma } from "../../actions/diploma.action";

class Diploma extends React.Component {
  componentDidMount() {
    this.props.onListDiploma("", "", 1, 10, true);
  }

  onChange_pagination = (pagination) => {
    this.props.onListDiploma("", "", pagination.current, 10, false);
  };

  render() {
    let { inforAdmin, diploma } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    return (
      <div>
        {diploma.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_DIPLOMA") ? null : (
              <div>
                <Row>
                  <Col span={24} className="seach-main-content">
                    <SeachDiploma />
                  </Col>
                </Row>
                <Row className="staff-table main-content">
                  <Row className="title-main-content">
                    <Col span={12}>
                      <h2>Danh sách chứng chỉ</h2>
                    </Col>
                  </Row>
                  <ListDiploma
                    listDiploma={diploma.listDiploma ? diploma.listDiploma : {}}
                    onChange_pagination={this.onChange_pagination}
                  />
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
    diploma: state.diploma,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListDiploma: (name, email, page, limit, loading) => {
      dispatch(actRequestListDiploma(name, email, page, limit, loading));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Diploma);
