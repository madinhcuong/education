import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../loading/loading";
import { Col, Row } from "antd";
import WalletHeader from "../../components/wallet/walletHeader.component";
import ChangeScore from "../../components/wallet/changeScore.component";
import InforWallet from "../../components/wallet/inforWallet.component";
import InforAff from "../../components/wallet/inforAff.component";
import SeachAff from "../../components/wallet/seachAff.component";

import { actRequestListAff } from "../../actions/wallet.action";
class Wallet extends React.Component {
  componentDidMount() {
    this.props.onListAff("", "", true);
  }

  onSeachAff = (data) => {
    this.props.onListAff(data.name, data.email, false);
  };

  render() {
    let { inforClient, wallet } = this.props;

    return (
      <div>
        {wallet.loading  ? (
          <Loading />
        ) : (
          <div>
            <WalletHeader
              inforClient={inforClient.infoClient ? inforClient.infoClient : {}}
            />
            <ChangeScore />
            <InforWallet />
            <Row>
              <Col span={24} className="inforAff-title-header">
                <h4>Danh sách người giới thiệu (F1)</h4>
                <SeachAff onSeachAff={this.onSeachAff} />
                <InforAff listAff={wallet.listAff} />
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inforClient: state.inforClient,
    wallet: state.wallet,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onListAff: (name, email, loading) => {
      dispatch(actRequestListAff(name, email, loading));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Wallet));
