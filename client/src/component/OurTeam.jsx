import React from "react";
import harsh from "../team_imgs/harsh.jpg";
import shail from "../team_imgs/shail.jpg";
import "./OurTeam.css";
import Adminlogin from "./Adminlogin";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
class OurTeam extends React.Component {
  render() {
    return (
      <div className="our-team">
        <h1 className="heading-font" id="categories">
          Our Team
        </h1>
        <div className="row1">
          <div className="card3">
            <img src={harsh} alt="" />
            <div className="team-member">
              <h2>Harsh Thumar</h2>
              <p className="title"> Founder & CEO</p>
              <p>
                It takes 20 years to build a reputation and five minutes to ruin
                it. If you think about that, you’ll do things differently.
              </p>
              <p className="member-email">harshthumar3@gmail.com</p>
            </div>
          </div>

          <div className="card3">
            <img src={shail} alt="" />
            <div className="team-member">
              <h2>Shail Shah</h2>
              <p className="title">Co-Founder & CFO</p>
              <p>
                To me, business isn’t about wearing suits or pleasing
                stockholders. It’s about being true to yourself, your ideas and
                focusing on the essentials.
              </p>
              <p className="member-email">shailshah@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="row1">
          <Link to={"/adminlogin"}>
            <Button variant="secondary" size="lg">
              Admin Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default OurTeam;
