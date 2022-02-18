import React, { Component } from "react";
import "../../assets/css/utilitie.css";
import { Link } from "react-router-dom";
import * as url from "../../utils/url_api";
import { Row, Col, Icon } from "antd";
import Moment from "react-moment";

class News extends Component {
  render() {
    let { news } = this.props;

    let list_news = news.map((item, key) => {
      return (
        <Col
          key={key}
          xl={{ span: 12 }}
          lg={{ span: 12 }}
          md={{ span: 12 }}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          className="news-col"
        >
          <Row className="news-row-content">
            <Col
              xl={{ span: 8 }}
              lg={{ span: 8 }}
              md={{ span: 8 }}
              xs={{ span: 9 }}
              sm={{ span: 8 }}
            >
              <Link to={`/tin-tuc/chi-tiet/${item._id}`}>
                <div className="news-image">
                  <img
                    src={`${url.api_url}/${item.image && item.image}`}
                    alt={`${item.image && item.image}`}
                  />
                </div>
              </Link>
            </Col>
            <Col
              xl={{ span: 16 }}
              lg={{ span: 16 }}
              md={{ span: 16 }}
              xs={{ span: 15 }}
              sm={{ span: 16 }}
            >
              <Link to={`/tin-tuc/chi-tiet/${item._id}`}>
                <div className="news-title">
                  <div>
                    <p>{item.name_news}</p>
                  </div>
                  <div>
                    <span>
                      <Icon type="tag" />
                      <Moment format="HH:mm - DD/MM/YYYY">
                        {item.createdAt}
                      </Moment>
                    </span>
                  </div>
                </div>
              </Link>
            </Col>
          </Row>
          {/* <Link to={`/tin-tuc/chi-tiet/${item._id}`}>
            <div className="row new-row">
              <div className="col-5 new-img">
                <img
                  src={`${url.api_url}/${item.image && item.image}`}
                  alt={`${item.image && item.image}`}
                />
              </div>
              <div className="col-7 new-title">
                <p>{truncate(item.name_news, 47)}</p>
              </div>
            </div>
          </Link> */}
        </Col>
      );
    });
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-training col-training-ti">
              <h3 className="col-training-title">Tin tức sự kiện</h3>
              <p className="col-training-thanh"></p>
            </div>
          </div>
        </div>
        {/* ----------- */}
        <div className="container-fluid new-couse">
          <div className="_new-content">
            <Row>{list_news}</Row>
          </div>
        </div>
      </div>
    );
  }
}

export default News;

/* <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 utili_box">
            <div className="row new-row">
              <div className="col-5 new-img">
                <img src={js} alt="icon_1" />
              </div>
              <div className="col-7 new-title">
                <p>Các thư viện Chart JavaScript tốt nhất năm 2019</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 utili_box">
            <div className="row new-row">
              <div className="col-5 new-img">
                <img src={js} alt="icon_1" />
              </div>
              <div className="col-7 new-title">
                <p>Các thư viện Chart JavaScript tốt nhất năm 2019</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 utili_box">
            <div className="row new-row">
              <div className="col-5 new-img">
                <img src={js} alt="icon_1" />
              </div>
              <div className="col-7 new-title">
                <p>Các thư viện Chart JavaScript tốt nhất năm 2019</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 utili_box">
            <div className="row new-row">
              <div className="col-5 new-img">
                <img src={js} alt="icon_1" />
              </div>
              <div className="col-7 new-title">
                <p>Các thư viện Chart JavaScript tốt nhất năm 2019</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 utili_box">
            <div className="row new-row">
              <div className="col-5 new-img">
                <img src={js} alt="icon_1" />
              </div>
              <div className="col-7 new-title">
                <p>Các thư viện Chart JavaScript tốt nhất năm 2019</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 utili_box">
            <div className="row new-row">
              <div className="col-5 new-img">
                <img src={js} alt="icon_1" />
              </div>
              <div className="col-7 new-title">
                <p>Các thư viện Chart JavaScript tốt nhất năm 2019</p>
              </div>
            </div>
          </div> */
