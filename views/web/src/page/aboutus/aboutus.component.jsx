import React, { Component } from "react";
import { Row, Col } from "antd";
import "../../assets/css/about.css";
import { connect } from "react-redux";
import Loading from "../loading/loading";

import { actRequestListIntroContact } from "../../actions/introductionContact.action";

class About extends Component {
  componentDidMount() {
    this.props.onGetListIntroContact(true);
  }

  render() {
    let { introductionContact } = this.props;

    let aboutContent = null;
    if (introductionContact.dataIntroContact.length > 0) {
      aboutContent = introductionContact.dataIntroContact.map((item, key) => {
        if (item.key === "INTRO") {
          return (
            <div
              key={key}
              dangerouslySetInnerHTML={{
                __html: item.des,
              }}
            />
          );
        } else {
          return null;
        }
      });
    }

    return (
      <div>
        {introductionContact.success ? (
          <Loading />
        ) : (
          <div className="container">
            <div className="col-md-12">
              <p className="about-title">Giới thiệu</p>
            </div>
            <Row className="about-content">
              <Col span={24}>{aboutContent}</Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    introductionContact: state.introductionContact,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetListIntroContact: (loading) => {
      dispatch(actRequestListIntroContact(loading));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
