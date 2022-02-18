import React from "react";
import {
  Layout,
  Menu,
  Icon,
  Dropdown,
  Button,
  Badge,
  Row,
  Col,
  Avatar,
  //  notification,
} from "antd";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import * as url from "../../utils/url_api";
import Moment from "react-moment";
import av2 from "../../assets/img/avatar/av2.png";
import * as socket from "../../utils/socket_Client";
import { CheckUrl,Breadcrumb } from "../../helpers/breadcrumb.helper";

import {
  actRequestGetListNoti,
  actRequestCheckClickNoti,
} from "../../actions/noti.action";

class Headers extends React.Component {
  state = {
    visible: false,
  };

  componentDidMount() {
    this.props.onGetListNoti(1, 10, true);

    // Khi có thông báo mới get lại list noti
    socket.url_socket.on("GET_LIST_NOTI", (message) => {
      // notification.info({
      //   message: "Thông báo !",
      //   description: `${message}`,
      //   placement: "bottomRight",
      //   duration: 3,
      //   className: "custom-noti",
      // });

      this.props.onGetListNoti(1, 10, false);
    });
  }

  handleVisibleChange = (visible) => {
    this.setState({ visible });
  };

  onClickNoti = () => {
    this.props.onCheckClickNoti();
  };

  onCloseForm = () => {
    this.setState({ visible: false });
  };

  render() {
    const { Header } = Layout;
    let { inforAdmin, onInforAdmin, noti } = this.props;
    let permissions = inforAdmin ? inforAdmin.permissions : "";
    let url_link = window.location.href;

    let avatar =
      onInforAdmin && onInforAdmin.avatar
        ? `${url.api_url}/${onInforAdmin.avatar}`
        : av2;

    const menu_drop = (
      <Menu className="menu-drop-header">
        <Menu.Item>
          <Link rel="noopener noreferrer" to="/admin/thong-tin-nguoi-dung">
            + Thông tin
          </Link>
        </Menu.Item>
        <Menu.Item className="menu-drop-header-logout">
          <p rel="noopener noreferrer" onClick={this.props.onLogOut}>
            + Đăng xuất
          </p>
        </Menu.Item>
      </Menu>
    );

    let arr_noti = null;
    if (noti.listNoti.docs && noti.listNoti.docs.length > 0) {
      arr_noti = noti.listNoti.docs.map((item, key) => {
        if (key <= 4) {
          return (
            <li key={key}>
              <span>
                <Moment format="HH:mm - DD/MM/YYYY">{item.createdAt}</Moment>
              </span>

              <div>
                <b>{item.title}:</b>{" "}
                {item.description.length > 100
                  ? `${item.description.slice(0, 100)}...`
                  : item.description}
              </div>
            </li>
          );
        } else return null;
      });
    }

    const menu_noti = (
      <Menu className="menu-noti-header">
        <div className="notification-title">Thông báo</div>
        <div className="notification">
          {arr_noti}

          <li
            onClick={() => this.onCloseForm()}
            style={{ textAlign: "center", listStyle: "none" }}
          >
            <Link to="/admin/thong-bao"> Xem tất cả</Link>
          </li>
        </div>
      </Menu>
    );

    return (
      <div>
        <Row>
          <Header className="header-nav">
            <Col span={12}>
              <span className="header-nav-name">
                {Breadcrumb(CheckUrl(url_link)).icon}
                {Breadcrumb(CheckUrl(url_link)).link}
              </span>
              <Icon
                className="trigger"
                // type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                type={this.props.onState ? "menu-unfold" : "menu-fold"}
                onClick={this.props.onToggle}
              />
            </Col>
            <Col span={12} className="header-right-col">
              <div className="header-right">
                {!permissions.includes("READ_NOTI") ? null : (
                  <Dropdown
                    overlay={menu_noti}
                    trigger={["click"]}
                    onClick={this.onClickNoti}
                    visible={this.state.visible}
                    onVisibleChange={this.handleVisibleChange}
                  >
                    <Badge
                      count={
                        noti.listNoti.addFields ? noti.listNoti.addFields : 0
                      }
                      className="badge-noti"
                    >
                      <a href="true" className="head-example">
                        <Icon type="bell" />
                      </a>
                    </Badge>
                  </Dropdown>
                )}
                <Avatar src={avatar} />
                <Dropdown overlay={menu_drop} placement="topLeft">
                  <Button>{onInforAdmin.fullName}</Button>
                </Dropdown>
              </div>
            </Col>
          </Header>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inforAdmin: state.inforAdmin,
    noti: state.noti,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetListNoti: (page, limit, loading) => {
      dispatch(actRequestGetListNoti(page, limit, loading));
    },

    onCheckClickNoti: () => {
      dispatch(actRequestCheckClickNoti());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Headers));
