import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Row, Col, Button } from "antd";
import Loading from "../loading/loading";
import ListNews from "../../components/news/listNews.component";
import SeachNews from "../../components/news/seachNews.component";

import { actRequestListNews } from "../../actions/news.action";
class News extends React.Component {
  componentDidMount() {
    this.props.onListNews("", "");
  }

  render() {
    let { news, inforAdmin } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";

    return (
      <div>
        {news.success ? (
          <Loading />
        ) : (
          <div>
            {!permissions.includes("READ_NEWS") ? null : (
              <div>
                <Row>
                  <Col span={24} className="seach-main-content">
                    <SeachNews />
                  </Col>
                </Row>
                <Row className="staff-table main-content">
                  <Row className="title-main-content">
                    <Col span={12}>
                      <h2>Nội dung tin tức</h2>
                    </Col>
                    <Col span={12} className="staff-addStaff">
                      {!permissions.includes("CREATE_ADMIN") ? null : (
                        <Link to="/admin/tin-tuc/them-noi-dung-tin-tuc">
                          <Button className="btn-add-new">Tạo mới</Button>
                        </Link>
                      )}
                    </Col>
                  </Row>
                  <ListNews listNews={news.new.length > 0 ? news.new : []} />
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
    onListNews: (name_news, name_topic) => {
      dispatch(actRequestListNews(name_news, name_topic, true));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(News));
