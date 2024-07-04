import Home from "../Home";

import Donors from "./Donors/Donors";
import CreateDonor from "./Donors/CreateDonor";
import EditDonor from "./Donors/EditDonor"; 
import Donor from "./Donors/Donor";

import InformationProvider from "./InformationProvider/InformationProvider";

import Students from "./InformationProvider/Students/Students";
import NewStudents from "./InformationProvider/Students/NewStudents";
import EditStudent from "./InformationProvider/Students/EditStudent"; 
import Student from "./InformationProvider/Students/Student";

import Patients from "./InformationProvider/Patients/Patients";
import NewPatients from "./InformationProvider/Patients/NewPatients";
import EditPatient from "./InformationProvider/Patients/EditPatient"; 
import Patient from "./InformationProvider/Patients/Patient";

import Needies from "./InformationProvider/Needies/Needies";
import NewNeedies from "./InformationProvider/Needies/NewNeedies";
import EditNeedy from "./InformationProvider/Needies/EditNeedy"; 
import Needy from "./InformationProvider/Needies/Needy";

import FileViewer from "./FileViewer";

import {useState} from "react";
import { Link ,Switch ,Route} from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';

import logo from "../../logo.png";


function Admin({history,match,location}) {
  
  const checkInformationProvider =  location.pathname.includes("admin/information-provider");
  const checkDonors =  location.pathname.includes("admin/donors");
  const [active, setActive] = useState(false);

  const logout = ()=>{
    reactLocalStorage.remove('token');
    reactLocalStorage.remove('user_id');
    reactLocalStorage.remove('user_role');
    history.push("/admin-login");
  }

  const toggleClass = () => {
      const currentState = active;
      setActive(!currentState );
  };

  if (!reactLocalStorage.get('token')){
    history.push("/admin-login");
   }
  else if (reactLocalStorage.get('user_role') !== 'admin'){
    logout();    
    history.push("/admin-login");
   
   }


  return (
      <div className="wrAdminer d-flex align-items-stretch">
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
               className={`${location.pathname === "/admin"  ? "active" : ""}`} 
              >
                <a>
                  <span className="fa fa-home mr-3"></span> Home
                </a>
              </li>
            </Link>


           <Link to={`${match.url}/donors`}>
              <li
              className={`${checkDonors ? "active" : ""}`} 
              >
                <a>
                  <span className="fa fa-user mr-3"></span>
                  Donors
                </a>
              </li>
            </Link>              

            <Link to={`${match.url}/information-provider`}>
              <li
                className={`${checkInformationProvider ? "active" : ""}`} 
              >
                <a className="d-flex align-items-center">
                  <span className="fa fa-user mr-3"></span>
                  Verify Information
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
    
          <Route exact path={`${match.path}/information-provider`} component={InformationProvider} />
           
          <Route exact path={`${match.path}/information-provider/needies/profile/:id`} component={Needy}/>
          
          <Route exact path={`${match.path}/information-provider/needies`} component={Needies} />
          
          <Route exact path={`${match.path}/information-provider/needies/profile/:id/:file/:file_type`} component={FileViewer}/>
                      
          <Route exact path={`${match.path}/information-provider/needies/edit/:id`} component={EditNeedy}/>
          
          <Route exact path={`${match.path}/information-provider/needies/new-needies`} component={NewNeedies} />


          
          <Route exact path={`${match.path}/information-provider/patients`} component={Patients} />
          
          <Route exact path={`${match.path}/information-provider/patients/edit/:id`} component={EditPatient}/>
          
          <Route exact path={`${match.path}/information-provider/patients/profile/:id/:file/:file_type`} component={FileViewer}/>
          
          <Route exact exact path={`${match.path}/information-provider/patients/profile/:id`} component={Patient}/>
        
          <Route exact path={`${match.path}/information-provider/patients/new-patients`} component={NewPatients} />
          
          
          
          <Route exact path={`${match.path}/information-provider/students`} component={Students} />

          <Route exact path={`${match.path}/information-provider/students/edit/:id`} component={EditStudent}/>
          
          <Route exact path={`${match.path}/information-provider/students/profile/:id`} component={Student}/>

          <Route exact path={`${match.path}/information-provider/students/profile/:id/:file/:file_type`} component={FileViewer}/>
            
          <Route exact path={`${match.path}/information-provider/students/new-students`} component={NewStudents} />
                          
          
  

          <Route exact path={`${match.path}/donors`} component={Donors} />
          
          <Route path={`${match.path}/donors/create`} component={CreateDonor}/>
             
          <Route path={`${match.path}/donors/profile/:id`} component={Donor}/>
                      
          <Route path={`${match.path}/donors/edit/:id`} component={EditDonor}/>

    
        </Switch>
      </div>
  );
}

export default Admin;