import React, { Component } from "react";
// import "./App.css";
// const jsonwebtoken = require("jsonwebtoken");
// const request = require("request");

// import 'materialize-css/dist/css/materialize.min.css'

// import M from 'materialize-css/dist/js/materialize.min.js'

import Login from "./pages/login/login";
// import Home from "./components/home";
import Register from "./pages/register/register";
import Dashboard from "./pages/dashboard/dashboard";
// import Navbar from "./components/navbar_metcss";
import fogotpassword from "./pages/fogotpassword/fogotpassword";
import resetpassword from "./pages/resetpassword/resetpassword";
import emailconfirm from "./pages/emailverify/emailverify";
// import Addcandidate from "./pages/addCandidate/addCandidate";
// import adminlogin from "./pages/adminlogin";
// import CandidateView from "./pages/candidateview/CandidateView";
// import Evaluation from "./pages/evaluation/evaluation";
import Userprofile from "./pages/userprofile/user";
// import Changepass from "./pages/changepass/changepass";
// import Avatar from "./pages/avatar";
//import TemporaryDrawer from "./sidenav";

import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
         
          {/* <TemporaryDrawer /> */}
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/register" component={Register} />
         
          <Route path="/Login" component={Login} />
          <Route path="/fogotpassword" component={fogotpassword} />
          <Route path="/resetpassword/:id" component={resetpassword} />
          <Route path="/confirmemail/:id" component={emailconfirm} />
          
          <Route path="/user/:id" component={Userprofile} />
        
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
