import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import car_default_pic from "../car_pic_default/defaultpic.png";
import "./Register.css";
import Button from "react-bootstrap/Button";

const Updatecar = () => {
  const history = useHistory();
  const { id } = useParams();
  const [carData, setCar] = useState({});
  const [imagePath, setImagePath] = useState("");
  const [newImage, setnewImage] = useState("");
  let name, value;
  const details_input = (event) => {
    name = event.target.name;
    value = event.target.value;
    setCar({ ...carData, [name]: value });
  };
  const callcarupdate = async () => {
    try {
      const res = await fetch("/carcall", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          id,
        }),
      });
      const data = await res.json();
      console.log(data);
      setCar(data);
      setImagePath("http://localhost:7000/public/carImages/");
    } catch (err) {
      console.log("kljkklj");
      console.log(err);
      history.push("/");
    }
  };

  useEffect(() => {
    callcarupdate();
  }, []);

  const imageUpload = (e) => {
    setnewImage(e.target.files[0]);
  };
  const AcquireData = async (event) => {
    event.preventDefault();
    const formdata = new FormData();
    if (newImage) {
      formdata.append("carimage", newImage, newImage.name);
    }
    formdata.append("_id", carData._id);
    formdata.append("companyname", carData.companyname);
    formdata.append("carmodel", carData.carmodel);
    formdata.append("carclass", carData.carclass);
    formdata.append("transmissiontype", carData.transmissiontype);
    formdata.append("seatingcapacity", carData.seatingcapacity);
    formdata.append("fueltype", carData.fueltype);
    formdata.append("carnumber", carData.carnumber);
    formdata.append("priceperday", carData.priceperday);
    // const { _id, companyname, carmodel, carclass, transmissiontype, seatingcapacity, fueltype, carnumber, priceperday } = carData;
    const res = await fetch("/updatecar", {
      method: "POST",
      // credentials: 'include',
      body: formdata,
      // headers: {
      //     "Content-Type": "application/json"
      // },
      // body: JSON.stringify({
      //     _id, companyname, carmodel, carclass, transmissiontype, seatingcapacity, fueltype, carnumber, priceperday
      // })
    });
    const data = await res.json();
    if (!data.status === 202 || !data) {
      window.alert("User Updation Unsuccessful");
    } else {
      window.alert("Car Updation Success");
      history.push(`/viewcar/${id}`);
    }
  };

  return (
    <>
      <div className="register">
        <div className="container">
          <div className="title">Car Updation</div>
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
                    value={carData.companyname}
                    onChange={details_input}
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
                    value={carData.carmodel}
                    onChange={details_input}
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
                    value={carData.carclass}
                    onChange={details_input}
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
                    value={carData.carclass}
                    onChange={details_input}
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
                    value={carData.transmissiontype}
                    onChange={details_input}
                  >
                    <option value="AUTO">AUTO</option>
                    <option value="Manual">Manual</option>
                  </select>
                  {/* <input
                    type="text"
                    name="transmissiontype"
                    id="transmissiontype"
                    autocomplete="off"
                    value={carData.transmissiontype}
                    onChange={details_input}
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
                    value={carData.seatingcapacity}
                    onChange={details_input}
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
                    value={carData.seatingcapacity}
                    onChange={details_input}
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
                    value={carData.fueltype}
                    onChange={details_input}
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
                    value={carData.fueltype}
                    onChange={details_input}
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
                    value={carData.carnumber}
                    onChange={details_input}
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
                    value={carData.priceperday}
                    onChange={details_input}
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
                <input type="submit" value="Update Car" onClick={AcquireData} />
              </div>
              <Link to={`/viewcar/${id}`} className="d-grid gap-2">
                <Button variant="info" renderAs="button" size="lg">
                  Back
                </Button>
              </Link>
              {/* <Link to={`/viewcar/${id}`} className="d-grid gap-2">
                <Button variant="info" renderAs="button" size="lg">
                  <span>Back</span>
                </Button>
              </Link> */}
            </form>
            {/* <div className="button">
              <Link className="button" to={`/viewcar/${id}`}>
                Back
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );

  // return (
  //   <>
  //     <img
  //       src={carData.carpic ? imagePath + carData.carpic : car_default_pic}
  //     />
  //     <form method="POST">
  //       <div>
  //         <input type="file" name="carimage" onChange={imageUpload}></input>
  //       </div>
  //       <br></br>
  //       <div>
  //         <label>Car companyname:&emsp;</label>
  //         <input
  //           type="text"
  //           name="companyname"
  //           onChange={details_input}
  //           value={carData.companyname}
  //         />
  //       </div>
  //       <br></br>
  //       <div>
  //         <label>Car Class:&emsp;</label>
  //         <input
  //           type="text"
  //           name="carclass"
  //           onChange={details_input}
  //           value={carData.carclass}
  //         />
  //       </div>
  //       <br></br>
  //       <div>
  //         <label>Car Model:&emsp;</label>
  //         <input
  //           type="text"
  //           name="carmodel"
  //           onChange={details_input}
  //           value={carData.carmodel}
  //         />
  //       </div>
  //       <br></br>
  //       <div>
  //         <label>Car Transmission:&emsp;</label>
  //         <input
  //           type="text"
  //           name="transmission"
  //           onChange={details_input}
  //           value={carData.transmissiontype}
  //         />
  //       </div>
  //       <br></br>
  //       <div>
  //         <label>Car Number:&emsp;</label>
  //         <input
  //           type="text"
  //           name="carnumber"
  //           onChange={details_input}
  //           value={carData.carnumber}
  //         />
  //       </div>
  //       <br></br>
  //       <div>
  //         <label>car FuelType:&emsp;</label>
  //         <input
  //           type="text"
  //           name="fueltype"
  //           onChange={details_input}
  //           value={carData.fueltype}
  //         />
  //       </div>
  //       <br></br>
  //       <div>
  //         <label>Car Price per day:&emsp;</label>
  //         <input
  //           type="text"
  //           name="priceperday"
  //           onChange={details_input}
  //           value={carData.priceperday}
  //         />
  //       </div>
  //       <br></br>
  //       <div>
  //         <label>Car Seating Capacity:&emsp;</label>
  //         <input
  //           type="text"
  //           name="seatingcapacity"
  //           onChange={details_input}
  //           value={carData.seatingcapacity}
  //         />
  //       </div>
  //       <br></br>
  //       <div>
  //         <input type="submit" onClick={AcquireData} value="Update" />
  //         &emsp;
  //         <Link to={`/viewcar/${id}`}>
  //           <button>Back</button>
  //         </Link>
  //       </div>
  //     </form>
  //   </>
  // );
};

export default Updatecar;
