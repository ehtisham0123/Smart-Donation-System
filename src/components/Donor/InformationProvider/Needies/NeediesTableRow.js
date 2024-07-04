import { Link } from "react-router-dom";
function NeediesTableRow({match,needy}) {
  return (
      <tr role="row">
      <td className="img_cont">
        <img
            style = {{marginTop:"-5px",marginBottom:"-5px"}}
           src={`${process.env.React_App_Url}/uploads/${needy.avatar}`} alt={needy.name}
           className="user_img"
        />
      </td>
      <td>{needy.firstname} {needy.lastname}</td>
      <td>{needy.email}</td>
      <td>{needy.contact}</td>
      <td>{needy.gender}</td>
      <td>{needy.city}</td>
      <td>{needy.age}</td>
      <td>
        <Link to={`${match.url}/profile/${needy.id}`}>
          <button className="btn btn-sm btn-outline-dark mr-1">
            View
          </button>
        </Link>
      </td>
    </tr>
  );
}

export default NeediesTableRow;
