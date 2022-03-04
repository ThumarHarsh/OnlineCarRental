import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import car_default_pic from "../car_pic_default/defaultpic.png";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./Bookcar.css";

const Viewcar = () => {
  const history = useHistory();
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
      history.push("/");
    }
  };
  const Deletedata = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/deletecar", {
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
      if (data) {
        window.alert("Car delete Successfully!");
        history.push("/getallcars");
      } else {
        window.alert("deletion unsuccessfull");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    callcar();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div key={carData._id}>
          <Card style={{ width: "23rem" }} className="card">
            <Card.Header>
              <Card.Title>
                {carData.companyname} {carData.carmodel}
              </Card.Title>
            </Card.Header>
            <Card.Img
              variant="top"
              style={{
                width: "100",
                height: "15vw",
                objectfit: "cover",
              }}
              src={
                carData.carpic ? imagePath + carData.carpic : car_default_pic
              }
            />

            <ListGroup className="list-group-flush">
              <ListGroupItem action variant="info">
                Class:&emsp;{carData.carclass}
              </ListGroupItem>
              <ListGroupItem action variant="success">
                Transmission Type:&emsp;{carData.transmissiontype}
              </ListGroupItem>
              <ListGroupItem action variant="info">
                FuelType:&emsp;{carData.fueltype}
              </ListGroupItem>
              <ListGroupItem action variant="success">
                Registration Number:&emsp;{carData.carnumber}
              </ListGroupItem>
              <ListGroupItem action variant="info">
                Price Per Day:&emsp;{carData.priceperday}
              </ListGroupItem>
              <ListGroupItem action variant="success">
                seatings:&emsp;{carData.seatingcapacity}
              </ListGroupItem>
            </ListGroup>
            <Card.Body style={{ justify: "center" }}>
              <Link to={`/getallcars`}>
                <Button variant="primary">Back</Button>
              </Link>
              &nbsp;&nbsp;&nbsp;
              <Link to={`/updatecar/${carData._id}`}>
                <Button variant="primary">Update</Button>
              </Link>
              &nbsp;&nbsp;&nbsp;
              <form method="POST">
                <input
                  type="submit"
                  name="deletecar"
                  onClick={Deletedata}
                  value="Delete"
                />
              </form>
            </Card.Body>
          </Card>
        </div>
      </div>
      <br></br>
      <br></br>
    </>
  );

  //   return (
  //     <>
  //       <p>
  //         <img
  //           src={carData.carpic ? imagePath + carData.carpic : car_default_pic}
  //         />
  //       </p>
  //       <p>Car Class:&emsp;{carData.carclass}</p>
  //       <p>Car Model:&emsp;{carData.carmodel}</p>
  //       <p>Car Transmission:&emsp;{carData.transmissiontype}</p>
  //       <p>Car Number:&emsp;{carData.carnumber}</p>
  //       <p>Car FuelType:&emsp;{carData.fueltype}</p>
  //       <p>Car Price Per Day:&emsp;{carData.priceperday}</p>
  //       <p>Car seatings:&emsp;{carData.seatingcapacity}</p>
  //       <Link to={`/getallcars`}>
  //         <button>Back</button>
  //       </Link>
  //       &emsp;
  //       <Link to={`/updatecar/${carData._id}`}>
  //         {" "}
  //         <button>Update Car</button>
  //       </Link>
  //     </>
  //   );
};

export default Viewcar;
