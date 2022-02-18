import React from "react";
import { Spin } from "antd";

class Loading extends React.Component {
  render() {
    return (
      <div>
        <div className="loading-data">
          <Spin tip="Loading..." size="large"></Spin>
        </div>

        {/* <Modal
          title=""
          centered
          visible={true}
          className="form-loading"
          width="auto"
        >
          <Spin tip="Loading..." size="large"></Spin>
        </Modal> */}
      </div>
    );
  }
}

export default Loading;
