import { Link } from "react-router-dom";
function StudentsTableRow({match,student}) {
  return (
      <tr role="row">
      <td className="img_cont">
        <img
            style = {{marginTop:"-5px",marginBottom:"-5px"}}
           src={`${process.env.React_App_Url}/uploads/${student.avatar}`} alt={student.name}
           className="user_img"
        />
      </td>
      <td>{student.firstname} {student.lastname}</td>
      <td>{student.email}</td>
      <td>{student.contact}</td>
      <td>{student.gender}</td>
      <td>{student.city}</td>
      <td>{student.age}</td>
      <td>
        <Link to={`${match.url}/profile/${student.id}`}>
          <button className="btn btn-sm btn-outline-dark mr-1">
            View
          </button>
        </Link>  
      </td>
    </tr>
  );
}

export default StudentsTableRow;
