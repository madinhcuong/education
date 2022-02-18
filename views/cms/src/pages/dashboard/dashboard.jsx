import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { Modal, Layout } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { actRequestInforAdmin } from "../../actions/inforUser.action";
import Routes from "../../routes/dashboard";
import Headers from "../../components/headers/header";
import Sliders from "../../components/siders/slider";
import * as socket from "../../utils/socket_Client";
const { Content } = Layout;
const { confirm } = Modal;
class Dashboard extends React.Component {
  state = {
    collapsed: false,
    width: 0,
    isLogin: true,
    name_header: "Trang chủ",
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  componentDidMount() {
    if (!localStorage.getItem("access_token")) {
      this.props.history.push("/admin/dang-nhap");
    } else {
      this.updateWindowDimensions();
      window.addEventListener("resize", this.updateWindowDimensions);

      this.props.onInforAdmin();

      // Khi co người đăng ký mới get lại list
      socket.url_socket.on("RESET_CMS_PERMISSION", (message) => {
        return Modal.warning({
          title: `Bộ quyền của bạn vừa thay đổi`,
          content:
            "Vui lòng tải lại trang. Nếu muốn thực hiện các chức năng vui lòng liên hệ với trung tâm",
          onOk: () => {
            window.location = "/admin";
          },
          className: "modal-error",
          okButtonProps: { type: "primary", ghost: true },
          centered: true,
        });
      });

      // Logout account khi khóa tài khoản
      socket.url_socket.on("LOGOUT_ACCOUNT", (message) => {
        return Modal.warning({
          title: `Tài khoản của bạn vừa bị khóa`,
          content:
            "Vui lòng tải lại trang. Nếu muốn thực hiện các chức năng vui lòng liên hệ với trung tâm",
          onOk: () => {
            localStorage.removeItem("access_token");
            this.setState({
              isLogin: false,
            });
          },
          className: "modal-error",
          okButtonProps: { type: "primary", ghost: true },
          centered: true,
        });
      });
    }
  }

  onLogOut = () => {
    return confirm({
      title: "Bạn có muốn đăng xuất không ?",
      content: "",
      okText: "Đăng xuất",
      onOk: () => {
        // localStorage.clear();
        localStorage.removeItem("access_token");
        this.setState({
          isLogin: false,
        });
      },
      cancelText: "Hủy bỏ",
      onCancel() {},
      className: "modal-error",
      okButtonProps: { type: "danger", ghost: true },
      centered: true,
      maskClosable: true,
    });
  };

  render() {
    let { inforAdmin } = this.props;

    if (!this.state.isLogin) {
      return <Redirect to="/admin/dang-nhap" />;
    }
    return (
      <Layout>
        {/* --- Slider */}
          <Sliders
            clickToggle={this.toggle}
            onState={this.state.width <= 768 ? true : this.state.collapsed}
          />
        {/* --- End Slifer */}
        <Layout>
          {/* --- header --- */}
          <Headers
            name_header={this.state.name_header}
            onState={this.state}
            // onToggle={this.toggle}
            onInforAdmin={inforAdmin}
            onLogOut={this.onLogOut}
          />
          {/* --- End header --- */}

          {/* --- Content --- */}
          <Content className="cms-content">
            <Switch>{ShowContentMenu(Routes)}</Switch>
          </Content>
          {/* --- End Content --- */}
        </Layout>
      </Layout>
    );
  }
}

let ShowContentMenu = (Routes) => {
  let result = null;
  if (Routes.length > 0) {
    result = Routes.map((item, index) => {
      return (
        <Route
          key={index}
          path={item.path}
          exact={item.exact}
          component={item.main}
        />
      );
    });
  }
  return result;
};

Dashboard.propTypes = {
  history: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    inforAdmin: state.inforAdmin,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onInforAdmin: () => {
      dispatch(actRequestInforAdmin());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));
