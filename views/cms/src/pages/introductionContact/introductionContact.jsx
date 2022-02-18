import React from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import Loading from "../loading/loading";

import { actRequestListIntroContact } from "../../actions/introductionContact.action";

import ListIntroContact from "../../components/introductionContact/listIntroductionContact.component";

class IntroductionContact extends React.Component {
  componentDidMount() {
    this.props.onGetListIntroContact(true);
  }

  render() {
    let { introductionContact } = this.props;

    return (
      <div>
        {introductionContact.success ? (
          <Loading />
        ) : (
          <div>
            <Row className="staff-table main-content">
              <Row className="title-main-content">
                <Col span={12}>
                  <h2>Giới thiệu và liên hệ</h2>
                </Col>
              </Row>
              <ListIntroContact
                dataIntroContact={
                  introductionContact.dataIntroContact.length > 0
                    ? introductionContact.dataIntroContact
                    : []
                }
              />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroductionContact);
