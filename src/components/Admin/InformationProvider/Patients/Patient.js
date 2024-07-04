import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import LocationShowModal from "../../../LocationShowModal";

import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Patient() {
  const token = reactLocalStorage.get("token");
  const [patient, setPatient] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    let getUserData = async () => {
      await axios
        .get(`${process.env.React_App_Url}/admin/patients/profile/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setPatient(response.data.result[0]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserData();
  }, []);
  return (
    <div id="content" className="mx-5">
      <div className="text-center my-5 ">
        <h2>Patient Profile</h2>
      </div>

     <div className="row">
        <div className="col-md-4 border pt-5 my-1 text-dark d-flex flex-column align-items-center">
          <div className="profile-img mb-3">
            <img src={`${process.env.React_App_Url}/uploads/${patient.avatar}`} alt={patient.name} />
          </div>
          <Link to={`../../patients/edit/${patient.id}`}>
            <button className="btn btn-outline-dark my-3">
              <i class="fa fa-edit"></i> Edit Profile
            </button>
          </Link>  
        </div>
        <div className="col-md-8 border p-4  my-1">
          <h2 className="text-dark mb-4">{patient.name}</h2>
          <div className="profile-tab">
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">CNIC</h5>
              </div>
              <div className="col-md-8">
                <p>{patient.cnic}</p>
              </div>
            </div> 
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Full Name</h5>
              </div>
              <div className="col-md-8">
                <p>
                  {patient.firstname} {patient.lastname}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Email</h5>
              </div>
              <div className="col-md-8">
                <p>{patient.email}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Gender</h5>
              </div>
              <div className="col-md-8">
                <p>{patient.gender}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Contact</h5>
              </div>
              <div className="col-md-8">
                <p>{patient.contact}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Age</h5>
              </div>
              <div className="col-md-8">
                <p>{patient.age}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">House No</h5>
              </div>
              <div className="col-md-8">
                {patient.housenumber ? (
                  <p>{patient.housenumber}</p>
                ) : (
                  <p className="text-dark">Null </p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Street</h5>
              </div>
              <div className="col-md-8">
                {patient.streetnumber ? (
                  <p>{patient.streetnumber}</p>
                ) : (
                  <p className="text-dark">Null </p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">City</h5>
              </div>
              <div className="col-md-8">
                <p>{patient.city}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">State</h5>
              </div>
              <div className="col-md-8">
                {patient.state ? (
                  <p>{patient.state}</p>
                ) : (
                  <p className="text-dark">Null </p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Country</h5>
              </div>
              <div className="col-md-8">
                <p>{patient.country}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Postal code</h5>
              </div>
              <div className="col-md-8">
                <p>{patient.postalcode}</p>
              </div>
            </div>    
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Home</h5>
              </div>
              <div className="col-md-8">
                <p>{patient.home}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Family Income</h5>
              </div>
              <div className="col-md-8">
                <p>{patient.familyincome}</p>
              </div>
            </div>  
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Disease</h5>
              </div>
              <div className="col-md-8">
                <p>{patient.disease}</p>
              </div>
            </div>  
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Expensis</h5>
              </div>
              <div className="col-md-8">
                <p>{patient.expensis}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Hospital</h5>
              </div>
              <div className="col-md-8">
                <p>{patient.hospital}</p>
              </div>
            </div>  
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Doctor</h5>
              </div>
              <div className="col-md-8">
                <p>{patient.doctor}</p>
              </div>
            </div>   
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Elder Sibling Age</h5>
              </div>
              <div className="col-md-8">
                <p>{patient.eldersiblingage}</p>
              </div>
            </div>     
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Both Parrents Died</h5>
              </div>
              <div className="col-md-8">
                <p>{patient.bothparrentsdied}</p>
              </div>
            </div>
            <div className="row">
            <div className="col-12">
              {patient.file_name && (
                <Link
                  to={`${patient.id}/${patient.file_name}/${patient.file_type}`}
                  style={{
                    color: "inherit",
                    textDecoration: "inherit",
                  }}
                >
                <button className="btn btn-outline-dark my-3 w-100">
                    View Attached Files
                  </button>
                </Link>
              )}
            </div>
          </div>
          </div>  
        </div>
      </div>

      <div className="row gutters-sm mt-1">
        <div className="col-12 h-100 mb-3">
          <LocationShowModal
            latitude={patient.latitude}
            longitude={patient.longitude}
          />
        </div>
      </div>
    </div>
  );
}

export default Patient;
