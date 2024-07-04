import { Link } from "react-router-dom";
function NeediesTableRow({match,needy,deleteNeedy,addNeedy}) {
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
      <td>{needy.city}</td>
      <td>
        <Link to={`/admin/information-provider/needies/profile/${needy.id}`}>
          <button className="btn btn-sm btn-outline-dark mr-1">
            View
          </button>
        </Link>
       <button 
          className="btn btn-sm btn-outline-dark mr-1"
          onClick={(e) => addNeedy(needy.id)}
       >
          Add Needy
        </button>
        
        <button
          className="btn btn-sm btn-outline-dark"
          onClick={(e) => deleteNeedy(needy.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default NeediesTableRow;
