import React, { Component } from "react";

import "../../assets/css/report.css";
import data_report from "../constants/report_home";

class Report extends Component {
  render() {
    let map_report = data_report.map((item, key) => {
      return (
        <div className="col-6 col-xs-7 col-sm-6 col-md-3 report-col" key={key}>
          <div>{item.icon}</div>
          <div className="title-calendar"> {item.title}</div>
          <div> {item.content}</div>
        </div>
      );
    });
    return (
      <div>
        <div className="report">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h4 className="report-title">
                  Cám ơn các bạn đã tin tưởng và đồng hành cùng chúng tôi !!!
                </h4>
              </div>
            </div>
          </div>
          {/* ----------- */}

          <div className="report">
            <div className="container">
              <div className="row">{map_report}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Report;
