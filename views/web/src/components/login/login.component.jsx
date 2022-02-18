import React, { Component } from "react";
import  LogoTron  from "../../assets/img/LogoTron.png";
import '../../assets/css/login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  async componentDidMount() {
    this.setState({ image: "../../assets/img/LogoTron.png" });
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="row row-login">
            <div className="col-md-6 col-left">
              <div className="logo">
                <a href="true">
                  {/* //  <img className="image" src={LogoTron} alt="" /> */}
                  <img className="image" src={LogoTron} alt={"LogoTron"} />
                </a>
              </div>
              <div className="content">
                <p className="content1">TRUNG TÂM ĐÀO TẠO TIN HỌC</p>
                <p className="content2"> TRÍ NGUYÊN</p>
              </div>
            </div>
            <div className="col-md-6 col-right">
              <div className="text-sign">
                <p>Login</p>
              </div>
              <form method="POST" action="" className="form-signin">
                <div className="form-label-group">
                  <input
                    type="email"
                    id="inputEmail"
                    className="form-control"
                    placeholder="Username"
                    required
                  />
                </div>
                <div className="form-label-group">
                  <input
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="custom-control custom-checkbox mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck1"
                  >
                    Remember password
                  </label>
                </div>
                <button
                  className="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit"
                >
                  Sign in
                </button>
                <div className="forget-pass-big">
                  <a href="/token" className="forget-pass">
                    Quên mật khẩu
                  </a>
                </div>
              </form>
            </div>
            {/* <div className="logo">
                                <a href="true"><img className="" src={this.props.image} alt="" style={{ width: '21%' }} /></a>
                            </div> */}
            {/* <form id="register-form" method="post" style={{ marginTop: '15px' }}>
                                <label className="name-label"><b>Tài khoản: </b></label>
                                <div className="form-group">
                                    <input type="text" name="username" id="username" className="form-control" placeholder="Tài khoản" />
                                </div>
                                <label className="name-label"><b>Mật khẩu: </b></label>
                                <div className="form-group">
                                    <input type="email" name="email" id="email" className="form-control" placeholder="Mật khẩu" />
                                </div>
                                <div className="">
                                    <button type="submit" className="btn btn-block submit-login"><b>Đăng nhập</b></button>
                                </div>
                                <div>
                                    <p className= "forget-pass">Quên mật khẩu</p>
                                </div>
                            </form> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
