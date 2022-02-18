import React from "react";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../loading/loading";

import { actRequestListPerceptions } from "../../actions/perceptions";

import ListPerceptions from "../../components/perceptions/listPerceptions.component";

class Perceptions extends React.Component {
  componentDidMount() {
    this.props.onGetListPerceptions();
  }

  render() {
    let { perceptions } = this.props;

    return (
      <div>
        {perceptions.success ? (
          <Loading />
        ) : (
          <div>
            <Row className="staff-table main-content">
              <Row className="title-main-content">
                <Col span={12}>
                  <h2>Danh sách cảm nhận của học viên</h2>
                </Col>
                <Col span={12} className="staff-addStaff">
                  <Link to="/admin/them-cam-nhan-hoc-vien">
                    <Button className="btn-add-new">Tạo mới</Button>
                  </Link>
                </Col>
              </Row>
              <ListPerceptions
                dataPerceptions={
                  perceptions.dataPerceptions ? perceptions.dataPerceptions : {}
                }
                onChange_pagination={this.onChange_pagination}
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
    perceptions: state.perceptions,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetListPerceptions: () => {
      dispatch(actRequestListPerceptions(true));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Perceptions);
