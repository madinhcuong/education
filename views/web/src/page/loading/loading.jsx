import React from "react";
import { Spin } from "antd";

class Loading extends React.Component {
  render() {
    return (
      <div>
        <div className="loading-data">
          <Spin tip="Loading..." size="large"></Spin>
        </div>
      </div>
    );
  }
}

export default Loading;
