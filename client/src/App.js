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

import React from "react";
import { Route } from 'react-router-dom';
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

const App = () => {
  return (
    <>
      <Navbar />
      <Route exact path="/" component={Homepage} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/userprofile" component={Userprofile} />
      <Route exact path="/editprofile" component={Editprofile} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/registercar" component={Registercar} />
      <Route exact path="/getallcars" component={Getallcars} />
      <Route exact path="/viewcar/:id" component={Viewcar} />
      <Route exact path="/updatecar/:id" component={Updatecar} />
      <Route exact path="/bookcar" component={Bookcar} />
      <Route exact path="/confirmbooking/:id" component={Confirmbooking} />
    </>
  )
}
export default App