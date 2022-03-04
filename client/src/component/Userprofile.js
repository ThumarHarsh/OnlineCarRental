import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Editprofile from "./Editprofile";
import { Link } from "react-router-dom";

const Userprofile = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const calluserprofile = async () => {
    try {
      const res = await fetch("/userprofile", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setUserData(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      history.push("/login");
    }
  };

  useEffect(() => {
    calluserprofile();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "10px" }}>User Profile</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <form method="POST">
          <Card style={{ width: "23rem" }}>
            <Card.Header>Your Profile</Card.Header>
            <ListGroup className="list-group-flush">
              <ListGroupItem variant="success">
                Name:&emsp;{userData.name}
              </ListGroupItem>
              <ListGroupItem variant="info">
                Email:&emsp;{userData.email}
              </ListGroupItem>
              <ListGroupItem variant="success">
                Phone:&emsp;{userData.phone}
              </ListGroupItem>
              <ListGroupItem variant="info">
                City:&emsp;{userData.city}
              </ListGroupItem>
              <ListGroupItem variant="success">
                State:&emsp;{userData.city}
              </ListGroupItem>
              <ListGroupItem variant="info">
                Address: {userData.address}
              </ListGroupItem>
              <ListGroupItem variant="success">
                Date of Birth: {userData.dob}
              </ListGroupItem>
              <ListGroupItem>
                <br></br>
              </ListGroupItem>
            </ListGroup>
            <Card.Body style={{ justify: "center" }}>
              <Link to={"/Editprofile"}>
                <Button variant="primary">Update</Button>
              </Link>
            </Card.Body>
          </Card>
        </form>
      </div>
    </>
  );
};

export default Userprofile;
