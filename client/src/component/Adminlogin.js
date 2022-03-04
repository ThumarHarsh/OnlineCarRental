import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Adminpanel from "./Adminpanel";

const Adminlogin = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginAdmin = async (e) => {
    e.preventDefault();

    const res = await fetch("/adminsignin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials");
    } else {
      window.alert("Welcome Admin");
      history.push("/Adminpanel");
    }
  };

  return (
    <>
      <div className="login">
        <div className="container">
          <div className="title">Admin-Login</div>
          <div className="content">
            <form method="POST">
              <div class="user-details">
                <div className="input-box">
                  <label htmlFor="email" className="details">
                    Email:&emsp;
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autocomplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Your Username"
                  />
                </div>
                <br></br>
                <div className="input-box">
                  <label htmlFor="password" className="details">
                    Password:&emsp;
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autocomplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Your Password"
                  />
                </div>
                <br></br>
              </div>
              <div className="button">
                <input
                  type="submit"
                  name="signin"
                  id="signin"
                  value="LogIn"
                  onClick={loginAdmin}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <form method="POST">
                <div>
                    <label htmlFor="username">Username:&emsp;</label>
                    <input type="text" name="username" id="username" autocomplete="off" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Your Username" />
                </div>
                <br></br>
                <div>
                    <label htmlFor="password">Password:&emsp;</label>
                    <input type="password" name="password" autocomplete="off" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" />
                </div>
                <br></br>
                <div>
                    <input type="submit" name="adminsignin" id="adminsignin" value="Login" onClick={loginAdmin} />
                </div>
            </form> */}
    </>
  );
};

export default Adminlogin;
