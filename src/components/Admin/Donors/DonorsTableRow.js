import { Link } from "react-router-dom";
function DonorsTableRow({match,donor,deleteDonor}) {
  return (
      <tr role="row">
      <td className="img_cont">
        <img
            style = {{marginTop:"-5px",marginBottom:"-5px"}}
           src={`${process.env.React_App_Url}/uploads/${donor.avatar}`} alt={donor.name}
           className="user_img"
        />
      </td>
      <td>{donor.firstname} {donor.lastname}</td>
      <td>{donor.email}</td>
      <td>{donor.contact}</td>
      <td>{donor.gender}</td>
      <td>{donor.city}</td>
      <td>
        <Link to={`${match.url}/profile/${donor.id}`}>
          <button className="btn btn-sm btn-outline-dark mr-1">
            View
          </button>
        </Link>
        <Link to={`${match.url}/edit/${donor.id}`}>
          <button className="btn btn-sm btn-outline-dark mr-1">
            Edit
          </button>
        </Link>
        <button
          className="btn btn-sm btn-outline-dark"
          onClick={(e) => deleteDonor(donor.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default DonorsTableRow;
