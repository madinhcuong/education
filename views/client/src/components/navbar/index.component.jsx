import React, { Component } from "react";
import { Drawer, Button, Icon, Avatar, Badge, Affix } from "antd";
import { Link, withRouter } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import * as url from "../../utils/url_api";
import { connect } from "react-redux";

import RightMenu from "./rightMenu.component";

import { actRequestCheckClickNoti } from "../../actions/notification";

class Navbar extends Component {
  state = {
    visible: false,
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClickNoti = () => {
    this.props.onCheckClickNoti();
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onChangePage = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    let { onLogOut, inforClient, listNoti } = this.props;

    return (
      <Affix>
        <nav className="menu">
          <Link to="/client">
            <div className="menu__logo">
              <img src={logo} alt="logo"></img>
              <span>Trí Nguyễn</span>
            </div>
          </Link>
          <div></div>
          <div className="menu__container">
            <div className="menu_rigth">
              <RightMenu
                mode="horizontal"
                onLogOut={onLogOut}
                inforClient={inforClient}
                listNoti={listNoti}
              />
            </div>
            <Link to="/client/thong-bao">
              <Badge
                onClick={this.onClickNoti}
                count={listNoti.countNotiNew ? listNoti.countNotiNew : 0}
                key="noti"
                className="icon-noti-mobile"
              >
                <Icon type="bell" />
              </Badge>
            </Link>
            <Button className="menu__mobile-button" onClick={this.showDrawer}>
              <Icon type="menu-fold" />
            </Button>
            <Drawer
              placement="right"
              className="menu_drawer"
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
            >
              <div className="menu_drawer-avatar">
                <Avatar
                  src={`${url.api_url_image}/${
                    inforClient && inforClient.image
                  }`}
                />
                <span style={{ padding: "5px", fontWeight: "bold" }}>
                  {inforClient && inforClient.name}
                </span>
              </div>
              <RightMenu
                mode="inline"
                onLogOut={onLogOut}
                inforClient={inforClient}
                listNoti={listNoti}
                onClick_drawer={this.onChangePage}
              />
            </Drawer>
          </div>
        </nav>
      </Affix>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onCheckClickNoti: () => {
      dispatch(actRequestCheckClickNoti());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
