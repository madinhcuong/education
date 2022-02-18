import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Layout, Modal, BackTop, Icon, notification } from "antd";
import * as socket from "../../utils/socket_Client";

import Routes from "../../routes/dashboard";
import Navbar from "../../components/navbar/index.component";
import { actRequestInforClient } from "../../actions/inforClient.action";
import { actRequestGetListNoti } from "../../actions/notification";

const { confirm } = Modal;
class Dashboard extends React.Component {
  state = {
    collapsed: false,
    isLogin: true,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentDidMount() {
    if (!localStorage.getItem("access_token_client")) {
      this.props.history.push("/client/dang-nhap");
    } else {
      this.props.onInforClient(false);
      this.props.onGetListNoti(1, 10, true);

      // Khi có thông báo mới get lại list noti
      socket.url_socket.on("GET_LIST_NOTI", (message) => {
        this.props.onInforClient(false);
        this.props.onGetListNoti(1, 10, false);

        notification.open({
          className: "noti-login-success",
          message: "Thông báo",
          description: `${message}`,
         // duration: 0,
        });
      });
    }
  }

  onLogOut = () => {
    confirm({
      title: "Bạn có muốn đăng xuất không ?",
      content: "",
      okText: "Đăng xuất",
      maskClosable: true,
      onOk: () => {
        // localStorage.clear();
        localStorage.removeItem("access_token_client");
        this.setState({
          isLogin: false,
        });
      },
      onCancel() {},
      okButtonProps: { type: "danger", ghost: true },
      centered: true,
    });
  };

  render() {
    let { inforClient, noti } = this.props;
    const { Content } = Layout;

    if (!this.state.isLogin) {
      return <Redirect to="/client/dang-nhap" />;
    }

    return (
      <div>
        <Row>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 22, offset: 1 }}
            lg={{ span: 18, offset: 3 }}
            xl={{ span: 18, offset: 3 }}
            className="layout-content"
          >
            <Navbar
              onLogOut={this.onLogOut}
              inforClient={inforClient ? inforClient.infoClient : {}}
              listNoti={noti.listNoti && noti.listNoti}
            />
            <Content>
              <Switch>
                <Switch>{ShowContentMenu(Routes)}</Switch>
              </Switch>
            </Content>
            <BackTop className="back-top">
              <Icon type="up" />
            </BackTop>
          </Col>

          {/* <strong style={{ color: "rgba(64, 64, 64, 0.6)" }}> gray </strong> */}
        </Row>
      </div>
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

const mapStateToProps = (state) => {
  return {
    inforClient: state.inforClient,
    noti: state.noti,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onInforClient: (loading) => {
      dispatch(actRequestInforClient(loading));
    },

    onGetListNoti: (page, limit, loading) => {
      dispatch(actRequestGetListNoti(page, limit, loading));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));
