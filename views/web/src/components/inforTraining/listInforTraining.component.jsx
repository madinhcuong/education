import React from "react";
import { connect } from "react-redux";
import { Row, Col, Pagination, Card } from "antd";
import { withRouter,Link } from "react-router-dom";
import * as url from "../../utils/url_api";

import { actRequestListTrainingByIdClass } from "../../actions/inforTraining.action";

class ListInforTraining extends React.Component {
  state = { page: 1 };
  onChangePage = pageNumber => {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.setState({
        page: pageNumber
      });

      this.props.onListTrainingByIdClass(id, pageNumber, true);
    }
  };

  render() {
    let { list_trainingById } = this.props;
    const { Meta } = Card;

    let data_training =
      list_trainingById.docs && list_trainingById.docs.length > 0
        ? list_trainingById.docs
        : [];

    let array_training = data_training.map((item, key) => {
      return (
        <div key={key}>
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={6}
            className="column-infortraining"
          >
            <div className="infortraining-Card">
            <Link to={`/dao-tao/thong-tin-khoa-hoc/${item._id}`}>
                <Card
                  cover={
                    <img
                      src={`${url.api_url}/${item.image && item.image}`}
                      alt={`${item.image && item.image}`}
                    />
                  }
                >
                  <Meta title={item.name} />
                </Card>
              </Link>
            </div>
          </Col>
        </div>
      );
    });

    return (
      <div>
        {list_trainingById.docs && list_trainingById.docs.length < 1 ? (
          <div className="infortraining-null">
            <p>Không có thông tin đào tạo</p>
          </div>
        ) : (
          <div>
            <Row>
              <Col span={24}>
                <div className="title-head">
                  <h1>
                    {data_training[0] && data_training[0].id_training.name}
                  </h1>
                  <div className="under_title"></div>
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>{array_training}</Row>
            <Row>
              <Col span={24} className="infortraining-Pagination">
                <Pagination
                  onChange={this.onChangePage}
                  defaultCurrent={list_trainingById.page}
                  total={list_trainingById.totalDocs}
                />
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
    inforTraining: state.inforTraining
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListTrainingByIdClass: (id_training, page, loading) => {
      dispatch(actRequestListTrainingByIdClass(id_training, page, loading));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListInforTraining));
