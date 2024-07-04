import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const token = reactLocalStorage.get("token");
  const [response, setResponse] = useState([]);
  return (
  <div id="content" className="p-4 p-md-5 pt-5">
    <h2 className="text-center mb-5">Smart Donation System</h2>
    <div class="container ml-4">
        <Link to={`information-provider/patients`} style={{ color: "inherit", textDecoration: "inherit" }} >
         <div class="row ">
            <div class="col-4 align-self-center text-center">
              <h3 class="h5 py-4 home-serv homeserv-border">    
                 Patient
              </h3>
            </div>
        </div>
      </Link>
        <Link to={`information-provider/students`} style={{ color: "inherit", textDecoration: "inherit" }} >
         <div class="row ">
            <div class="col-4">
            </div>
            <div class="col-4 align-self-center text-center">
              <h3 class="h5 py-4 home-serv homeserv-border">    
                 Student
              </h3>
            </div>
        </div>
      </Link>
      <Link to={`information-provider/needies`} style={{ color: "inherit", textDecoration: "inherit" }} >
         <div class="row ">
            <div class="col-8">
            </div>
            <div class="col-4 text-center">
              <h3 class="h5 py-4 home-serv homeserv-border">    
                 Needy
              </h3>
            </div>
        </div>
      </Link>

    </div>
  </div>
  );
}

export default Home;

              