import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import car_default_pic from "../car_pic_default/defaultpic.png";

const Viewcar = () => {
  const { id } = useParams();
  const [carData, setCar] = useState({});
  const [imagePath, setImagePath] = useState("");
  const callcar = async () => {
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
      console.log(carData.carpic);
      setImagePath("http://localhost:7000/public/carImages/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callcar();
  }, []);
  return (
    <>
      <p>
        <img
          src={carData.carpic ? imagePath + carData.carpic : car_default_pic}
        />
      </p>
      <p>Car Class:&emsp;{carData.carclass}</p>
      <p>Car Model:&emsp;{carData.carmodel}</p>
      <p>Car Transmission:&emsp;{carData.transmissiontype}</p>
      <p>Car Number:&emsp;{carData.carnumber}</p>
      <p>Car FuelType:&emsp;{carData.fueltype}</p>
      <p>Car Price Per Day:&emsp;{carData.priceperday}</p>
      <p>Car seatings:&emsp;{carData.seatingcapacity}</p>
      <Link to={`/getallcars`}>
        <button>Back</button>
      </Link>
      &emsp;
      <Link to={`/updatecar/${carData._id}`}>
        {" "}
        <button>Update Car</button>
      </Link>
    </>
  );
};

export default Viewcar;
