import React from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "antd";
import { Link, withRouter } from "react-router-dom";
import Loading from "../../pages/loading/loading";
import { actRequestNewsById } from "../../actions/news.action";
import * as url from "../../utils/url_api";

class InforNews extends React.Component {
  state = {
    newsById: "",
  };

  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onInforNews(id);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.news.newsById) {
      this.setState({
        newsById: nextProps.news.newsById,
      });
    }
  }

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    let { inforAdmin, news } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    return (
      <div>
        {news.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_NEWS") ? null : (
              <div className="main-content">
                <Row>
                  <Col span={11}>
                    <div>
                      Chủ đề:
                      <h3>
                        {news.newById.id_topic &&
                          news.newById.id_topic.name_topic}
                      </h3>
                    </div>
                    <div style={{ paddingTop: "20px" }}>
                      Tiêu đề:<h4>{news.newById && news.newById.name_news}</h4>
                    </div>
                  </Col>
                  <Col span={11} offset={2}>
                    <h4>Ảnh bìa:</h4>
                    {news.newById && news.newById.image ? (
                      <div className="inforTraining-img">
                        <img
                          src={`${url.api_url}/${news.newById.image}`}
                          alt={news.newById.image}
                        ></img>
                      </div>
                    ) : null}
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ paddingTop: "25px" }}>
                    {news.newById && news.newById.content ? (
                      <div
                        className="news-infor"
                        dangerouslySetInnerHTML={{
                          __html: news.newById.content,
                        }}
                      />
                    ) : null}
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="btn-component">
                    {!permissions.includes("UPDATE_NEWS") ? null : (
                      <Link
                        to={
                          news.newById
                            ? `/admin/tin-tuc/sua-noi-dung-tin-tuc/${news.newById._id}`
                            : ""
                        }
                      >
                        <Button className="btn-edit">Chỉnh sửa</Button>
                      </Link>
                    )}
                    <Button onClick={this.onClose} className="btn-close">
                      Hoàn tác
                    </Button>
                  </Col>
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
    news: state.news,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onInforNews: (id) => {
      dispatch(actRequestNewsById(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InforNews));
