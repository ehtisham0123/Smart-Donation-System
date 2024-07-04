import { useState, useEffect } from "react";
import DonorsTableRow from "./DonorsTableRow";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import Spinner from '../../Spinner.png';

function Donors({ match, location }) {
  const token = reactLocalStorage.get("token");
  const [loading, setLoading] = useState(false);
  const [donor, setDonors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [donorPerPage, setDonorsPerPage] = useState(5);
  const indexOfLastDonor = currentPage * donorPerPage;
  const indexOfFirstDonor = indexOfLastDonor - donorPerPage;
  const currentDonors = donor.slice(
    indexOfFirstDonor,
    indexOfLastDonor
  );

  useEffect(() => {
    setLoading(true);
    let getUsersData = async () => {
      await axios
        .get(`${process.env.React_App_Url}/admin/donors/`,{
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setDonors(response.data.result);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUsersData();
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteDonor = async (id) => {
    await axios.delete(`${process.env.React_App_Url}/admin/donors/${id}`,{
          headers: {
            token: token,
          },
        }).then((res) => {
      const newDonors = donor.filter((donor) => donor.id !== id);
      setDonors(newDonors);
    });
  };

  const searchDonor = async (name) => {
    setLoading(true);
    await axios
      .get(`${process.env.React_App_Url}/admin/donors/${name}`,{
          headers: {
            token: token,
          }
        })
      .then((response) => {
        if (response.data) {
          setDonors(response.data.result);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id="content" className="p-4">
      <div className="card-body">
        <h3 className="card-title text-center">Donors table</h3>
        <div className="row d-flex align-items-center justify-content-between  mr-1">
          <div>
            <input
              type="search"
              className="form-control search_bar ml-3"
              placeholder="Search"
              onChange={(e) => searchDonor(e.target.value)}
            />
          </div>  

        {/* 

        <Link to={`${match.url}/create`}>
                   <button className="btn btn-outline-dark mr-1">
                     <i className="fa fa-user-plus"></i> Add Donor
                   </button>
                 </Link>
          */} 
        </div>

        <table
          className="table table-responsive dataTable mt-3"
          role="grid"
          style={{ minHeight: "350px"}}
        >
          <thead> 
            <tr role="row" >
              <th style={{ minWidth: "50px" }}>Photo</th>
              <th style={{ minWidth: "100px" }}>Name</th>
              <th style={{ minWidth: "200px" }}>Email</th>
              <th style={{ minWidth: "50px" }}>Contact</th>
              <th style={{ minWidth: "50px" }}>Gender</th>
              <th style={{ minWidth: "50px" }}>City</th>
              <th style={{ minWidth: "180px" }}>Actions</th>
                </tr>
          </thead>
           {loading ? (
              <div className="loading">
                  <img src={Spinner} className="loader" alt="loader" />
                  <h2>Loading</h2>
              </div>
            ) : (
          <tbody>
           
              {currentDonors.map((donor) => (
                <DonorsTableRow match={match} donor={donor} deleteDonor={deleteDonor}/>
              ))}
          </tbody>
            )}
        </table>

        <div className="row d-flex align-items-center">
          <div className="col-8 col-md-3 ">
            Showing {indexOfFirstDonor + 1} to {indexOfLastDonor} of{" "}
            {donor.length} entities
          </div>
          <div class="col-4">
            <label>
              <select
                class="form-control select"
                onChange={(e) => {
                  setDonorsPerPage(e.target.value);
                }}
                value={donorPerPage}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </label>
          </div>
          <div className="col-12 col-md-4 d-flex justify-content-center">
            <Pagination
              donorsPerPage={donorPerPage}
              totalDonors={donor.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Donors;
