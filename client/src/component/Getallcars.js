import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import car_default_pic from "../car_pic_default/defaultpic.png";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router-dom";
import "./Bookcar.css";

const Getallcars = () => {
  const history = useHistory();
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
      history.push("/");
    }
  };

  useEffect(() => {
    callallcars();
  }, []);

  return (
    <>
      <div className="Container">
        <div className="row">
          {carData.map((curElm) => {
            return (
              <>
                <Col>
                  <div key={curElm._id}>
                    <Card
                      className="text-center card2"
                      ss
                      style={{ width: "18rem" }}
                    >
                      <Card.Header></Card.Header>
                      <Card.Body>
                        <Card.Title>
                          {curElm.companyname}&nbsp;
                          {curElm.carmodel}
                        </Card.Title>
                        <Card.Text></Card.Text>
                        <Link to={`/viewcar/${curElm._id}`}>
                          <Button variant="primary">View Car</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </div>
                </Col>
              </>
            );
          })}
        </div>
      </div>
      <div style={{ alignItems: "center" }}>
        <Link to={`/adminpanel`}>
          <Button
            variant="primary"
            style={{ textAlign: "center", margin: "10px" }}
          >
            Back to Panel
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Getallcars;
