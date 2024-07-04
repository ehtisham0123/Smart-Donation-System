import { useState, useEffect } from "react";
import NeediesTableRow from "./NeediesTableRow";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import Spinner from '../../../Spinner.png';

function Needies({ match, location }) {
  const token = reactLocalStorage.get("token");
  const [loading, setLoading] = useState(false);
  const [needies, setNeedies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [neediesPerPage, setNeediesPerPage] = useState(5);
  const indexOfLastNeedy = currentPage * neediesPerPage;
  const indexOfFirstNeedy = indexOfLastNeedy - neediesPerPage;
  const currentNeedies = needies.slice(
    indexOfFirstNeedy,
    indexOfLastNeedy
  );

  useEffect(() => {
    setLoading(true);
    let getNeediesData = async () => {
      await axios
        .get(`${process.env.React_App_Url}/donor/needies/`,{
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setNeedies(response.data.result);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getNeediesData();
    console.log(process.env)
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const searchNeedy = async (name) => {
    setLoading(true);
    await axios
      .get(`${process.env.React_App_Url}/donor/needies/${name}`,{
          headers: {
            token: token,
          }
        })
      .then((response) => {
        if (response.data) {
          setNeedies(response.data.result);
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
        <h3 className="card-title text-center">Needies Table</h3>
        <div className="row d-flex align-items-center justify-content-between mr-1">
          <div>
            <input
              type="search"
              className="form-control search_bar ml-3"
              placeholder="Search"
              onChange={(e) => searchNeedy(e.target.value)}
            />
          </div>
        </div> 
        <table
          className="table table-responsive dataTable mt-3"
          role="grid"
          style={{ minHeight: "350px"}}
        >
          <thead>
            <tr role="row">
              <th style={{ minWidth: "5px" }}>Photo</th>
              <th style={{ minWidth: "100px" }}>Name</th>
              <th style={{ minWidth: "200px" }}>Email</th>
              <th style={{ minWidth: "50px" }}>Contact</th>
              <th style={{ minWidth: "50px" }}>Gender</th>
              <th style={{ minWidth: "50px" }}>City</th>
              <th style={{ minWidth: "50px" }}>Age</th>
              <th style={{ minWidth: "100px" }}>Actions</th>
            </tr>
          </thead>
           {loading ? (
              <div className="loading">
                  <img src={Spinner} className="loader" alt="loader" />
                  <h2>Loading</h2>
              </div>
            ) : (
          <tbody>
           
              {currentNeedies.map((needy) => (
                <NeediesTableRow match={match} needy={needy}/>
              ))}
          </tbody>
            )}
        </table>

        <div className="row d-flex align-items-center">
          <div className="col-8 col-md-3 ">
            Showing {indexOfFirstNeedy + 1} to {indexOfLastNeedy} of{" "}
            {needies.length} entities
          </div>
          <div class="col-4">
            <label>
              <select
                class="form-control select"
                onChange={(e) => {
                  setNeediesPerPage(e.target.value);
                }}
                value={neediesPerPage}
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
              neediesPerPage={neediesPerPage}
              totalNeedies={needies.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Needies;
