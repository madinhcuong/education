import React from "react";
import { connect } from "react-redux";
import { Row, Col,Icon } from "antd";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";
import Loading from "../../page/loading/loading";

import { actRequestGetNewsById } from "../../actions/news.action";

class InforNewsById extends React.Component {
  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onGetNewsById(id, true);
    }
  }
  render() {
    let { news } = this.props;

    return (
      <div>
        {news.loading ? (
          <Row>
            <Col span={24}>
              <Loading />
            </Col>
          </Row>
        ) : (
          <div>
            <div className="_new-content-news">
              <Row>
                <Col span={24}>
                  <div className="_new-head-time">
                    <span>
                      <Icon type="tag" />
                      <Moment format="HH:mm - DD/MM/YYYY">
                        {news.newById && news.newById.createdAt}
                      </Moment>
                    </span>
                  </div>
                  <div className="title-head-news">
                    <h1>{news.newById && news.newById.name_news}</h1>
                  </div>
                </Col>
              </Row>
              <Row>
                <div
                  className="news-content"
                  dangerouslySetInnerHTML={{
                    __html: news.newById && news.newById.content,
                  }}
                />
              </Row>
            </div>
          </div>
        )}
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
  return {
    onGetNewsById: (id_topic, loading) => {
      dispatch(actRequestGetNewsById(id_topic, loading));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InforNewsById));
