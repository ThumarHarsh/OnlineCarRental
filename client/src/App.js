// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { createContext, useReducer } from "react";
import { Route } from "react-router-dom";
import Homepage from "./component/Homepage";
import Navbar from "./component/Navbar";
import Register from "./component/Register";
import Login from "./component/Login";
import Userprofile from "./component/Userprofile";
import Editprofile from "./component/Editprofile";
import Logout from "./component/Logout";
import Registercar from "./component/Registercar";
import Getallcars from "./component/Getallcars";
import Viewcar from "./component/Viewcar";
import Updatecar from "./component/Updatecar";
import Bookcar from "./component/Bookcar";
import Confirmbooking from "./component/Confirmbooking";
import Errorpage from "./component/Errorpage";
import Footer from "./component/Footer";
import PageNotFound from "./component/PageNotFound";
import Adminregistration from "./component/Adminregistration";
import Adminlogin from "./component/Adminlogin";
import Adminpanel from "./component/Adminpanel";
import { initialState, reducer } from "../src/reducer/UseReducer";
import Logout_admin from "./component/Logout_admin";

export const UserContext = createContext();

const Routing = () => {
  return (
    <switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/adminpanel" component={Adminpanel} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/userprofile" component={Userprofile} />
      <Route exact path="/editprofile" component={Editprofile} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/logoutadmin" component={Logout_admin} />
      <Route exact path="/registercar" component={Registercar} />
      <Route exact path="/getallcars" component={Getallcars} />
      <Route exact path="/viewcar/:id" component={Viewcar} />
      <Route exact path="/updatecar/:id" component={Updatecar} />
      <Route exact path="/bookcar" component={Bookcar} />
      <Route exact path="/confirmbooking/:id" component={Confirmbooking} />
      <Route exact path="/adminlogin" component={Adminlogin} />
      <Route exact path="/adminregistration" component={Adminregistration} />
      {/* <Route component={PageNotFound} /> */}
    </switch>
  );
};
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />
        <Footer />
      </UserContext.Provider>
    </>
  );
};
export default App;
