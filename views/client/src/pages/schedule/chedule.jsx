import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Tabs, Icon } from "antd";
import Loading from "../loading/loading";

import ScheduleComponent from "../../components/schedule/shedule.component";
import ListScore from "../../components/schedule/listScore.component";

import {
  actRequestScheduleClass,
  actRequestScoreClass
} from "../../actions/class.action";

class Schedule extends React.Component {
  componentDidMount() {
    this.props.onScheduleClass();
    this.props.onScoreClass(1, 10, true);
  }

  onChange_pagination = pageNumber => {
    this.props.onScoreClass(pageNumber, 10, true);
  };

  render() {
    const { TabPane } = Tabs;
    let { _class } = this.props;
    return (
      <div>
        {_class.loading ? (
          <Loading />
        ) : (
          <div>
            <Row>
              <Tabs defaultActiveKey="1" style={{ marginTop: "40px" }}>
                <TabPane
                  tab={
                    <span>
                      <Icon type="schedule" />
                      Thời khóa biểu
                    </span>
                  }
                  key="1"
                >
                  <ScheduleComponent
                    _class={_class.scheduleClass ? _class.scheduleClass : []}
                  />
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <Icon type="file-add" />
                      Danh sách điểm
                    </span>
                  }
                  key="2"
                >
                  <ListScore
                    _class={_class.scoreClass ? _class.scoreClass : {}}
                    onChange_pagination={this.onChange_pagination}
                  />
                </TabPane>
              </Tabs>
            </Row>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    _class: state._class
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onScheduleClass: () => {
      dispatch(actRequestScheduleClass(true));
    },

    onScoreClass: (page, limit, loading) => {
      dispatch(actRequestScoreClass(page, limit, loading));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Schedule));
