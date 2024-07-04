import { Link } from "react-router-dom";
function PatientsTableRow({match,patient,deletePatient,addPatient}) {
  return (
      <tr role="row">
      <td className="img_cont">
        <img
            style = {{marginTop:"-5px",marginBottom:"-5px"}}
           src={`${process.env.React_App_Url}/uploads/${patient.avatar}`} alt={patient.name}
           className="user_img"
        />
      </td>
      <td>{patient.firstname} {patient.lastname}</td>
      <td>{patient.email}</td>
      <td>{patient.contact}</td>
      <td>{patient.city}</td>
      <td>
      <Link to={`/admin/information-provider/patients/profile/${patient.id}`}>
        <button className="btn btn-sm btn-outline-dark mr-1">
          View
        </button>
      </Link>
       <button 
          className="btn btn-sm btn-outline-dark mr-1"
          onClick={(e) => addPatient(patient.id)}
       >
          Add Patient
        </button>
        
        <button
          className="btn btn-sm btn-outline-dark"
          onClick={(e) => deletePatient(patient.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default PatientsTableRow;
