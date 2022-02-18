import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Loading from "../loading/loading";

import {
  actRequestInforClient,
  actRequestListInforDiscountClient,
} from "../../actions/inforClient.action";
import { actRequestInforAgentCode } from "../../actions/inforAgentCode.action";

import HeaderHome from "../../components/home/headerHome.component";
import InforUser from "../../components/home/inforUser.component";
import Discount from "../../components/home/discount.component";

class Home extends React.Component {
  componentDidMount() {
  //  this.props.onInforClient();
    this.props.onInforAgentCode();
    this.props.onListInforDiscountClient();
  }

  render() {
    let { inforClient, inforAgentCode, noti } = this.props;

    return (
      <div>
        {inforClient.loading && inforAgentCode.loading && noti.loading ? (
          <Loading />
        ) : (
          <div>
            <HeaderHome inforClient={inforClient} />
            <Discount
              inforClient={
                inforClient.discountClient && inforClient.discountClient
              }
            />
            <InforUser
              inforClient={inforClient.infoClient && inforClient.infoClient}
              inforAgentCode={
                inforAgentCode.inforAgentCode && inforAgentCode.inforAgentCode
              }
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inforClient: state.inforClient,
    inforAgentCode: state.inforAgentCode,
    noti: state.noti,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onInforClient: () => {
      dispatch(actRequestInforClient(true));
    },

    onListInforDiscountClient: () => {
      dispatch(actRequestListInforDiscountClient(true));
    },

    onInforAgentCode: () => {
      dispatch(actRequestInforAgentCode(true));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
