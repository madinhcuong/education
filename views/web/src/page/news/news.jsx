import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import Loading from "../loading/loading";

import NewByIDTopic from "../../components/news/listNewsByIdTopic.component";
import { actRequestGetListNewsByIdTopic } from "../../actions/news.action";

class PageNews extends React.Component {
  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onGetListNewsByIdTopic(id, 1);
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
            <NewByIDTopic newsByIdTopic={news.listNewsByIdTopic ? news.listNewsByIdTopic : {}} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    news: state.news
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetListNewsByIdTopic: (id_topic, page) => {
      dispatch(actRequestGetListNewsByIdTopic(id_topic, page, true));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PageNews));
