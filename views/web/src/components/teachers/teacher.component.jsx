import React, { Component } from "react";

import "../../assets/css/teacher.css";
import t1 from "../../assets/img/teacher/t1.jpg";

class Teacher extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-training col-training-ti">
              <h3 className="col-training-title">Đội ngũ giáo viên</h3>
              <p className="col-training-thanh"></p>
            </div>
          </div>
        </div>
        {/* ----------- */}
        <div className="container-fluid teacher-row">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 teacher-img">
              <div className="row">
                <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                  <div className="teacher-box">
                    <a className="teacher-hover" href="true">
                      <img src={t1} alt="t1"></img>
                    </a>
                  </div>
                </div>
                <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                  <div className="teacher-box">
                    <a className="teacher-hover" href="true">
                      <img src={t1} alt="t1"></img>
                    </a>
                  </div>
                </div>
                <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                  <div className="teacher-box">
                    <a className="teacher-hover" href="true">
                      <img src={t1} alt="t1"></img>
                    </a>
                  </div>
                </div>

                <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                  <div className="teacher-box">
                    <a className="teacher-hover" href="true">
                      <img src={t1} alt="t1"></img>
                    </a>
                  </div>
                </div>
                <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                  <div className="teacher-box">
                    <a className="teacher-hover" href="true">
                      <img src={t1} alt="t1"></img>
                    </a>
                  </div>
                </div>
                <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                  <div className="teacher-box">
                    <a className="teacher-hover" href="true">
                      <img src={t1} alt="t1"></img>
                    </a>
                  </div>
                </div>
                <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                  <div className="teacher-box">
                    <a className="teacher-hover" href="true">
                      <img src={t1} alt="t1"></img>
                    </a>
                  </div>
                </div>
                <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                  <div className="teacher-box">
                    <a className="teacher-hover" href="true">
                      <img src={t1} alt="t1"></img>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 teacher-content">
              <p>
                Chung tôi luôn sẵn sàng hỗ trợ để bạn hiểu rõ <br></br> và ứng
                dụng kiến thức vào thực tế !!!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Teacher;
