import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import "./Testimonial.css";
import img1 from "../testimonial_imgs/img1.jpeg";
import img2 from "../testimonial_imgs/img2.jpg";
import img3 from "../testimonial_imgs/img3.jpg";

class Testimonial extends Component {
  render() {
    return (
      <div className="test">
        <h1 className="heading-font">TestiMonials</h1>
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          interval={6100}
        >
          <div>
            <img src={img1} alt="" />
            <div className="myCarousel">
              <h3>Shirley Fultz</h3>
              <h4>Designer</h4>
              <p>
                Booked for 4 days for a family trip. Car was water washed and
                sanitized when I recieved it. Trip and the process were very
                comfortable and hassle-free. Best self-drive car service
                provider. I strongly recommend Rentals. Looking forward to using
                Rentals car again
              </p>
            </div>
          </div>

          <div>
            <img src={img2} alt="" />
            <div className="myCarousel">
              <h3>Daniel Keystone</h3>
              <h4>Designer</h4>
              <p>
                Hello Rentals team, Helping people on very low cost through
                technology is the best you have done. Your service is the best.
              </p>
            </div>
          </div>

          <div>
            <img src={img3} alt="" />
            <div className="myCarousel">
              <h3>Theo Sorel</h3>
              <h4>Designer</h4>
              <p>
                Super quick Booking of car in less than a minute, Good and super
                fast response from Dealer.
              </p>
            </div>
          </div>
        </Carousel>
      </div>
    );
  }
}

export default Testimonial;
