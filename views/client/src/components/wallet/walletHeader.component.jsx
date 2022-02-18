import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Card,
  Col,
  Row,
  Avatar,
  Icon,
  Modal,
  Form,
  Input,
  Alert,
  Select,
  Radio,
} from "antd";
import { formatNumber, ScoreCumulative_Rank } from "../../helpers/base.helper";

import {
  actRequestChangeScoreByMoney,
  ResetErrorrWallet,
  actRequestChangeScoreByDiscount,
  actRequestTransferScore,
} from "../../actions/wallet.action";
import { actRequestSendPay } from "../../actions/pay.action";

const { confirm } = Modal;

class WalletHeader extends React.Component {
  state = {
    modal: false,
    type_model: "",
    discount: "",
    // type transfer score
    type: "SCORE_SEND",
    description: "",
  };

  setModal_Visible(setModel, type_model) {
    if (setModel === true) this.props.onResetErrorrWallet();
    this.setState({
      modal: setModel,
      type_model: type_model,
      description: "",
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

  callback_SendPay = (data) => {
    if (data) {
      this.setState({
        modal: false,
      });
    }
  };

  _handleSubmit_formScore = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, body) => {
      if (!err) {
        if (this.state.type_model === "score-code" && body.score_code) {
          let data = { key_score: this.state.discount };
          this.props.onChangeScoreByDiscount(data, this.setModal_callback);
        }
        if (this.state.type_model === "score-money") {
          let data = { score: parseInt(body.score) };
          this.props.onChangeScoreByMoney(data, this.setModal_callback);
        }
        if (this.state.type_model === "transfer-score") {
          let data = {
            type: this.state.type,
            score: parseInt(body.score),
            agent_code: body.agent_code,
          };
          this.props.onChangeTransferScore(data, this.callback_transfer);
        }
        if (this.state.type_model === "SEND_PAY") {
          this.Send_Pay();
        }

        // if (body.score_code) {
        //   let data = { key_score: this.state.discount };
        //   // this.props.onChangeScoreByDiscount(data, this.setModal_callback);
        // } else {
        //   let data = { score: parseInt(body.score) };
        //   // this.props.onChangeScoreByMoney(data, this.setModal_callback);
        // }
      }
    });
  };

  callback_transfer = (e) => {
    if (e) {
      this.setState({
        modal: false,
      });
    }
  };

  // send pay
  Send_Pay = () => {
    let description = { desc: this.state.description };
    return confirm({
      title: "Gửi yêu cầu thanh toán ?",
      content: "",
      okText: "Gửi yêu cầu",
      onOk: () => {
        this.props.onChangeSendPay(description, this.callback_SendPay);
      },
      cancelText: "Hủy bỏ",
      onCancel() {},
      className: "modal-error",
      okButtonProps: { type: "danger", ghost: true },
      centered: true,
      maskClosable: true,
    });
  };

  // mo ta gui tien
  onChang_DescsendPay = (e) => {
    this.setState({ description: e.target.value });
  };

  onChange_Radio = (e) => {
    this.setState({
      type: e.target.value,
    });
  };

  handleChange = (value) => {
    this.setState({
      discount: value,
    });
  };

  handleClose_Alert = () => {
    this.props.onResetErrorrWallet();
  };

