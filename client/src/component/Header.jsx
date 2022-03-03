import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    const { loginInfo } = this.props;
    return (
      <header>
        <div className="container container-header">
          <div className="logo">
            <h1>YouHeal Hospital</h1>
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/" className="link">
                  HOME
                </Link>
                <div className="line"></div>
              </li>
              <li>
                <Link to="/diagnosis" className="link">
                  SYMPTOM-CHECKER
                </Link>
                <div className="line"></div>
              </li>
              <li>
                <Link className="link" to="/about">
                  ABOUT US
                </Link>
                <div className="line"></div>
              </li>
              {loginInfo.isLoggedIn ? (
                <li>
                  <div className="user">
                    <Link
                      to="#"
                      className="link logged-in"
                      title={`logged in as ${loginInfo.user.firstName}`}
                    >
                      {loginInfo.user.userName}
                    </Link>
                    <div className="drop-down">
                      <i className="account-icon dropdown-item fas">&#xf2bd;</i>
                      <div className="user-name dropdown-item">
                        {loginInfo.user.firstName}
                      </div>

                      <Link
                        to={`/mybookings/${loginInfo.user._id}`}
                        className="dropdown-item"
                      >
                        My Bookings
                      </Link>
                      <Link
                        to=""
                        className="dropdown-item"
                        onClick={this.props.onLogout}
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                </li>
              ) : (
                <ul>
                  <li>
                    <Link to="/login" className="link">
                      LOGIN
                    </Link>
                    <div className="line"></div>
                  </li>
                  <li>
                    <Link to="/signup" className="link">
                      SIGN UP
                    </Link>
                    <div className="line"></div>
                  </li>
                </ul>
              )}
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
