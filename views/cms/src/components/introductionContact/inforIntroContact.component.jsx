import React from "react";
import { Row, Col, Button } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../../pages/loading/loading";
import { actRequestIntroContactByID } from "../../actions/introductionContact.action";

class InforIntroContact extends React.Component {
  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onIntroContactByID(id, true);
    }
  }

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    let { introductionContact } = this.props;

    return (
      <div>
        {introductionContact.success ? (
          <Loading />
        ) : (
          <div>
            <div className="main-content">
              <Row className="staff-infor">
                <Col span={24}>
                  <h2>
                    {introductionContact.introContactByID &&
                    introductionContact.introContactByID.key === "CONTACT"
                      ? "Liên hệ"
                      : "Giới thiệu"}
                  </h2>
                </Col>
                <Col span={24}>
                  {introductionContact.introContactByID &&
                  introductionContact.introContactByID.des ? (
                    <div
                      className="news-infor"
                      dangerouslySetInnerHTML={{
                        __html: introductionContact.introContactByID.des,
                      }}
                    />
                  ) : null}
                </Col>
              </Row>
              <Row>
                <Col span={24} className="btn-component">
                  <Link
                    to={
                      introductionContact.introContactByID &&
                      introductionContact.introContactByID._id
                        ? `/admin/chinh-sua-thong-tin-gioi-thieu-lien-he/${introductionContact.introContactByID._id}`
                        : ""
                    }
                  >
                    <Button className="btn-edit">Chỉnh sửa</Button>
                  </Link>
                  <Button onClick={this.onClose} className="btn-close">
                    Hoàn tác
                  </Button>
                </Col>
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
    inforAdmin: state.inforAdmin,
    introductionContact: state.introductionContact,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onIntroContactByID: (id, loading) => {
      dispatch(actRequestIntroContactByID(id, loading));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InforIntroContact));
