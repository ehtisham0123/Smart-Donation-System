import Home from "../Home";

import EditProfile from "./Profile/EditProfile"; 
import Profile from "./Profile/Profile";

import InformationProvider from "./InformationProvider/InformationProvider";

import Students from "./InformationProvider/Students/Students";
import Student from "./InformationProvider/Students/Student";

import Patients from "./InformationProvider/Patients/Patients";
import Patient from "./InformationProvider/Patients/Patient";

import Needies from "./InformationProvider/Needies/Needies";
import Needy from "./InformationProvider/Needies/Needy";

import FileViewer from "./FileViewer";



import { useState } from "react";
import { Link ,Switch ,Route} from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';

import logo from "../../logo.png";


function Donor({history,match,location}) {
  const checkProfile =  location.pathname.includes("donor/profile");
  const checkInformationProvider =  location.pathname.includes("donor/information-provider");


  const [active, setActive] = useState(false);

   const logout = ()=>{
    reactLocalStorage.remove('token');
    reactLocalStorage.remove('user_id');
    reactLocalStorage.remove('user_role');
    history.push("/donor-login");
  }

  if (!reactLocalStorage.get('token')){
    history.push("/donor-login");
   }
  else if (reactLocalStorage.get('user_role') != 'donor'){
    logout();    
    history.push("/donor-login");
   }

  const toggleClass = () => {
      const currentState = active;
      setActive(!currentState );
  };


  return (
      <div className="wrapper d-flex align-items-stretch">
            <nav id="sidebar" className={active ? 'active': null}>
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
            
            <Link to={`${match.url}`}>
              <li 
               className={`${location.pathname === "/donor"  ? "active" : ""}`} 
              >
                <a>
                  <span className="fa fa-home mr-3"></span> Home
                </a>
              </li>
            </Link>

             <Link to={`${match.url}/profile`}>
              <li 
              className={`${checkProfile ? "active" : ""}`} 
              >
                <a>
                  <span className="fa fa-id-card mr-3"></span> Profile
                </a>
              </li>
            </Link>
            <Link to={`${match.url}/information-provider`}>
              <li
                className={`${checkInformationProvider ? "active" : ""}`} 
              >
                <a className="d-flex align-items-center">
                  <span className="fa fa-user mr-3"></span>
                  Donate
                </a>
              </li>
            </Link>
   
            <Link onClick={logout}>
              <li>
                <a>
                   <span className="fa fa-sign-out mr-3" aria-hidden="true"></span>
                    Logout
                </a>  
              </li>
            </Link>    
          </ul>
        </nav>
        <Switch>

          <Route exact path={`${match.path}`}  component={Home} />  


          <Route path={`${match.path}/profile/edit/`} component={EditProfile}/>

          <Route path={`${match.path}/profile/`} component={Profile}/>
                   


          <Route exact path={`${match.path}/information-provider`} component={InformationProvider} />
           
          
          <Route exact path={`${match.path}/information-provider/needies/profile/:id`} component={Needy}/>
          
          <Route exact path={`${match.path}/information-provider/needies`} component={Needies} />
          
          <Route exact path={`${match.path}/information-provider/needies/profile/:id/:file/:file_type`} component={FileViewer}/>
                      


          
          <Route exact path={`${match.path}/information-provider/patients`} component={Patients} />
          
          <Route exact path={`${match.path}/information-provider/patients/profile/:id/:file/:file_type`} component={FileViewer}/>
          
          <Route exact path={`${match.path}/information-provider/patients/profile/:id`} component={Patient}/>
        
          
          
          
          <Route exact path={`${match.path}/information-provider/students`} component={Students} />
 
          <Route exact path={`${match.path}/information-provider/students/profile/:id`} component={Student}/>

          <Route exact path={`${match.path}/information-provider/students/profile/:id/:file/:file_type`} component={FileViewer}/>
            
        
        </Switch>
      </div>
  );
}

export default Donor;
