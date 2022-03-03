import React, { Component } from "react";
import error from "../images/error.png";
class Pagenotfound extends Component {
  render() {
    return (
      <div className="no-page">
        <img src={error} alt="" />
      </div>
    );
  }
}

export default Pagenotfound;
