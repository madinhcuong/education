import React, { Component } from "react";
import { connect } from "react-redux";
import { Affix, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";

import "../../assets/css/menu.css";
import logoTT from "../../assets/img/logoTT.png";
import menu from "../constants/menu";

import { actRequestGetListTopicHome } from "../../actions/topic.action";
import { actRequestListTraining } from "../../actions/training.action";

class Navbar extends Component {
  state = { show: false };

  componentDidMount() {
    this.props.onListTraining();
    this.props.onListTopic();
  }

  onClickRespon() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const { location, training, topic } = this.props;
    let url_pathname = location.pathname.split("/").slice(0, 2).join("/");

    let list_training =
      training.dataTraining.length > 0 ? training.dataTraining : [];

    let list_topic = topic.dataTopic.length > 0 ? topic.dataTopic : [];

    let i = 1;
    let result_menu = menu.map((index, key) => {
      if (index.isSubMenu) {
        return (
          <li className="nav-item" key={key}>
            <p className={url_pathname === index.to ? "active" : ""}>
              {index.name}
            </p>
            <ul className="sub-menu">
              {index.sub_menu === "TRAINING"
                ? list_training.map((item, key) => {
                    return (
                      <li key={key}>
                        <a href={`/dao-tao/${item._id}`}>{item.name}</a>
                        {/* <Link to={`/dao-tao/${item._id}`}>{item.name}</Link> */}
                      </li>
                    );
                  })
                : list_topic.map((item, key) => {
                    return (
                      <li key={key}>
                        <a href={`/tin-tuc/${item._id}`}>{item.name_topic}</a>
                        {/* <Link to={`/tin-tuc/${item._id}`}>
                          {item.name_topic}
                        </Link> */}
                      </li>
                    );
                  })}
              {/* {index.sub_menu.map((item, key) => {
                return (
                  <li key={key}>
                    <Link to={item.to}>{item.name}</Link>
                  </li>
                );
              })} */}
            </ul>
          </li>
          // <MenuLinka
          //   key={key}
          //   label={index.name}
          //   sub_menu={index.sub_menu}
          //   activeOnlyWhenExact={index.exact}
          // />
        );
      }
      return (
        <li className="nav-item" key={key}>
          {/* <Link
            className={url_pathname === index.to ? "active" : ""}
            to={index.to}
          >
            {index.name}
          </Link> */}
          <a
            href={index.to}
            className={url_pathname === index.to ? "active" : ""}
          >
            {index.name}
          </a>
        </li>
        // <MenuLink
        //   key={key}
        //   label={index.name}
        //   to={index.to}
        //   activeOnlyWhenExact={index.exact}
        // />
      );
    });

    let result_menu_respon = menu.map((index, key) => {
      if (index.isSubMenu) {
        return (
          <li className="nav-item" key={key}>
            <div id="accordion">
              <div className="">
                <div className="" id={`heading${key}`}>
                  <h5 className="mb-0">
                    <div
                      className="btn-coll-moble"
                      data-toggle="collapse"
                      data-target={`#collapse${key}`}
                      aria-expanded="false"
                      aria-controls={`collapse${key}`}
                    >
                      {/* <Link to={index.to} className="btn-coll-moble-a">
                        {index.name}
                      </Link> */}

                      <a href={index.to} className="btn-coll-moble-a">
                        {index.name}
                      </a>

                      <Icon type="caret-down" className="icon-nav-respon" />
                    </div>
                  </h5>
                </div>
                <div
                  id={`collapse${key}`}
                  className="collapse"
                  aria-labelledby={`heading${i}`}
                  data-parent="#accordion"
                >
                  {index.sub_menu === "TRAINING"
                    ? list_training.map((item, key) => {
                        return (
                          <div className="card-body" key={key}>
                            <a href={`/dao-tao/${item._id}`}>+ {item.name}</a>
                          </div>
                        );
                      })
                    : list_topic.map((item, key) => {
                        return (
                          <div className="card-body" key={key}>
                            <a href={`/tin-tuc/${item._id}`}>
                              + {item.name_topic}
                            </a>
                          </div>
                        );
                      })}
                  {/* {index.sub_menu.map((item, key) => {
                    return (
                      <div className="card-body" key={key}>
                        <Link to={item.to}>+ {item.name}</Link>
                      </div>
                    );
                  })} */}
                </div>
              </div>
            </div>
          </li>
        );
      }
      return (
        <li className="nav-item" key={key}>
          {/* <Link
            to={index.to}
            className="nav-link"
            onClick={this.onClickRespon.bind(this)}
          >
            {index.name}
          </Link> */}

          <a href={index.to} className="nav-link">
            {index.name}
          </a>
        </li>
      );
    });

    return (
      <div>
        <Affix>
          <div className="navigation navigation-2">
            
            <div className="container-full">
             

                <div className="row no-gutters">
                  <div className="col-lg-12 col-md-10 col-sm-9 col-9 nav-gutters">
                    <nav className="navbar navbar-expand-lg">
                      <div
                        className="collapse navbar-collapse sub-menu-bar"
                        id="navbarSupportedContent"
                      >
                        <ul className="navbar-nav">{result_menu}</ul>
                      </div>
                    </nav>
                  </div>
                </div>

              </div>
          </div>
        </Affix>

        {/* ---reponsive--- */}
        <Affix>
          <nav className="navbar  navbar-expand-lg navbar-light bg-light navbar-responsive">
            <Link to="/" className="navbar-brand">
              <img src={logoTT} alt="logo" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className={
                this.state.show
                  ? "navbar-collapse collapse"
                  : "navbar-collapse collapse"
              }
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">{result_menu_respon}</ul>
            </div>
          </nav>
        </Affix>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    training: state.training,
    topic: state.topic,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListTraining: () => {
      dispatch(actRequestListTraining(true));
    },
    onListTopic: () => {
      dispatch(actRequestGetListTopicHome(true));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
