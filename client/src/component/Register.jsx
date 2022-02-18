import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    city: "",
    state: "",
    dob: "",
  });
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const PostData = async (e) => {
    e.preventDefault();
    console.log(user);
    const { name, email, address, password, phone, city, state, dob } = user;

    const res = await fetch("/reg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        address,
        password,
        phone,
        city,
        state,
        dob,
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Registration Successful");
      console.log("Registration Successful");
      history.push("/login");
    }
  };

  return (
    <>
      <div className="register">
        <div className="container">
          <div className="title">Sign Up</div>
          <div className="content">
            <form method="POST">
              <div class="user-details">
                <div className="input-box">
                  <label htmlFor="name" className="details">
                    Name:&emsp;
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autocomplete="off"
                    value={user.name}
                    onChange={handleInputs}
                    placeholder="Enter Your Name"
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
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="Enter Your Email"
                  />
                </div>
                <br></br>
                <div className="input-box">
                  <label htmlFor="address" className="details">
                    Address:&emsp;
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    autocomplete="off"
                    value={user.address}
                    onChange={handleInputs}
                    placeholder="Enter Your Address"
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
                    value={user.password}
                    onChange={handleInputs}
                    placeholder="Enter Your Password"
                  />
                </div>
                <br></br>
                <div className="input-box">
                  <label htmlFor="state" className="details">
                    State:&emsp;
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    autocomplete="off"
                    value={user.state}
                    onChange={handleInputs}
                    placeholder="Enter Your State"
                  />
                </div>
                <br></br>
                <div className="input-box">
                  <label htmlFor="city" className="details">
                    City:&emsp;
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autocomplete="off"
                    value={user.city}
                    onChange={handleInputs}
                    placeholder="Enter Your City"
                  />
                </div>
                <br></br>
                <div className="input-box">
                  <label htmlFor="phone" className="details">
                    Phone:&emsp;
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    autocomplete="off"
                    value={user.phone}
                    onChange={handleInputs}
                    placeholder="Enter Your PhoneNo"
                  />
                </div>
                <br></br>
                <div className="input-box" style={{ paddingLeft: "0px" }}>
                  <label htmlFor="dob" className="details">
                    Date of Birth:&emsp;
                  </label>
                  <input
                    type="Date"
                    name="dob"
                    id="dob"
                    autocomplete="off"
                    value={user.dob}
                    onChange={handleInputs}
                    placeholder="Enter Your Date of birth"
                  />
                </div>
              </div>
              <br></br>
              <div className="button">
                <input
                  type="submit"
                  name="signup"
                  id="signup"
                  value="Register"
                  onClick={PostData}
                />
              </div>
              <br></br>
              <div>
                <NavLink to="/login">Already Registered?</NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
