import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import LocationShowModal from "../../../LocationShowModal";

import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Student() {
  const token = reactLocalStorage.get("token");
  const [student, setStudent] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    let getUserData = async () => {
      await axios
        .get(`${process.env.React_App_Url}/donor/students/profile/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setStudent(response.data.result[0]);
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
        <h2>Student Profile</h2>
      </div>

     <div className="row">
        <div className="col-md-4 border pt-5 my-1 text-dark d-flex flex-column align-items-center">
          <div className="profile-img mb-3">
            <img src={`${process.env.React_App_Url}/uploads/${student.avatar}`} alt={student.name} />
          </div>
        </div>
        <div className="col-md-8 border p-4  my-1">
          <h2 className="text-dark mb-4">{student.name}</h2>
          <div className="profile-tab">
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">CNIC</h5>
              </div>
              <div className="col-md-8">
                <p>{student.cnic}</p>
              </div>
            </div> 
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Full Name</h5>
              </div>
              <div className="col-md-8">
                <p>
                  {student.firstname} {student.lastname}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Email</h5>
              </div>
              <div className="col-md-8">
                <p>{student.email}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Gender</h5>
              </div>
              <div className="col-md-8">
                <p>{student.gender}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Contact</h5>
              </div>
              <div className="col-md-8">
                <p>{student.contact}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Age</h5>
              </div>
              <div className="col-md-8">
                <p>{student.age}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">House No</h5>
              </div>
              <div className="col-md-8">
                {student.housenumber ? (
                  <p>{student.housenumber}</p>
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
                {student.streetnumber ? (
                  <p>{student.streetnumber}</p>
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
                <p>{student.city}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">State</h5>
              </div>
              <div className="col-md-8">
                {student.state ? (
                  <p>{student.state}</p>
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
                <p>{student.country}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Postal code</h5>
              </div>
              <div className="col-md-8">
                <p>{student.postalcode}</p>
              </div>
            </div>    
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Home</h5>
              </div>
              <div className="col-md-8">
                <p>{student.home}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Student Of</h5>
              </div>
              <div className="col-md-8">
                <p>{student.studentof}</p>
              </div>
            </div>  
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Fee</h5>
              </div>
              <div className="col-md-8">
                <p>{student.fee}</p>
              </div>
            </div>  
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Institute Name</h5>
              </div>
              <div className="col-md-8">
                <p>{student.institute}</p>
              </div>
            </div>  
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Family Income</h5>
              </div>
              <div className="col-md-8">
                <p>{student.familyincome}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Both Parrents Died</h5>
              </div>
              <div className="col-md-8">
                <p>{student.bothparrentsdied}</p>
              </div>
            </div>    
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Elder Sibling Age</h5>
              </div>
              <div className="col-md-8">
                <p>{student.eldersiblingage}</p>
              </div>
            </div>
          </div>  
        </div>
      </div>

      <div className="row gutters-sm mt-1">
        <div className="col-12 h-100 mb-3">
          <LocationShowModal
            latitude={student.latitude}
            longitude={student.longitude}
          />
        </div>
      </div>
    </div>
  );
}

export default Student;
