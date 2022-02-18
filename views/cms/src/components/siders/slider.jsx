import React from "react";
import { withRouter } from "react-router-dom";
import { Layout, Menu, Avatar, Icon } from "antd";
import logo from "../../assets/img/logo.png";
import menu from "../../helpers/menu";
import { connect } from "react-redux";
const { Sider } = Layout;
const { SubMenu } = Menu;

class Sliders extends React.Component {
  onChangePage = (data) => {
    this.props.history.push(`${data}`);
  };

  render() {
    let { inforAdmin, location, onState, clickToggle } = this.props;
    let pathname = location.pathname;
    let permission = inforAdmin ? inforAdmin.permissions : "";

    let data_menu = menu.map((index, key) => {
      if (index.isSubMenu && index.permission) {
        let data_subMenu = index.sub_menu;

        let check_permission = false;
        index.permission.map((check, key) => {
          if (permission.includes(`${check}`)) {
            check_permission = true;
          }
          return check_permission;
        });

        if (check_permission) {
          return (
            <SubMenu
              key={index.to}
              title={
                <span>
                  {index.icon}
                  <span>{index.name}</span>
                </span>
              }
            >
              {data_subMenu.map((item, key) => {
                if (
                  item.permission &&
                  permission.includes(`${item.permission}`)
                )
                  return (
                    <Menu.Item key={item.to} className="menu-sub-ul-li">
                      <span>{item.name}</span>
                    </Menu.Item>
                  );
                return null;
              })}
            </SubMenu>
          );
        } else {
          return null;
        }
      }
      if (
        (index.permission && permission.includes(`${index.permission}`)) ||
        index.permission === "DASHBOARD"
      ) {
        return (
          <Menu.Item key={index.to} className="menu-item-v1">
            {index.icon}
            <span>{index.name}</span>
          </Menu.Item>
        );
      } else {
        return null;
      }
    });

    return (
      <div className="slider-cms">
        <Sider
          className="navbar"
          width={270}
          trigger={null}
          collapsible
          collapsed={onState}
        >
          <div className="nav-logo">
            <Avatar src={logo} />
            <span className="nav-title">Trí Nguyễn </span>
            <span onClick={clickToggle} className="nav-ct-icon-menu">
              <Icon type="menu" />{" "}
            </span>
          </div>
          <Menu
            onClick={(data) => this.onChangePage(data.key)}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[`${pathname}`]}
            className="slider-menu-icon"
          >
            {data_menu}
          </Menu>
        </Sider>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inforAdmin: state.inforAdmin,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Sliders));
