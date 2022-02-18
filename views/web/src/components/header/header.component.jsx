import React, { Component } from "react";
import { Row, Col, Icon } from "antd";

import "../../assets/css/responsive.css";
import logoa from "../../assets/img/logoa.png";

import Navbar from "../navbar/navbar.component";

class Header extends Component {
  render() {
    return (
      <div>
        <header>
          <div className="_header-content">
            <Row>
              <div className="header-layout">
                <Col span={12}>
                  <a href="/">
                    <img src={logoa} alt="logo" />
                  </a>
                </Col>
                <Col span={12}>
                  <div className="header-contact">
                    <div>
                      <Icon type="phone" />
                      Hotline: 0989 666 888
                    </div>
                    <div>
                      <Icon type="mail" />
                      <span>Email: tringuyeneducation@gmail.com</span>
                    </div>
                  </div>
                </Col>
              </div>
            </Row>
          </div>
          {/* ----- Navbar ----- */}
          <Navbar />
        </header>
      </div>
    );
  }
}

export default Header;
