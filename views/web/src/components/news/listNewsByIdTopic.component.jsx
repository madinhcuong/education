import React from "react";
import { connect } from "react-redux";
import { Row, Col, Pagination, Card } from "antd";
import { withRouter, Link } from "react-router-dom";
import * as url from "../../utils/url_api";
import { actRequestGetListNewsByIdTopic } from "../../actions/news.action";

class NewByIDTopic extends React.Component {
  state = { page: 1 };
  onChangePage = pageNumber => {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.setState({
        page: pageNumber
      });

      this.props.onGetListNewsByIdTopic(id, pageNumber, true);
    }
  };

  render() {
    let { newsByIdTopic } = this.props;
    const { Meta } = Card;

    let data_news =
      newsByIdTopic.docs && newsByIdTopic.docs.length > 0
        ? newsByIdTopic.docs
        : [];

    let array_training = data_news.map((item, key) => {
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
              <Link to={`/tin-tuc/chi-tiet/${item._id}`}>
                <Card
                  cover={
                    <img
                      src={`${url.api_url}/${item.image && item.image}`}
                      alt={`${item.image && item.image}`}
                    />
                  }
                >
                  <Meta title={item.name_news} />
                </Card>
              </Link>
            </div>
          </Col>
        </div>
      );
    });

    return (
      <div>
        {newsByIdTopic.docs && newsByIdTopic.docs.length < 1 ? (
          <div className="infortraining-null">
            <p>Không có thông tin đào tạo</p>
          </div>
        ) : (
          <div>
            <Row>
              <Col span={24}>
                <div className="title-head">
                  <h1>{data_news[0] && data_news[0].id_topic.name_topic}</h1>
                  <div className="under_title"></div>
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>{array_training}</Row>
            <Row>
              <Col span={24} className="infortraining-Pagination">
                <Pagination
                  onChange={this.onChangePage}
                  defaultCurrent={newsByIdTopic.page}
                  total={newsByIdTopic.totalDocs}
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
    news: state.news
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetListNewsByIdTopic: (id_topic, page, loading) => {
      dispatch(actRequestGetListNewsByIdTopic(id_topic, page, loading));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NewByIDTopic));
