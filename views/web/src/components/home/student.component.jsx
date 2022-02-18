import React, { Component } from "react";

import "../../assets/css/student.css";
import { Row, Carousel } from "antd";
import * as url from "../../utils/url_api";

class Student extends Component {
  render() {
    const { listPerceptions } = this.props;

    let data_perceptions =
      listPerceptions.length <= 0
        ? null
        : listPerceptions.map((item, key) => {
            return (
              <div key={key}>
                <div className="student-img">
                  <img
                    alt={item.image}
                    src={`${url.api_url}/${item.image && item.image}`}
                    className=""
                  ></img>
                </div>
                <div className="student-des">
                  <div className="student-des-name">
                    <p>Học viên: {item.name}</p>
                  </div>
                  <div className="student-desfull">
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            );
          });

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-training col-training-ti">
              <h3 className="col-training-title">Cảm nhận học viên</h3>
              <p className="col-training-thanh"></p>
            </div>
          </div>
        </div>
        {/* ----------- */}
        <div className="student">
          <div className="_new-content">
            <Row>
              <Carousel autoplay>{data_perceptions}</Carousel>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default Student;
