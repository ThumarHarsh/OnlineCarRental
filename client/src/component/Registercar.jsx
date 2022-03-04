import React, { useState } from "react";
import "./Register.css";
import { NavLink, useHistory } from "react-router-dom";

const Registercar = () => {
  const history = useHistory();
  const [car, setCar] = useState({
    companyname: "",
    carmodel: "",
    carclass: "",
    transmissiontype: "",
    seatingcapacity: "",
    fueltype: "",
    carnumber: "",
    priceperday: "",
    carimage: "",
  });
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setCar({ ...car, [name]: value });
  };
  const imageUpload = (e) => {
    setCar({ ...car, carimage: e.target.files[0] });
  };
  const AddData = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("carimage", car.carimage, car.carimage.name);
    formdata.append("companyname", car.companyname);
    formdata.append("carmodel", car.carmodel);
    formdata.append("carclass", car.carclass);
    formdata.append("transmissiontype", car.transmissiontype);
    formdata.append("seatingcapacity", car.seatingcapacity);
    formdata.append("fueltype", car.fueltype);
    formdata.append("carnumber", car.carnumber);
    formdata.append("priceperday", car.priceperday);
    console.log(car.carimage);
    console.log(car.carimage.name);
    // const { companyname, carmodel, carclass, transmissiontype, seatingcapacity, fueltype, carnumber, priceperday } = car;

    const res = await fetch("/carreg", {
      method: "POST",
      // headers: {
      //     "Content-Type": "application/json"
      // },
      // body: JSON.stringify({
      //     // companyname, carmodel, carclass, transmissiontype, seatingcapacity, fueltype, carnumber, priceperday

      // })
      body: formdata,
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Registration Successful");
      console.log("Registration Successful");
      history.push("/adminpanel");
    }
  };

  return (
    <>
      <div className="register">
        <div className="container">
          <div className="title">Car Registration</div>
          <div className="content">
            <form method="POST">
              <div class="user-details">
                <div className="input-box">
                  <label htmlFor="companyname" className="details">
                    Car Caompany:&emsp;
                  </label>
                  <input
                    type="text"
                    name="companyname"
                    id="companyname"
                    autocomplete="off"
                    value={car.companyname}
                    onChange={handleInputs}
                    placeholder="Enter The Company of the Car"
                  />
                </div>
                <br></br>
                <div className="input-box">
                  <label htmlFor="carmodel" className="details">
                    Car model:&emsp;
                  </label>
                  <input
                    type="text"
                    name="carmodel"
                    id="carmodel"
                    autocomplete="off"
                    value={car.carmodel}
                    onChange={handleInputs}
                    placeholder="Enter The Car Model"
                  />
                </div>
                <br></br>
                <div className="input-box">
                  <label htmlFor="carclass" className="details">
                    Car Class:&emsp;
                  </label>
                  <select
                    name="carclass"
                    id="carclass"
                    value={car.carclass}
                    onChange={handleInputs}
                  >
                    <option value="Hatchback">Hatchback</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Compact SUV">Compact SUV</option>
                  </select>
                  {/* <input
                    type="text"
                    name="carclass"
                    id="carclass"
                    autocomplete="off"
                    value={car.carclass}
                    onChange={handleInputs}
                    placeholder="Enter The Car Class"
                  /> */}
                </div>
                <br></br>
                <div className="input-box">
                  <label htmlFor="transmissiontype" className="details">
                    Car Transmission Type:&emsp;
                  </label>
                  <select
                    name="transmissiontype"
                    id="transmissiontype"
                    value={car.transmissiontype}
                    onChange={handleInputs}
                  >
                    <option value="AUTO">AUTO</option>
                    <option value="Manual">Manual</option>
                  </select>
                  {/* <input
                    type="text"
                    name="transmissiontype"
                    id="transmissiontype"
                    autocomplete="off"
                    value={car.transmissiontype}
                    onChange={handleInputs}
                    placeholder="Enter The Transmission Type"
                  /> */}
                </div>
                <br></br>
                <div className="input-box">
                  <label htmlFor="seatingcapacity" className="details">
                    Car Seating Capacity:&emsp;
                  </label>
                  <select
                    name="seatingcapacity"
                    id="seatingcapacity"
                    value={car.seatingcapacity}
                    onChange={handleInputs}
                  >
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                  </select>
                  {/* <input
                    type="text"
                    name="seatingcapacity"
                    id="seatingcapacity"
                    autocomplete="off"
                    value={car.seatingcapacity}
                    onChange={handleInputs}
                    placeholder="Enter The Seating Capacity"
                  /> */}
                </div>
                <br></br>
                <div className="input-box">
                  <label htmlFor="fueltype" className="details">
                    Car Fuel Type:&emsp;
                  </label>
                  <select
                    name="fueltype"
                    id="fueltype"
                    value={car.fueltype}
                    onChange={handleInputs}
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesal">Diesal</option>
                    <option value="CNG">CNG</option>
                    <option value="Electric">Electric</option>
                  </select>
                  {/* <input
                    type="text"
                    name="fueltype"
                    id="fueltype"
                    autocomplete="off"
                    value={car.fueltype}
                    onChange={handleInputs}
                    placeholder="Enter The Fuel Type"
                  /> */}
                </div>
                <br></br>
                <div className="input-box">
                  <label htmlFor="carnumber" className="details">
                    Car Number:&emsp;
                  </label>
                  <input
                    type="text"
                    name="carnumber"
                    id="carnumber"
                    autocomplete="off"
                    value={car.number}
                    onChange={handleInputs}
                    placeholder="Enter The Car Number"
                  />
                </div>
                <br></br>
                <div className="input-box">
                  <label htmlFor="priceperday" className="details">
                    Car Priceperday:&emsp;
                  </label>
                  <input
                    type="text"
                    name="priceperday"
                    id="priceperday"
                    autocomplete="off"
                    value={car.priceperday}
                    onChange={handleInputs}
                    placeholder="Enter The Price"
                  />
                </div>
                <br></br>
                <div className="input-box">
                  <label className="details">Upload image&emsp;</label>
                  <input
                    type="file"
                    name="carimage"
                    onChange={imageUpload}
                  ></input>
                </div>
                <br></br>
              </div>
              <div className="button">
                <input
                  type="submit"
                  name="carregister"
                  id="carregister"
                  autocomplete="off"
                  value="Add Car"
                  onClick={AddData}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registercar;
