import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import Loading from "../loading/loading";

import ListInforTraining from "../../components/inforTraining/listInforTraining.component";
import { actRequestListTrainingByIdClass } from "../../actions/inforTraining.action";

class PageInforTraining extends React.Component {
  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onListTrainingByIdClass(id, 1);
    }
  }
  render() {
    let { inforTraining } = this.props;
    return (
      <div>
        {inforTraining.loading ? (
          <Row>
            <Col span={24}>
              <Loading />
            </Col>
          </Row>
        ) : (
          <div>
            <ListInforTraining
              list_trainingById={
                inforTraining.ListTrainingById ? inforTraining.ListTrainingById : {}
              }
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    inforTraining: state.inforTraining
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListTrainingByIdClass: (id_training, page) => {
      dispatch(actRequestListTrainingByIdClass(id_training, page, true));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PageInforTraining));
