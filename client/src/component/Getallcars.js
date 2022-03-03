import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import car_default_pic from "../car_pic_default/defaultpic.png";

const Getallcars = () => {
  const [carData, setcarData] = useState([]);
  const callallcars = async () => {
    try {
      const res = await fetch("/getallcar", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setcarData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callallcars();
  }, []);

  return (
    <>
      {carData.map((curElm) => {
        return (
          <>
            <div key={curElm._id}>
              <p>Car Company:&emsp;{curElm.companyname}</p>
              {/* <p>Car Class:&emsp;{curElm.carclass}</p>
                                <p>Car Model:&emsp;{curElm.carmodel}</p>
                                <p>Car Transmission:&emsp;{curElm.transmissiontype}</p>
                                <p>Car Number:&emsp;{curElm.carnumber}</p>
                                <p>Car FuelType:&emsp;{curElm.fueltype}</p>
                                <p>Car Price Per Day:&emsp;{curElm.priceperday}</p>
                                <p>Car seatings:&emsp;{curElm.seatingcapacity}</p> */}
              <Link to={`/viewcar/${curElm._id}`}>
                <button>View Car</button>
              </Link>
            </div>
            <br></br>
            <br></br>
          </>
        );
      })}
    </>
  );
};

export default Getallcars;
