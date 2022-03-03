import React, { Component } from "react";
import Bookcar from "./Bookcar";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import rent from "../images/rent11.PNG";
import rent1 from "../images/rent1.png";
import rent2 from "../images/rent2.PNG";

import Button from "react-bootstrap/Button";

class Slider extends Component {
  render() {
    return (
      <Carousel fade={true} pause={false}>
        <Carousel.Item interval={5000}>
          <img className="d-block w-100" src={rent} alt="First slide" />
          <Carousel.Caption>
            <Link to={"/Bookcar"}>
              <Button variant="primary" size="lg">
                Book Here
              </Button>
            </Link>
            <p>What Are you Waiting For!!! Book your Car Today! </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className="d-block w-100" src={rent1} alt="Third slide" />
          <Carousel.Caption>
            <h3 style={{ color: "black" }}>
              So,Don't think to much!!Just go through the Cars we have:
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className="d-block w-100" src={rent2} alt="Third slide" />
          <Carousel.Caption>
            <h3>You Demand we Deliver</h3>
            <p>Sanitized & Safe cars</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
    // return (
    //   <>
    //     <div
    //       style={{
    //         display: "block",
    //         width: "100%",
    //         height: "90%",
    //         padding: "auto",
    //         margin: "auto",
    //       }}
    //     >
    //       <Carousel fade className="test2">
    //         <Carousel.Item className="test1">
    //           <img className="d-block w-100   " src={rent2} alt="First slide" />

    //           <Carousel.Caption>
    //             <h3>Rent Our Car Today</h3>
    //           </Carousel.Caption>
    //         </Carousel.Item>
    //         <Carousel.Item className="test1">
    //           <img className="d-block w-100 " src={rent} alt="Second slide" />
    //         </Carousel.Item>
    //         <Carousel.Item className="test1">
    //           <img className="d-block w-100 " src={rent1} alt="Third slide" />
    //         </Carousel.Item>
    //       </Carousel>
    //     </div>
    //   </>
    //   // //  {/* <div className="main-image">
    //   //     <img src={Mainpage} alt="1" />
    //   //   </div> */}
    // );
  }
}

export default Slider;
