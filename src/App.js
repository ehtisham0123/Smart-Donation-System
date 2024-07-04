import "./App.css";
import {reactLocalStorage} from 'reactjs-localstorage';

import Home from "./Home";
import Admin from "./components/Admin/Admin";
import Donor from "./components/Donor/Donor";
import InformationProvider from "./components/InformationProvider/InformationProvider";

import AdminLogin from "./components/Admin/AdminLogin";
import DonorLogin from "./components/Donor/DonorLogin";
import DonorSignup from "./components/Donor/DonorSignup";

import NeedySignup from "./components/Needy/NeedySignup";
import StudentSignup from "./components/Student/StudentSignup";
import PatientSignup from "./components/Patient/PatientSignup";

import { Link, Switch, Route } from "react-router-dom";
import { useState } from "react";


import logo from "./logo.png";
require('dotenv').config()

function App({ location,history }) {
  const [active, setActive] = useState(false);
  const checkInformationProvider =  location.pathname.includes("/information-provider");
  const toggleClass = () => {
    const currentState = active;
    setActive(!currentState);
  };
  return (
    <div className="App">
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/donor" component={Donor} />
        
        <div className="wrapper d-flex align-items-stretch"  >
          <nav id="sidebar" className={active ? "active" : null}>
            <div className="custom-menu">
              <button
                type="button"
                id="sidebarCollapse"
                className="btn btn-primary"
                onClick={toggleClass}
              ></button>
            </div>
            <div
              className="img bg-wrap text-center py-4"
               style={{ backgroundImage: "url(" + logo + ")" }}
            >
            </div>
            <ul className="list-unstyled components mb-5">
              <Link to={`/`}>
                <li className={`${location.pathname === "/" ? "active" : ""}`}>
                  <a>
                    <span className="fa fa-home mr-3"></span>
                    Home
                  </a>
                </li>
              </Link>
              <Link to={`/admin-login`}>
                <li
                  className={`${
                    location.pathname === "/admin-login" ? "active" : ""
                  }`}
                >
                  <a>
                    <span className="fa fa-sign-in mr-3"></span>
                    Admin Login
                  </a>
                </li>
              </Link>
              <Link to={`/donor-signup`}>
                <li
                  className={`${
                    location.pathname === "/donor-signup" ? "active" : ""
                  }`}
                >
                  <a className="d-flex align-items-center">
                    <span className="fa fa-user-plus mr-3"></span>
                    Donor Registration
                  </a>
                </li>
              </Link>
              <Link to={`/donor-login`}>
                <li
                  className={`${
                    location.pathname === "/donor-login" ? "active" : ""
                  }`}
                >
                  <a className="d-flex align-items-center">
                    <span className="fa fa-sign-in mr-3"></span>                      
                    Donor Login
                  </a>
                </li>
              </Link>
           
              <Link to={`/information-provider`}>
                <li
                    className={`${checkInformationProvider ? "active" : ""}`} 
                >
                  <a className="d-flex align-items-center">
                    <span className="fa fa-user-plus mr-3"></span>
                     Provide Information
                  </a>
                </li>
              </Link>
            </ul>
          </nav>

          <Route exact path="/" component={Home} />

          <Route path="/admin-login" component={AdminLogin} />
          <Route path="/donor-login" component={DonorLogin} />
          <Route path="/donor-signup/" component={DonorSignup} />

          <Route exact path="/information-provider" component={InformationProvider} />
          
          <Route  path="/information-provider/needy-signup" component={NeedySignup} />
          <Route  path="/information-provider/student-signup" component={StudentSignup} />
          <Route  path="/information-provider/patient-signup" component={PatientSignup} />
        </div>
      </Switch>
    </div>
  );
}

export default App;
