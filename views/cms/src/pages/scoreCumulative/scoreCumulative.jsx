import React from "react";
import { withRouter } from "react-router-dom";
import { Row, Col } from "antd";
import { connect } from "react-redux";

import Loading from "../loading/loading";
import { actRequestListScoreCumulative } from "../../actions/scoreCumulative.action";
import SeachScoreCumulative from "../../components/scoreCumulative/seachScoreCumulative.component";
import ListScoreCumulative from "../../components/scoreCumulative/listScoreCumulative.component";

class ScoreCumulative extends React.Component {
  componentDidMount() {
    this.props.onListScoreCumulative("", "");
  }

  render() {
    let { inforAdmin, scoreCumulative } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    return (
      <div>
        {scoreCumulative.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_SCORE_CUMULATIVE") ? null : (
              <div>
                <Row>
                  <Col span={24} className="seach-main-content">
                    <SeachScoreCumulative />
                  </Col>
                </Row>
                <Row className="staff-table main-content">
                  <Row className="title-main-content">
                    <Col span={12}>
                      <h2>Danh sách điểm tích lũy</h2>
                    </Col>
                  </Row>
                  <ListScoreCumulative
                    listScoreCumulative={
                      scoreCumulative.list_score.length > 0
                        ? scoreCumulative.list_score
                        : []
                    }
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
    scoreCumulative: state.scoreCumulative,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListScoreCumulative: (name, email) => {
      dispatch(actRequestListScoreCumulative(name, email, true));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ScoreCumulative));
