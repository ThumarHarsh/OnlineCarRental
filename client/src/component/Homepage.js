import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Slider from "./Slider";
import Content from "./Content";
import { Route, Switch } from "react-router-dom";
import Pagenotfound from "./PageNotFound";

const Homepage = () => {
  return (
    <div className="main-page">
      <Switch>
        <Route path="/" exact>
          <Slider />
          <Content />
        </Route>
        <Route>
          <Pagenotfound />
        </Route>
      </Switch>
    </div>
  );
};

export default Homepage;
