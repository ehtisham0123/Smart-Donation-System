import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import LocationShowModal from "../../../LocationShowModal";

import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Needy() {
  const token = reactLocalStorage.get("token");
  const [needy, setNeedy] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    let getUserData = async () => {
      await axios
        .get(`${process.env.React_App_Url}/admin/needies/profile/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setNeedy(response.data.result[0]);
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
        <h2>Needy Profile</h2>
      </div>

     <div className="row">
        <div className="col-md-4 border pt-5 my-1 text-dark d-flex flex-column align-items-center">
          <div className="profile-img mb-3">
            <img src={`${process.env.React_App_Url}/uploads/${needy.avatar}`} alt={needy.name} />
          </div>
          <Link to={`../../needies/edit/${needy.id}`}>
            <button className="btn btn-outline-dark my-3">
              <i class="fa fa-edit"></i> Edit Profile
            </button>
          </Link> 
        </div>
        <div className="col-md-8 border p-4  my-1">
          <h2 className="text-dark mb-4">{needy.name}</h2>
          <div className="profile-tab">
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">CNIC</h5>
              </div>
              <div className="col-md-8">
                <p>{needy.cnic}</p>
              </div>
            </div> 
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Full Name</h5>
              </div>
              <div className="col-md-8">
                <p>
                  {needy.firstname} {needy.lastname}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Email</h5>
              </div>
              <div className="col-md-8">
                <p>{needy.email}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Gender</h5>
              </div>
              <div className="col-md-8">
                <p>{needy.gender}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Contact</h5>
              </div>
              <div className="col-md-8">
                <p>{needy.contact}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Age</h5>
              </div>
              <div className="col-md-8">
                <p>{needy.age}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">House No</h5>
              </div>
              <div className="col-md-8">
                {needy.housenumber ? (
                  <p>{needy.housenumber}</p>
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
                {needy.streetnumber ? (
                  <p>{needy.streetnumber}</p>
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
                <p>{needy.city}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">State</h5>
              </div>
              <div className="col-md-8">
                {needy.state ? (
                  <p>{needy.state}</p>
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
                <p>{needy.country}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Postal code</h5>
              </div>
              <div className="col-md-8">
                <p>{needy.postalcode}</p>
              </div>
            </div>    
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Home</h5>
              </div>
              <div className="col-md-8">
                <p>{needy.home}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Widow</h5>
              </div>
              <div className="col-md-8">
                <p>{needy.widow}</p>
              </div>
            </div>  
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Number Of Children</h5>
              </div>
              <div className="col-md-8">
                <p>{needy.numberofchildren}</p>
              </div>
            </div>  
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Family Income</h5>
              </div>
              <div className="col-md-8">
                <p>{needy.familyincome}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Both Parrents Died</h5>
              </div>
              <div className="col-md-8">
                <p>{needy.bothparrentsdied}</p>
              </div>
            </div>    
            <div className="row">
              <div className="col-md-4">
                <h5 className="headings">Elder Child Age</h5>
              </div>
              <div className="col-md-8">
                <p>{needy.elderchildage}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                {needy.file_name && (
                  <Link
                    to={`${needy.id}/${needy.file_name}/${needy.file_type}`}
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
            latitude={needy.latitude}
            longitude={needy.longitude}
          />
        </div>
      </div>
    </div>
  );
}

export default Needy;
