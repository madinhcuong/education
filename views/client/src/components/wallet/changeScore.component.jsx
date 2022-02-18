import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Col, Row, Icon, Modal, Form, Alert, Button } from "antd";

import {
  actRequestChangeScoreByMoney,
  ResetErrorrWallet,
} from "../../actions/wallet.action";
class ChangeScore extends React.Component {
  state = {
    modal: false,
    type_model: "",
    title: "",
  };

  setModal_Visible(setModel, type_model) {
    if (setModel === true) this.props.onResetErrorrWallet();
    if (setModel === false) {
      this.setState({
        modal: setModel,
        type_model: type_model,
      });
    }
    switch (type_model) {
      case "score-code10":
        this.setState({
          title: "10 điểm = 20.000 vnđ",
        });
        break;
      case "score-code100":
        this.setState({
          title: "100 điểm = 200.000 vnđ",
        });
        break;
      case "score-code1000":
        this.setState({
          title: "1000 điểm = 2.000.000 vnđ",
        });
        break;

      default:
        return null;
    }
    this.setState({
      modal: setModel,
      type_model: type_model,
    });
    this.props.form.resetFields();
  }

  setModal_callback = () => {
    let { wallet } = this.props;
    if (wallet.success) {
      this.setState({
        modal: false,
      });
    }
  };

  _handleSubmit_formScore = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, body) => {
      if (!err) {
        switch (this.state.type_model) {
          case "score-code10":
            this.props.onChangeScoreByMoney(
              { score: 10 },
              this.setModal_callback
            );
            return;

          case "score-code100":
            this.props.onChangeScoreByMoney(
              { score: 100 },
              this.setModal_callback
            );
            return;

          case "score-code1000":
            this.props.onChangeScoreByMoney(
              { score: 1000 },
              this.setModal_callback
            );
            return;

          default:
            return null;
        }
      }
    });
  };

  handleClose_Alert = () => {
    this.props.onResetErrorrWallet();
  };

  render() {
    let { wallet } = this.props;

    return (
      <div>
        <Row>
          <Col span={24} className="changeScore">
            <div className="changeScore-title">
              <Icon type="smile" theme="twoTone" />
              Đổi điểm
              <span>
                <Link to="/client/lich-su-doi-diem">Lịch sử đổi điểm</Link>
              </span>
            </div>
            <Row>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 20, offset: 2 }}
                md={{ span: 8, offset: 0 }}
                lg={{ span: 8, offset: 0 }}
                xl={{ span: 8, offset: 0 }}
                className="changeScore-item"
              >
                <Button
                  onClick={() => this.setModal_Visible(true, "score-code10")}
                  icon="star"
                  className="changeScore-btn-10"
                >
                  10 điểm = 20.000 vnđ
                </Button>
              </Col>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 20, offset: 2 }}
                md={{ span: 8, offset: 0 }}
                lg={{ span: 8, offset: 0 }}
                xl={{ span: 8, offset: 0 }}
                className="changeScore-item"
              >
                <Button
                  onClick={() => this.setModal_Visible(true, "score-code100")}
                  icon="star"
                  className="changeScore-btn-100"
                >
                  100 điểm = 200.000 vnđ
                </Button>
              </Col>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 20, offset: 2 }}
                md={{ span: 8, offset: 0 }}
                lg={{ span: 8, offset: 0 }}
                xl={{ span: 8, offset: 0 }}
                className="changeScore-item"
              >
                <Button
                  onClick={() => this.setModal_Visible(true, "score-code1000")}
                  icon="star"
                  className="changeScore-btn-1000"
                >
                  1000 điểm = 2.000.000 vnđ
                </Button>
              </Col>
            </Row>
          </Col>
          <Modal
            title="Đổi điểm thành tiền"
            visible={this.state.modal}
            onOk={this._handleSubmit_formScore}
            onCancel={() => this.setModal_Visible(false, "")}
          >
            <Row style={{ textAlign: "center", fontSize: "17px" }}>
              {this.state.title}
            </Row>
            {wallet.error ? (
              <Alert
                message={wallet.error}
                type="error"
                closable
                afterClose={this.handleClose_Alert}
                style={{ marginTop: "10px" }}
              />
            ) : null}
          </Modal>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onChangeScoreByMoney: (body, cb) => {
      dispatch(actRequestChangeScoreByMoney(body, cb));
    },

    onResetErrorrWallet: () => {
      dispatch(ResetErrorrWallet());
    },
  };
};

const ChangeScore_Page = Form.create()(withRouter(ChangeScore));
export default connect(mapStateToProps, mapDispatchToProps)(ChangeScore_Page);
