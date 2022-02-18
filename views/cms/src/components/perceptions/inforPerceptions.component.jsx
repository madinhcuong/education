import React from "react";
import { Row, Col, Button } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as url from "../../utils/url_api";
import Loading from "../../pages/loading/loading";
import { actRequestPerceptionsById } from "../../actions/perceptions";

class InforPerceptions extends React.Component {
  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      this.props.onPerceptionsById(id);
    }
  }

  onClose = () => {
    this.props.history.goBack();
  };

  render() {
    let { perceptions } = this.props;
    //  let { inforAdmin, perceptions } = this.props;
    // let permissions = inforAdmin ? inforAdmin.permissions : "";
    return (
      <div>
        {perceptions.success ? (
          <Loading />
        ) : (
          <div>
            <div className="main-content">
              <Row>
                <Col span={24}>
                  <div className="img-perceptions">
                    <img
                      src={
                        perceptions.perceptionsById &&
                        `${url.api_url}/${perceptions.perceptionsById.image}`
                      }
                      alt={`${
                        perceptions.perceptionsById &&
                        perceptions.perceptionsById.image
                      }`}
                    ></img>
                  </div>
                </Col>
              </Row>
              <Row className="staff-infor">
                <Col
                  type="flex"
                  xs={{ span: 23, offset: 0 }}
                  lg={{ span: 7, offset: 0 }}
                  className="staff-infor-col"
                >
                  <h3>Họ và tên</h3>
                  <p>
                    {perceptions.perceptionsById &&
                      perceptions.perceptionsById.name}
                  </p>
                </Col>
                <Col
                  type="flex"
                  xs={{ span: 23, offset: 0 }}
                  lg={{ span: 7, offset: 1 }}
                  className="staff-infor-col"
                >
                  <h3>Cảm nhận</h3>
                  <p>
                    {perceptions.perceptionsById &&
                      perceptions.perceptionsById.description}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={24} className="btn-component">
                  <Link
                    to={
                      perceptions.perceptionsById &&
                      perceptions.perceptionsById._id
                        ? `/admin/sua-cam-nhan-hoc-vien/${perceptions.perceptionsById._id}`
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
    perceptions: state.perceptions,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onPerceptionsById: (id) => {
      dispatch(actRequestPerceptionsById(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InforPerceptions));