  render() {
    const { Option } = Select;
    const { getFieldDecorator } = this.props.form;
    let { inforClient, wallet } = this.props;
    const { TextArea } = Input;

    const switchView = () => {
      switch (this.state.type_model) {
        case "score-code":
          return (
            <Modal
              title="Đổi điểm thành mã giảm giá"
              visible={this.state.modal}
              onOk={this._handleSubmit_formScore}
              onCancel={() => this.setModal_Visible(false, "score-code")}
            >
              <Form layout="vertical">
                <Form.Item label="Chọn mức giảm giá">
                  {getFieldDecorator("score_code", {
                    rules: [
                      {
                        required: true,
                        message: "Mức giảm giá không được để trống",
                      },
                    ],
                  })(
                    <Select onChange={this.handleChange}>
                      <Option value="discount_25">Giảm giá 25%</Option>
                      <Option value="discount_50">Giảm giá 50%</Option>
                      <Option value="discount_75">Giảm giá 75%</Option>
                      <Option value="discount_100">Giảm giá 100%</Option>
                    </Select>
                  )}
                </Form.Item>
              </Form>
              {wallet.error ? (
                <Alert
                  message={wallet.error}
                  type="error"
                  closable
                  afterClose={this.handleClose_Alert}
                />
              ) : null}
            </Modal>
          );

        case "score-money":
          return (
            <Modal
              title="Đổi điểm thành tiền"
              visible={this.state.modal}
              onOk={this._handleSubmit_formScore}
              onCancel={() => this.setModal_Visible(false, "score-money")}
            >
              <Form layout="vertical">
                <Form.Item label="Nhập số điểm">
                  {getFieldDecorator("score", {
                    rules: [
                      {
                        required: true,
                        message: "Điểm không được để trống",
                      },
                    ],
                  })(<Input type="Number" />)}
                </Form.Item>
              </Form>
              {wallet.error ? (
                <Alert
                  message={wallet.error}
                  type="error"
                  closable
                  afterClose={this.handleClose_Alert}
                />
              ) : null}
            </Modal>
          );

        case "transfer-score":
          return (
            <Modal
              title="Chuyển điểm"
              visible={this.state.modal}
              onOk={this._handleSubmit_formScore}
              onCancel={() => this.setModal_Visible(false, "score-money")}
            >
              <Form layout="vertical">
                <Form.Item label="Chọn hình thức">
                  <Radio.Group
                    onChange={this.onChange_Radio}
                    value={this.state.type}
                  >
                    <Radio value="SCORE_SEND">Cho điểm</Radio>
                    <Radio value="SCORE_BORROW">Xin điểm</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Nhập mã người giới thiệu">
                  {getFieldDecorator("agent_code", {
                    rules: [
                      {
                        required: true,
                        message: "Mã người giới thiệu không được để trống",
                      },
                    ],
                  })(<Input placeholder="Nhập mã người giới thiệu ..." />)}
                </Form.Item>
                <Form.Item label="Nhập số điểm">
                  {getFieldDecorator("score", {
                    rules: [
                      {
                        required: true,
                        message: "Điểm không được để trống",
                      },
                    ],
                  })(<Input type="Number" placeholder="Nhập số điểm ..." />)}
                </Form.Item>
              </Form>
              {wallet.error ? (
                <Alert
                  message={wallet.error}
                  type="error"
                  closable
                  afterClose={this.handleClose_Alert}
                />
              ) : null}
            </Modal>
          );

        case "SEND_PAY":
          return (
            <Modal
              title="Gửi yêu cầu thanh toán"
              visible={this.state.modal}
              onOk={this._handleSubmit_formScore}
              onCancel={() => this.setModal_Visible(false, "SEND_PAY")}
              cancelText="Đóng"
            >
              <Form layout="vertical">
                <Form.Item label="Mô tả">
                  <TextArea
                    value={this.state.description}
                    placeholder="Nhập mô tả..."
                    allowClear
                    onChange={this.onChang_DescsendPay}
                  ></TextArea>
                </Form.Item>
              </Form>
            </Modal>
          );
        default:
          return null;
      }
    };

    return (
      <div>
        <Row className="wallet-header">
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 6, offset: 0 }}
            xl={{ span: 6, offset: 0 }}
            className="wallet-header-col"
          >
            <Card
              onClick={() => this.setModal_Visible(true, "transfer-score")}
              bordered={false}
              className="wallet-header-level"
            >
              <Col span={8} style={{ textAlign: "center" }}>
                <Avatar size="large" icon="sketch" />
              </Col>
              <Col span={16}>
                Xếp hạng:{" "}
                {ScoreCumulative_Rank(
                  inforClient.id_debit && inforClient.id_debit.level
                )}
                <div>
                  {inforClient.id_debit && inforClient.id_debit.wallet} điểm
                </div>
              </Col>
            </Card>
          </Col>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 6, offset: 0 }}
            xl={{ span: 6, offset: 0 }}
            className="wallet-header-col"
          >
            <Card
              //  onClick={() => this.Send_Pay()}
              onClick={() => this.setModal_Visible(true, "SEND_PAY")}
              bordered={false}
              style={{ textAlign: "center" }}
              className="wallet-header-money"
            >
              Số dư hiện tại:
              <div>
                {inforClient.id_debit
                  ? formatNumber(inforClient.id_debit.money)
                  : 0}{" "}
                vnđ
              </div>
            </Card>
          </Col>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 6, offset: 0 }}
            xl={{ span: 6, offset: 0 }}
            className="wallet-header-col"
          >
            <Card
              onClick={() => this.setModal_Visible(true, "score-money")}
              className="wallet-header-score-money wallet-header-score-money-one"
              bordered={false}
              style={{ textAlign: "center" }}
            >
              Đổi điểm thành tiền:
              <div>
                <Icon type="money-collect" />
              </div>
            </Card>
          </Col>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 6, offset: 0 }}
            xl={{ span: 6, offset: 0 }}
            className="wallet-header-col"
          >
            <Card
              onClick={() => this.setModal_Visible(true, "score-code")}
              className="wallet-header-score-money wallet-header-score-code"
              bordered={false}
              style={{ textAlign: "center" }}
            >
              Đổi điểm thành mã giảm giá:
              <div>
                <Icon type="font-colors" />
              </div>
            </Card>
          </Col>
          {switchView()}
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

    onChangeScoreByDiscount: (body, cb) => {
      dispatch(actRequestChangeScoreByDiscount(body, cb));
    },

    // chuyển điểm
    onChangeTransferScore: (body, cb) => {
      dispatch(actRequestTransferScore(body, cb));
    },

    //-- send pay
    onChangeSendPay: (description, callback) => {
      dispatch(actRequestSendPay(description, callback));
    },

    onResetErrorrWallet: () => {
      dispatch(ResetErrorrWallet());
    },
  };
};

const Wallet_Header = Form.create()(withRouter(WalletHeader));
export default connect(mapStateToProps, mapDispatchToProps)(Wallet_Header);
