import React from "react";
import { withRouter } from "react-router-dom";
import { Result, Button } from "antd";

class NotFound extends React.Component {
  onClose = () => {
   // this.props.history.goBack();
   window.location = "/admin";
  };
  render() {
    return (
      <div>
        <Result
          status="404"
          title="404"
          subTitle="Không tìm thấy"
          extra={
            <Button onClick={this.onClose} type="primary">
              Quay lại
            </Button>
          }
        />
        ,
      </div>
    );
  }
}

export default withRouter(NotFound);
