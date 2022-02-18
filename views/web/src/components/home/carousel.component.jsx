import React, { Component } from "react";
import { Row, Col, Carousel } from "antd";
import * as url from "../../utils/url_api";

class CarouselImage extends Component {
  render() {
    let { carousel } = this.props;

    let data_carousel = carousel.map((item, key) => {
      return (
        <div key={key}>
          <img
            alt={item.image}
            src={`${url.api_url}/${item.image && item.image}`}
          ></img>
        </div>
      );
    });

    return (
      <div>
        <Row>
          <Col span={24} className="_carousel">
            <Carousel autoplay>{data_carousel}</Carousel>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CarouselImage;
