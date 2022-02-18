import React, { Component } from "react";
import { Row, Col } from "antd";
import "../../assets/css/contact.css";
import { connect } from "react-redux";
import Loading from "../../page/loading/loading";

import { actRequestListIntroContact } from "../../actions/introductionContact.action";

class Contact extends Component {
  componentDidMount() {
    this.props.onGetListIntroContact(true);
  }

  render() {
    let { introductionContact } = this.props;

    let aboutContent = null;
    if (introductionContact.dataIntroContact.length > 0) {
      aboutContent = introductionContact.dataIntroContact.map((item, key) => {
        if (item.key === "CONTACT") {
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
              <p className="about-title">Thông tin liên hệ</p>
            </div>
            <div className="col-md-12">
              <Row className="about-content">
                <Col span={24}>{aboutContent}</Col>
              </Row>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
