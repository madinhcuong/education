import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Badge, Icon, Dropdown, Avatar, Button } from "antd";
import * as url from "../../utils/url_api";
import Moment from "react-moment";
import { connect } from "react-redux";

import {
  actRequestChangeStatusNoti,
  actRequestCheckClickNoti,
  actRequestGetInforNoti,
} from "../../actions/notification";

import { actRequestUpdateVeriTransferScore } from "../../actions/wallet.action";

class RightMenu extends Component {
  state = {
    visible: false,
  };

  // -- close form noti khi có scroll
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = (event) => {
    if (event) this.onCloseForm();
  };
  // -- end close form noti khi có scroll

  handleVisibleChange = (visible) => {
    this.setState({ visible });
  };

  onChangeStatusNoti = (id) => {
    this.props.onChangeStatusNoti(id);
    this.props.onGetInforNoti(id, true);
    this.setState({ visible: false });
  };

  onClickNoti = () => {
    this.props.onCheckClickNoti();
  };

  onCloseForm = () => {
    this.setState({ visible: false });
  };

  // onClick button noti transfer score
  onClick_TransferScore = async (id_noti, type) => {
    await this.props.onUpdateVeriTransferScore(id_noti, { type: type });
    await this.onCloseForm();
  };

  render() {
    let {
      location,
      onLogOut,
      inforClient,
      listNoti,
      onClick_drawer,
    } = this.props;
    let pathname = location.pathname;

    let arr_noti = null;
    if (listNoti.docs && listNoti.docs.length > 0) {
      arr_noti = listNoti.docs.map((item, key) => {
        if (key <= 4) {
          if (
            item.type_noti === "SCORE_BORROW" &&
            item.status_score_transfer === "PENDING"
          )
            return (
              <li key={key}>
                <span>
                  {
                    <Moment format="HH:mm - DD/MM/YYYY">
                      {item.createdAt}
                    </Moment>
                  }
                </span>
                <div>
                  <b>{item.title}:</b>{" "}
                  {item.description.length > 70
                    ? `${item.description.slice(0, 70)}...`
                    : item.description}
                </div>
                {item.status_score_transfer !== "PENDING" ? null : (
                  <div className="noti-li-score-borrow">
                    <Button
                      onClick={() =>
                        this.onClick_TransferScore(item._id, "APPROVE")
                      }
                      className="noti-li-score-borrow-xn"
                      shape="round"
                      size="small"
                    >
                      Xác nhận
                    </Button>
                    <Button
                      onClick={() =>
                        this.onClick_TransferScore(item._id, "REJECT")
                      }
                      className="noti-li-score-borrow-tc"
                      shape="round"
                      size="small"
                    >
                      Từ chối
                    </Button>
                  </div>
                )}
              </li>
            );
          return (
            <li
              onClick={() => this.onChangeStatusNoti(item._id)}
              key={key}
              style={{
                backgroundColor: item.status === "INACTIVE" ? "#e8e8e885" : "",
              }}
            >
              <Link to={`/client/chi-tiet-thong-bao/${item._id}`}>
                <span>
                  {
                    <Moment format="HH:mm - DD/MM/YYYY">
                      {item.createdAt}
                    </Moment>
                  }
                </span>
                <div>
                  <b>{item.title}:</b>{" "}
                  {item.description.length > 70
                    ? `${item.description.slice(0, 70)}...`
                    : item.description}
                </div>
              </Link>
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
            <Link to="/client/thong-bao"> Xem tất cả</Link>
          </li>
        </div>
      </Menu>
    );

    const menu_drop = (
      <Menu className="drop-avatar">
        <Menu.Item key="5">
          <Link rel="noopener noreferrer" to="/client/thay-doi-mat-khau">
            Đổi mật khẩu
          </Link>
        </Menu.Item>
        <Menu.Item key="4" className="drop-logout">
          <p onClick={onLogOut} rel="noopener noreferrer">
            Đăng xuất
          </p>
        </Menu.Item>
      </Menu>
    );

    return (
      <Menu
        onClick={onClick_drawer}
        mode={this.props.mode}
        defaultSelectedKeys={[`${pathname}`]}
      >
        <Menu.Item key="/">
          <Link to="/client">
            <Icon type="home" />
            Trang chủ
          </Link>
        </Menu.Item>

        <Menu.Item key="/client/lich-hoc">
          <Link to="/client/lich-hoc">
            <Icon type="schedule" />
            Lịch học
          </Link>
        </Menu.Item>

        <Menu.Item key="/client/vi-tien">
          <Link to="/client/vi-tien">
            <Icon type="wallet" />
            Điểm tích lũy
          </Link>
        </Menu.Item>

        <Menu.Item
          key="onLogOut"
          onClick={onLogOut}
          className="menu-item-logout"
        >
          <Icon type="logout" />
          Đăng xuất
        </Menu.Item>

        <Menu.Item key="badge-noti" className="noti-icon">
          <span className="badge-noti">
            <Dropdown
              overlay={menu_noti}
              trigger={["click"]}
              placement="bottomRight"
              onClick={this.onClickNoti}
              visible={this.state.visible}
              onVisibleChange={this.handleVisibleChange}
            >
              <Badge
                count={listNoti.countNotiNew ? listNoti.countNotiNew : 0}
                key="44454"
              >
                <Icon type="bell" />
              </Badge>
            </Dropdown>
          </span>
        </Menu.Item>
        <span className="avatar-header" key="vffbb">
          <Dropdown overlay={menu_drop} placement="bottomRight">
            <Avatar
              src={`${url.api_url_image}/${inforClient && inforClient.image}`}
            />
          </Dropdown>
        </span>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onChangeStatusNoti: (id) => {
      dispatch(actRequestChangeStatusNoti(id));
    },

    onCheckClickNoti: () => {
      dispatch(actRequestCheckClickNoti());
    },

    onGetInforNoti: (id, loading) => {
      dispatch(actRequestGetInforNoti(id, loading));
    },

    // tu choi , xác nhân chuyên tiền
    onUpdateVeriTransferScore: (id_noti, body) => {
      dispatch(actRequestUpdateVeriTransferScore(id_noti, body));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RightMenu));
