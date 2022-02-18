import React, { Component } from "react";

class NotFound404 extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = { counter: 0 };
  //   }
  render() {
    return (
      <div>
        <div
          className="alert alert-info"
          role="alert"
          style={{
            textAlign: "center",
            margin: "100px"
          }}
        >
          Không tìm thấy trang
        </div>
      </div>
    );
  }
}

export default NotFound404;
