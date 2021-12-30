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
import Errorpage from "./component/Errorpage";

const App = () => {
  return (
    <>
      <Navbar />
      <Route exact path="/" component={Homepage} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/userprofile" component={Userprofile} />
    </>
  )
}
export default App