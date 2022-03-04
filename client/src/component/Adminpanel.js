import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";

const Adminpanel = () => {
  return (
    <>
      <h1 style={{ textAlign: "center", margin: "10px" }}>Admin Panel</h1>
      <Card className="text-center">
        <Card.Header as="h5">Panel 1</Card.Header>
        <Card.Body>
          <Card.Title>See All Cars Here</Card.Title>
          <Link to={"/getallcars"}>
            <Button variant="primary">All Cars</Button>
          </Link>
        </Card.Body>
      </Card>
      <br></br>
      <br></br>
      <Card className="text-center">
        <Card.Header as="h5">Panel 2</Card.Header>
        <Card.Body>
          <Card.Title>Add New Car Here</Card.Title>

          <Link to={"/registercar"}>
            <Button variant="primary">Add new car</Button>
          </Link>
        </Card.Body>
      </Card>
      <br></br>
      <br></br>
      <Card className="text-center">
        <Card.Header as="h5">
          {" "}
          <Link to={"/logout"}>
            <Button variant="primary">Logout</Button>
          </Link>
        </Card.Header>
      </Card>
    </>
  );
};
export default Adminpanel;
