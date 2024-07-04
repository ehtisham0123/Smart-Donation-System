import { useState, useEffect } from "react";
import NewNeediesTableRow from "./NewNeediesTableRow";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import Spinner from '../../../Spinner.png';

function Needies({ match, location }) {
  const token = reactLocalStorage.get("token");
  const [loading, setLoading] = useState(false);
  const [needy, setNeedies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [neediesPerPage, setNeediesPerPage] = useState(5);
  const indexOfLastNeedy = currentPage * neediesPerPage;
  const indexOfFirstNeedy = indexOfLastNeedy - neediesPerPage;
  const currentNeedies = needy.slice(
    indexOfFirstNeedy,
    indexOfLastNeedy
  );

  useEffect(() => {
    setLoading(true);
    let getUsersData = async () => {
      await axios
        .get(`${process.env.React_App_Url}/admin/needies/new-needies/`,{
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
    getUsersData();
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteNeedy = async (id) => {
    await axios.delete(`${process.env.React_App_Url}/admin/needies/${id}`,{
          headers: {
            token: token,
          },
        }).then((res) => {
      const newNeedies = needy.filter((needy) => needy.id !== id);
      setNeedies(newNeedies);
    });
  };

  const addNeedy = async (id) => {
    await axios.get(`${process.env.React_App_Url}/admin/needies/new/${id}`,{
          headers: {
            token: token,
          },
        }).then((res) => {
      const newNeedies = needy.filter((needy) => needy.id !== id);
      setNeedies(newNeedies);
    });
  };


  const searchNeedy = async (name) => {
    setLoading(true);
    await axios
      .get(`${process.env.React_App_Url}/admin/needies/new-needies/${name}`,{
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
        <h3 className="card-title text-center">Needies table</h3>
        <div className="row d-flex align-items-center justify-content-between  mr-1">
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
            <tr role="row" >
              <th style={{ minWidth: "50px" }}>Photo</th>
              <th style={{ minWidth: "100px" }}>Name</th>
              <th style={{ minWidth: "200px" }}>Email</th>
              <th style={{ minWidth: "50px" }}>Contact</th>
              <th style={{ minWidth: "50px" }}>City</th>
              <th style={{ minWidth: "250px" }}>Actions</th>
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
                <NewNeediesTableRow match={match} needy={needy} deleteNeedy={deleteNeedy} addNeedy={addNeedy}/>
              ))}
          </tbody>
            )}
        </table>

        <div className="row d-flex align-items-center">
          <div className="col-8 col-md-3 ">
            Showing {indexOfFirstNeedy + 1} to {indexOfLastNeedy} of{" "}
            {needy.length} entities
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
              totalNeedies={needy.length}
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
