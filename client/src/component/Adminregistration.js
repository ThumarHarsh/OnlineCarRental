import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

const Adminregistration = () => {
  const history = useHistory();
  const [admin, setadmin] = useState({
    username: "",
    email: "",
    password: "",
  });
  let name, value;
  const handleinputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setadmin({ ...admin, [name]: value });
  };
  const SendData = async (e) => {
    e.preventDefault();
    console.log(admin);
    const { username, email, password } = admin;
    const res = await fetch("/adminreg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Registration Successful");
      console.log("Registration Successful");
      history.push("/");
    }
  };

  return (
    <>
      <div className="register">
        <div className="container">
          <div className="title">Admin Sign Up</div>
          <div className="content">
            <form method="POST">
              <div class="user-details">
                <div className="input-box">
                  <label htmlFor="username" className="details">
                    UserName:&emsp;
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autocomplete="off"
                    value={admin.username}
                    onChange={handleinputs}
                    placeholder="Enter Your Username"
                  />
                </div>
                <br></br>
                <div className="input-box">
                  <label htmlFor="email" className="details">
                    Email:&emsp;
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autocomplete="off"
                    value={admin.email}
                    onChange={handleinputs}
                    placeholder="Enter Your email"
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
                    value={admin.password}
                    onChange={handleinputs}
                    placeholder="Enter your password"
                  />
                </div>
                <br></br>
              </div>

              <div className="button">
                <input
                  type="submit"
                  name="signup"
                  id="signup"
                  value="Register"
                  onClick={SendData}
                />
              </div>
              <br></br>
              <div>
                <NavLink to="/adminlogin">Already Registered?</NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <form method='POST'>
                <div>
                    <label htmlFor="username">Username:&emsp;</label>
                    <input type="text" name="username" id="username" autocomplete="off" value={admin.username} onChange={handleinputs} placeholder="Enter Your Username" />
                </div>
                <br></br>
                <div>
                    <label htmlFor="email">Email:&emsp;</label>
                    <input type="email" name="email" id="email" autocomplete="off" value={admin.email} onChange={handleinputs} placeholder="Enter Your email" />
                </div>
                <br></br>
                <div>
                    <label htmlFor="password">Password:&emsp;</label>
                    <input type="password" name="password" id="password" autocomplete="off" value={admin.password} onChange={handleinputs} placeholder="Enter your password" />
                </div>
                <br></br>
                <div>
                    <input type="submit" name="register" value="Register" onClick={SendData} />
                </div>
            </form> */}
    </>
  );
};

export default Adminregistration;
