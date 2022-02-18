import React, { Component } from "react";
import { Icon } from "antd";

import "../../assets/css/footer.css";

import logo from "../../assets/img/logo.png";

class Footer extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = { counter: 0 };
  //   }
  render() {
    return (
      <div>
        <footer id="footer-part">
          <div className="footer-top pt-10 pb-50">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6 footer-col">
                  <div className="footer-about mt-40">
                    <div className="footer-logo">
                      <img src={logo} alt="logo" />
                    </div>
                    <div>
                      <p className="title-tt">
                        TRUNG TÂM ĐÀO TẠO TIN HỌC TRÍ NGUYỄN
                      </p>
                    </div>
                    <i style={{ marginTop: "10px", color: "#9ed591" }}>
                      TRÍ NGUYỄN là nơi đào tạo chất lượng và cung cấp các dịch
                      vụ phần mềm đáp ứng các nhu cầu của người dùng.
                    </i>
                  </div>
                  {/* footer about */}
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="footer-address mt-40">
                    <div className="footer-title pb-25">
                      <h6>LIÊN HỆ</h6>
                    </div>
                    <ul>
                      <li>
                        <div className="cont">
                          <label>
                            {" "}
                            <Icon type="home" />
                          </label>
                          <p>127/5 Lê Văn Sỹ, TP. Hồ Chí Minh</p>
                        </div>
                      </li>
                      <li>
                        <div className="cont">
                          <label>
                            {" "}
                            <Icon type="phone" />
                          </label>
                          <p>0989 666 888</p>
                        </div>
                      </li>
                      <br></br>
                      <li>
                        <div className="cont">
                          <label>
                            {" "}
                            <Icon type="mail" />
                          </label>
                          <p>tringuyeneducation@gmail.com</p>
                        </div>
                      </li>
                    </ul>
                  </div>{" "}
                  {/* footer address */}
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6 footer-csbm">
                  <div className="footer-link support mt-40">
                    <div className="footer-fan pb-25">
                      <h6>CHÍNH SÁCH QUY ĐỊNH CHUNG</h6>
                    </div>
                    <ul>
                      <li>
                        <div className="cont">
                          <label>
                            <Icon type="check" />
                          </label>
                          <p>Điều khoản dịch vụ</p>
                        </div>
                      </li>
                      <li>
                        <div className="cont">
                          <label>
                            <Icon type="check" />
                          </label>
                          <p>Chính sách bảo mật</p>
                        </div>
                      </li>
                      <li>
                        <div className="cont">
                          <label>
                            <Icon type="menu-unfold" />
                          </label>
                          <p>Số ĐKKD 4109000014 cấp ngày 31/08/2010</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
