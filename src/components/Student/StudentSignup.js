import { useState } from "react";
import "../../App.css";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { Link } from "react-router-dom";
import LocationSearchModal from "../LocationSearchModal";

let illegalUserName = /\W/;
let validEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let validName = /^[A-Za-z]+$/;
let ValidContact = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
let ValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;

function StudentSignup(props) {
  const [formdata, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    fathername: "",
    age: "",
    housenumber: "",
    streetnumber: "",
    city: "",
    state: "",
    postalcode: "",
    country: "",
    contact: "",
    gender: "",

    cnic: "",
    studentof: "",
    fee: "",
    institute: "",
    familyincome: "",
    bothparrentsdied: "",
    eldersiblingage: "",
    home: "",
    avatar: "",
    file: "",
    position: {
      lat: "",
      lng: "",
    },
  });

  const [errors, setErrors] = useState({
    email: "",
    firstname: "",
    lastname: "",
    fathername: "",
    age: "",
    housenumber: "",
    streetnumber: "",
    city: "",
    state: "",
    postalcode: "",
    country: "",
    contact: "",
    gender: "",
    cnic: "",
    studentof: "",
    fee: "",
    institute: "",
    familyincome: "",
    bothparrentsdied: "",
    eldersiblingage: "",
    home: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const changePosition = (latitude, longitude) => {
    let pos = {
      latitude,
      longitude,
    };
    setFormData((prevState) => ({
      ...prevState,
      position: pos,
    }));
  };

  const handlePhoto = (e) => {
    setFormData({ ...formdata, avatar: e.target.files[0] });
  };

  const handleFile = (e) => {
    setFormData({ ...formdata, file: e.target.files[0] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    switch (name) {
      // checking email
      case "email":
        if (!value.match(validEmail)) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Invalid Email",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        }
        break;
      // checking first name
      case "firstname":
        if (value.length < 3) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "First Name length must be atleast 3 characters",
          }));
        } else if (value.length > 15) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "First Name must not exceed 15 characters",
          }));
        } else if (!value.match(validName)) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "The First Name contains illegal characters.",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        }
        break;
      // checking last name
      case "lastname":
        if (value.length < 3) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Last Name length must be atleast 3 characters",
          }));
        } else if (value.length > 15) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Last Name must not exceed 15 characters",
          }));
        } else if (!value.match(validName)) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "The Last Name contains illegal characters.",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        }
        break;
      // checking user name
      case "fathername":
        if (value.length < 5) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Father Name length must be atleast 5 characters",
          }));
        } else if (value.length > 18) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Father Name must not exceed 18 characters",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        }
        break;

      // checking Contact
      case "contact":
        if (!value.match(ValidContact)) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Invalid Contact",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        }
        break;

      // checking Contact
      case "country":
        if (value !== "null") {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Please Select a Country",
          }));
        }
        break;

      // checking City
      case "city":
        if (value.length < 3) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "City length must be atleast 3 characters",
          }));
        } else if (value.length > 20) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "City Lenght must not exceed 20 characters",
          }));
        } else if (!value.match(validName)) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "City Contains illegal characters.",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        }
        break;
        case "age":
        if (value > 3 && value < 60) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Invalid Age",
          }));
        }
        break;

        case "fee":
        if (value > -1 && value < 200001) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Invalid Selection",
          }));
        }
        break;

        case "eldersiblingage":
        if (value > 0 && value < 80) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Invalid Age",
          }));
        }
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formdata.country === "null") {
      errors.country = "Please Select a Country";
    }
    if (formdata.position.lat === "" || formdata.position.lng === "") {
      setError("Please Select Location");
    } else if (
      errors.email === "" &&
      errors.firstname === "" &&
      errors.lastname === "" &&
      errors.fathername === "" &&
      errors.age === "" &&
      errors.eldersiblingage === "" && 
      errors.city === "" &&
      errors.country === "" &&
      errors.contact === "" &&
      errors.gender === ""
    ) {
      const fd = new FormData();
      fd.append("email", formdata.email);
      fd.append("firstname", formdata.firstname);
      fd.append("lastname", formdata.lastname);
      fd.append("fathername", formdata.fathername);
      fd.append("age", formdata.age);
      fd.append("housenumber", formdata.housenumber);
      fd.append("streetnumber", formdata.streetnumber);
      fd.append("city", formdata.city);
      fd.append("state", formdata.state);
      fd.append("postalcode", formdata.postalcode);
      fd.append("country", formdata.country);
      fd.append("contact", formdata.contact);
      fd.append("gender", formdata.gender);
      fd.append("avatar", formdata.avatar);
      fd.append("file", formdata.file);
      fd.append("latitude", formdata.position.latitude);
      fd.append("longitude", formdata.position.longitude);
      fd.append("cnic", formdata.cnic);
      fd.append("studentof", formdata.studentof);
      fd.append("institute", formdata.institute);
      fd.append("fee", formdata.fee);
      fd.append("familyincome", formdata.familyincome);
      fd.append("bothparrentsdied", formdata.bothparrentsdied);
      fd.append("eldersiblingage", formdata.eldersiblingage);
      fd.append("home", formdata.home);
      
      await axios
        .post(`${process.env.React_App_Url}/student/signup`, fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          if (response.data.success) {
            setSuccess(response.data.success);
            setFormData({
              email: "",
              firstname: "",
              lastname: "",
              fathername: "",
              age: "",
              housenumber: "",
              streetnumber: "",
              city: "",
              state: "",
              postalcode: "",
              country: "",
              contact: "",
              gender: "",
              avatar: "",
              file: "",
              cnic: "",
              studentof: "",
              fee: "",
              institute: "",
              familyincome: "",
              bothparrentsdied: "",
              eldersiblingage: "",
              home: "",
            });
          } else if (response.data.error) {
            setError(response.data.error);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div id="content" className="mx-5">
      <div className="text-center my-5 ">
        <h2>Student Registration</h2>
      </div>
    <form onSubmit={handleSubmit} className="needs-validation">
        <div className="row">
          {/* CNIC */} 
          <div className="form-group col-md-3">
            <label for="cnic">CNIC / Form-B</label>
            <input
              type="text"
              name="cnic"
              className={`form-control input ${errors.cnic ? "is-invalid" : ""
                }`}
              id="cnic"
              placeholder="CNIC / Form-B"
              onChange={handleChange}
              value={formdata.cnic}
              required
            />
            {errors.cnic && (
              <div className="invalid-feedback">{errors.cnic}</div>
            )}
          </div>
          {/* Email */} 
          <div className="form-group col-md-3">
            <label for="email">Email</label>
            <input
              type="email"
              name="email"
              className={`form-control input ${errors.email ? "is-invalid" : ""
                }`}
              id="email"
              placeholder="Email"
              onChange={handleChange}
              value={formdata.email}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          {/* First Name */} 
          <div className="form-group col-md-3">
            <label for="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              className={`form-control input ${errors.firstname ? "is-invalid" : ""
                }`}
              id="firstname"
              placeholder="First Name"
              onChange={handleChange}
              value={formdata.firstname}
              required
            />
            {errors.firstname && (
              <div className="invalid-feedback">{errors.firstname}</div>
            )}
          </div>
          {/* Last Name */} 
          <div className="form-group col-md-3">
            <label for="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              className={`form-control input ${errors.lastname ? "is-invalid" : ""
                }`}
              id="lastname"
              placeholder="last Name"
              onChange={handleChange}
              value={formdata.lastname}
              required
            />
            {errors.lastname && (
              <div className="invalid-feedback">{errors.lastname}</div>
            )}
          </div>
          {/* Age */} 
          <div className="form-group col-md-3">
            <label for="age">Age</label>
            <input
              name="age"
              className={`form-control input ${errors.age ? "is-invalid" : ""}`}
              type="number"
              id="age"
              placeholder="Age"
              onChange={handleChange}
              value={formdata.age}
              required
            />
            {errors.age && <div className="invalid-feedback">{errors.age}</div>}
          </div>
           {/* Contact Number */} 
          <div className="form-group col-md-3">
            <label for="contact">Contact Number</label>
            <input
              type="text"
              name="contact"
              className={`form-control input ${errors.contact ? "is-invalid" : ""
                }`}
              id="contact"
              placeholder="Contact Number"
              onChange={handleChange}
              value={formdata.contact}
              required
            />
            {errors.contact && (
              <div className="invalid-feedback">{errors.contact}</div>
            )}
          </div>
          {/* Father Name */} 
          <div className="form-group col-md-3">
            <label for="fathername">Father Name</label>
            <input
              type="text"
              name="fathername"
              className={`form-control input ${errors.fathername ? "is-invalid" : ""
                }`}
              id="fathername"
              placeholder="Father Name"
              onChange={handleChange}
              value={formdata.fathername}
              required
            />
            {errors.fathername && (
              <div className="invalid-feedback">{errors.fathername}</div>
            )}
          </div>
          {/* Gender */} 
          <div className="form-group col-md-3">
            <p style={{ marginBottom: "2px" }}>Gender</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="male"
                value="male"
                onChange={handleChange}
                required
              />
              <label className="form-check-label" for="male">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="female"
                value="female"
                onChange={handleChange}
                required
              />
              <label className="form-check-label" for="female" value="female">
                Female
              </label>
            </div>
          </div>
          {/* House Number */} 
          <div className="form-group col-md-3">
            <label for="housenumber">House Number</label>
            <input
              type="text"
              name="housenumber"
              className="form-control input"
              id="housenumber"
              placeholder="House Number"
              onChange={handleChange}
              value={formdata.housenumber}
            />
          </div>
          {/* Street Number */} 
          <div className="form-group col-md-3">
            <label for="streetnumber">Street Number</label>
            <input
              type="text"
              name="streetnumber"
              className="form-control input"
              id="streetnumber"
              placeholder="Street Number"
              onChange={handleChange}
              value={formdata.streetnumber}
            />
          </div>
          {/* State */} 
          <div className="form-group col-md-3">
            <label for="state">State</label>
            <input
              type="text"
              name="state"
              className="form-control input"
              id="state"
              placeholder="State"
              onChange={handleChange}
              value={formdata.state}
            />
          </div>
          {/* Postal Code */} 
          <div className="form-group col-md-3">
            <label for="postalcode">Postal Code</label>
            <input
              type="text"
              name="postalcode"
              className="form-control input"
              id="postalcode"
              placeholder="Postal Code"
              onChange={handleChange}
              value={formdata.postalcode}
              required
            />
          </div>
          {/* City */} 
          <div className="form-group col-md-3">
            <label for="city">City</label>
            <input
              type="text"
              name="city"
              className={`form-control input ${errors.city ? "is-invalid" : ""
                }`}
              id="city"
              placeholder="City"
              onChange={handleChange}
              value={formdata.city}
              required
            />
            {errors.city && (
              <div className="invalid-feedback">{errors.city}</div>
            )}
          </div>
          {/* Country */} 
          <div className="form-group col-md-3">
            <label for="country">Country</label>
            <select
              id="country"
              name="country"
              className={`form-control input ${errors.country ? "is-invalid" : ""
                }`}
              value={formdata.country}
              onChange={handleChange}
            >
              <option value="null">Select a Country</option>
              <option value="Afghanistan">Afghanistan</option>
              <option value="Åland Islands">Åland Islands</option>
              <option value="Albania">Albania</option>
              <option value="Algeria">Algeria</option>
              <option value="American Samoa">American Samoa</option>
              <option value="Andorra">Andorra</option>
              <option value="Angola">Angola</option>
              <option value="Anguilla">Anguilla</option>
              <option value="Antarctica">Antarctica</option>
              <option value="Antigua and Barbuda">Antigua and Barbuda</option>
              <option value="Argentina">Argentina</option>
              <option value="Armenia">Armenia</option>
              <option value="Aruba">Aruba</option>
              <option value="Australia">Australia</option>
              <option value="Austria">Austria</option>
              <option value="Azerbaijan">Azerbaijan</option>
              <option value="Bahamas">Bahamas</option>
              <option value="Bahrain">Bahrain</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Barbados">Barbados</option>
              <option value="Belarus">Belarus</option>
              <option value="Belgium">Belgium</option>
              <option value="Belize">Belize</option>
              <option value="Benin">Benin</option>
              <option value="Bermuda">Bermuda</option>
              <option value="Bhutan">Bhutan</option>
              <option value="Bolivia">Bolivia</option>
              <option value="Bosnia and Herzegovina">
                Bosnia and Herzegovina
              </option>
              <option value="Botswana">Botswana</option>
              <option value="Bouvet Island">Bouvet Island</option>
              <option value="Brazil">Brazil</option>
              <option value="British Indian Ocean Territory">
                British Indian Ocean Territory
              </option>
              <option value="Brunei Darussalam">Brunei Darussalam</option>
              <option value="Bulgaria">Bulgaria</option>
              <option value="Burkina Faso">Burkina Faso</option>
              <option value="Burundi">Burundi</option>
              <option value="Cambodia">Cambodia</option>
              <option value="Cameroon">Cameroon</option>
              <option value="Canada">Canada</option>
              <option value="Cape Verde">Cape Verde</option>
              <option value="Cayman Islands">Cayman Islands</option>
              <option value="Central African Republic">
                Central African Republic
              </option>
              <option value="Chad">Chad</option>
              <option value="Chile">Chile</option>
              <option value="China">China</option>
              <option value="Christmas Island">Christmas Island</option>
              <option value="Cocos (Keeling) Islands">
                Cocos (Keeling) Islands
              </option>
              <option value="Colombia">Colombia</option>
              <option value="Comoros">Comoros</option>
              <option value="Congo">Congo</option>
              <option value="Congo, The Democratic Republic of The">
                Congo, The Democratic Republic of The
              </option>
              <option value="Cook Islands">Cook Islands</option>
              <option value="Costa Rica">Costa Rica</option>
              <option value="Cote D'ivoire">Cote D'ivoire</option>
              <option value="Croatia">Croatia</option>
              <option value="Cuba">Cuba</option>
              <option value="Cyprus">Cyprus</option>
              <option value="Czech Republic">Czech Republic</option>
              <option value="Denmark">Denmark</option>
              <option value="Djibouti">Djibouti</option>
              <option value="Dominica">Dominica</option>
              <option value="Dominican Republic">Dominican Republic</option>
              <option value="Ecuador">Ecuador</option>
              <option value="Egypt">Egypt</option>
              <option value="El Salvador">El Salvador</option>
              <option value="Equatorial Guinea">Equatorial Guinea</option>
              <option value="Eritrea">Eritrea</option>
              <option value="Estonia">Estonia</option>
              <option value="Ethiopia">Ethiopia</option>
              <option value="Falkland Islands (Malvinas)">
                Falkland Islands (Malvinas)
              </option>
              <option value="Faroe Islands">Faroe Islands</option>
              <option value="Fiji">Fiji</option>
              <option value="Finland">Finland</option>
              <option value="France">France</option>
              <option value="French Guiana">French Guiana</option>
              <option value="French Polynesia">French Polynesia</option>
              <option value="French Southern Territories">
                French Southern Territories
              </option>
              <option value="Gabon">Gabon</option>
              <option value="Gambia">Gambia</option>
              <option value="Georgia">Georgia</option>
              <option value="Germany">Germany</option>
              <option value="Ghana">Ghana</option>
              <option value="Gibraltar">Gibraltar</option>
              <option value="Greece">Greece</option>
              <option value="Greenland">Greenland</option>
              <option value="Grenada">Grenada</option>
              <option value="Guadeloupe">Guadeloupe</option>
              <option value="Guam">Guam</option>
              <option value="Guatemala">Guatemala</option>
              <option value="Guernsey">Guernsey</option>
              <option value="Guinea">Guinea</option>
              <option value="Guinea-bissau">Guinea-bissau</option>
              <option value="Guyana">Guyana</option>
              <option value="Haiti">Haiti</option>
              <option value="Heard Island and Mcdonald Islands">
                Heard Island and Mcdonald Islands
              </option>
              <option value="Holy See (Vatican City State)">
                Holy See (Vatican City State)
              </option>
              <option value="Honduras">Honduras</option>
              <option value="Hong Kong">Hong Kong</option>
              <option value="Hungary">Hungary</option>
              <option value="Iceland">Iceland</option>
              <option value="India">India</option>
              <option value="Indonesia">Indonesia</option>
              <option value="Iran, Islamic Republic of">
                Iran, Islamic Republic of
              </option>
              <option value="Iraq">Iraq</option>
              <option value="Ireland">Ireland</option>
              <option value="Isle of Man">Isle of Man</option>
              <option value="Israel">Israel</option>
              <option value="Italy">Italy</option>
              <option value="Jamaica">Jamaica</option>
              <option value="Japan">Japan</option>
              <option value="Jersey">Jersey</option>
              <option value="Jordan">Jordan</option>
              <option value="Kazakhstan">Kazakhstan</option>
              <option value="Kenya">Kenya</option>
              <option value="Kiribati">Kiribati</option>
              <option value="Korea, Democratic People's Republic of">
                Korea, Democratic People's Republic of
              </option>
              <option value="Korea, Republic of">Korea, Republic of</option>
              <option value="Kuwait">Kuwait</option>
              <option value="Kyrgyzstan">Kyrgyzstan</option>
              <option value="Lao People's Democratic Republic">
                Lao People's Democratic Republic
              </option>
              <option value="Latvia">Latvia</option>
              <option value="Lebanon">Lebanon</option>
              <option value="Lesotho">Lesotho</option>
              <option value="Liberia">Liberia</option>
              <option value="Libyan Arab Jamahiriya">
                Libyan Arab Jamahiriya
              </option>
              <option value="Liechtenstein">Liechtenstein</option>
              <option value="Lithuania">Lithuania</option>
              <option value="Luxembourg">Luxembourg</option>
              <option value="Macao">Macao</option>
              <option value="Macedonia, The Former Yugoslav Republic of">
                Macedonia, The Former Yugoslav Republic of
              </option>
              <option value="Madagascar">Madagascar</option>
              <option value="Malawi">Malawi</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Maldives">Maldives</option>
              <option value="Mali">Mali</option>
              <option value="Malta">Malta</option>
              <option value="Marshall Islands">Marshall Islands</option>
              <option value="Martinique">Martinique</option>
              <option value="Mauritania">Mauritania</option>
              <option value="Mauritius">Mauritius</option>
              <option value="Mayotte">Mayotte</option>
              <option value="Mexico">Mexico</option>
              <option value="Micronesia, Federated States of">
                Micronesia, Federated States of
              </option>
              <option value="Moldova, Republic of">Moldova, Republic of</option>
              <option value="Monaco">Monaco</option>
              <option value="Mongolia">Mongolia</option>
              <option value="Montenegro">Montenegro</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Morocco">Morocco</option>
              <option value="Mozambique">Mozambique</option>
              <option value="Myanmar">Myanmar</option>
              <option value="Namibia">Namibia</option>
              <option value="Nauru">Nauru</option>
              <option value="Nepal">Nepal</option>
              <option value="Netherlands">Netherlands</option>
              <option value="Netherlands Antilles">Netherlands Antilles</option>
              <option value="New Caledonia">New Caledonia</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Nicaragua">Nicaragua</option>
              <option value="Niger">Niger</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Niue">Niue</option>
              <option value="Norfolk Island">Norfolk Island</option>
              <option value="Northern Mariana Islands">
                Northern Mariana Islands
              </option>
              <option value="Norway">Norway</option>
              <option value="Oman">Oman</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Palau">Palau</option>
              <option value="Palestinian Territory, Occupied">
                Palestinian Territory, Occupied
              </option>
              <option value="Panama">Panama</option>
              <option value="Papua New Guinea">Papua New Guinea</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Peru">Peru</option>
              <option value="Philippines">Philippines</option>
              <option value="Pitcairn">Pitcairn</option>
              <option value="Poland">Poland</option>
              <option value="Portugal">Portugal</option>
              <option value="Puerto Rico">Puerto Rico</option>
              <option value="Qatar">Qatar</option>
              <option value="Reunion">Reunion</option>
              <option value="Romania">Romania</option>
              <option value="Russian Federation">Russian Federation</option>
              <option value="Rwanda">Rwanda</option>
              <option value="Saint Helena">Saint Helena</option>
              <option value="Saint Kitts and Nevis">
                Saint Kitts and Nevis
              </option>
              <option value="Saint Lucia">Saint Lucia</option>
              <option value="Saint Pierre and Miquelon">
                Saint Pierre and Miquelon
              </option>
              <option value="Saint Vincent and The Grenadines">
                Saint Vincent and The Grenadines
              </option>
              <option value="Samoa">Samoa</option>
              <option value="San Marino">San Marino</option>
              <option value="Sao Tome and Principe">
                Sao Tome and Principe
              </option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Senegal">Senegal</option>
              <option value="Serbia">Serbia</option>
              <option value="Seychelles">Seychelles</option>
              <option value="Sierra Leone">Sierra Leone</option>
              <option value="Singapore">Singapore</option>
              <option value="Slovakia">Slovakia</option>
              <option value="Slovenia">Slovenia</option>
              <option value="Solomon Islands">Solomon Islands</option>
              <option value="Somalia">Somalia</option>
              <option value="South Africa">South Africa</option>
              <option value="South Georgia and The South Sandwich Islands">
                South Georgia and The South Sandwich Islands
              </option>
              <option value="Spain">Spain</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="Sudan">Sudan</option>
              <option value="Suriname">Suriname</option>
              <option value="Svalbard and Jan Mayen">
                Svalbard and Jan Mayen
              </option>
              <option value="Swaziland">Swaziland</option>
              <option value="Sweden">Sweden</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Syrian Arab Republic">Syrian Arab Republic</option>
              <option value="Taiwan, Province of China">
                Taiwan, Province of China
              </option>
              <option value="Tajikistan">Tajikistan</option>
              <option value="Tanzania, United Republic of">
                Tanzania, United Republic of
              </option>
              <option value="Thailand">Thailand</option>
              <option value="Timor-leste">Timor-leste</option>
              <option value="Togo">Togo</option>
              <option value="Tokelau">Tokelau</option>
              <option value="Tonga">Tonga</option>
              <option value="Trinidad and Tobago">Trinidad and Tobago</option>
              <option value="Tunisia">Tunisia</option>
              <option value="Turkey">Turkey</option>
              <option value="Turkmenistan">Turkmenistan</option>
              <option value="Turks and Caicos Islands">
                Turks and Caicos Islands
              </option>
              <option value="Tuvalu">Tuvalu</option>
              <option value="Uganda">Uganda</option>
              <option value="Ukraine">Ukraine</option>
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States">United States</option>
              <option value="United States Minor Outlying Islands">
                United States Minor Outlying Islands
              </option>
              <option value="Uruguay">Uruguay</option>
              <option value="Uzbekistan">Uzbekistan</option>
              <option value="Vanuatu">Vanuatu</option>
              <option value="Venezuela">Venezuela</option>
              <option value="Viet Nam">Viet Nam</option>
              <option value="Virgin Islands, British">
                Virgin Islands, British
              </option>
              <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
              <option value="Wallis and Futuna">Wallis and Futuna</option>
              <option value="Western Sahara">Western Sahara</option>
              <option value="Yemen">Yemen</option>
              <option value="Zambia">Zambia</option>
              <option value="Zimbabwe">Zimbabwe</option>
            </select>

            {errors.country && (
              <div className="invalid-feedback">{errors.country}</div>
            )}
          </div>  
          {/* Elder Sibling Age */}    
          <div className="form-group col-md-3">
            <label for="eldersiblingage">Elder Sibling Age</label>
            <input
              name="eldersiblingage"
              className={`form-control input ${errors.eldersiblingage ? "is-invalid" : ""}`}
              type="number"
              id="eldersiblingage"
              placeholder="Elder Sibling Age"
              onChange={handleChange}
              value={formdata.eldersiblingage}
              required
            />
            {errors.eldersiblingage && <div className="invalid-feedback">{errors.eldersiblingage}</div>}
          </div> 
          {/* Family Income */} 
          <div className="form-group col-md-3">
            <label for="familyincome">Income of All Members</label>
            <input
              name="familyincome"
              className={`form-control input ${errors.familyincome ? "is-invalid" : ""}`}
              type="number"
              id="familyincome"
              placeholder="Family Income"
              onChange={handleChange}
              value={formdata.familyincome}
              required
            />
            {errors.familyincome && <div className="invalid-feedback">{errors.familyincome}</div>}
          </div>
          {/* Uni Name */} 
          <div className="form-group col-md-3">
            <label for="">Uni/School/College Name</label>
            <input
              name="institute"
              className={`form-control input ${errors.institute ? "is-invalid" : ""}`}
              type="text"
              id="institute"
              placeholder="Uni/School/College Name"
              onChange={handleChange}
              value={formdata.institute}
              required
            />
            {errors.institute && <div className="invalid-feedback">{errors.institute}</div>}
          </div>
          {/* Fee */} 
          <div className="form-group col-md-3">
            <label for="fee">Fee</label>
            <input
              name="fee"
              className={`form-control input ${errors.fee ? "is-invalid" : ""}`}
              type="number"
              id="fee"
              placeholder="Fee"
              onChange={handleChange}
              value={formdata.fee}
              required
            />
            {errors.fee && <div className="invalid-feedback">{errors.fee}</div>}
          </div>
            {/* Student oF */} 
          <div className="form-group col-md-3">
            <p style={{ marginBottom: "2px" }}>Student Of</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="studentof"
                id="universtry"
                value="universtry"
                onChange={handleChange}
                required
              />
              <label className="form-check-label" for="universtry">
                Universtry
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="studentof"
                id="college"
                value="College"
                onChange={handleChange}
                required
              />
              <label className="form-check-label" for="college" value="college">
                College
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="studentof"
                id="school"
                value="School"
                onChange={handleChange}
                required
              />
              <label className="form-check-label" for="school" value="school">
                School
              </label>
            </div>
          </div>
           {/* Home */} 
          <div className="form-group col-md-3">
            <p style={{ marginBottom: "2px" }}>Home</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="home"
                id="yours"
                value="yours"
                onChange={handleChange}
                required
              />
              <label className="form-check-label" for="yours">
                Yours
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="home"
                id="rental"
                value="rental"
                onChange={handleChange}
                required
              />
              <label className="form-check-label" for="rental" value="rental">
                Rental
              </label>
            </div>
          </div>  
          {/* Both Parrents Died */} 
          <div className="form-group col-md-3">
            <p style={{ marginBottom: "2px" }}>Both Parrents Died</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="bothparrentsdied"
                id="yes"
                value="yes"
                onChange={handleChange}
                required
              />
              <label className="form-check-label" for="yes">
                Yes
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="bothparrentsdied"
                id="No"
                value="No"
                onChange={handleChange}
                required
              />
              <label className="form-check-label" for="No" value="No">
                No
              </label>
            </div>
          </div>
          {/* Profile Photo */} 
          <div className="form-group col-md-4 mt-1">
            <label for="avatar"> Profile Photo </label>
            <br />
            <input
              id="avatar"
              type="file"
              name="avatar"
              className="form-control-file input"
              onChange={handlePhoto}
            />
          </div>
          {/* Attach File */} 
          <div className="form-group col-md-5 mt-1">
            <label for="file"> Attach File </label>
            <br />
            <input
              id="file"
              type="file"
              name="file"
              className="form-control-file input"
              onChange={handleFile}
            />
          </div>
          {/* Location */} 
          <div className="form-group col-md-12">
            <div
              className="form-control input btn btn-outline-dark"
              data-toggle="modal"
              data-target="#location"
            >
              Add Your Location
            </div>
          </div>
        </div>
        <div className="row">
          {success && (
            <div className="form-group col-md-12">
              <div className="alert alert-primary" role="alert">
                {success}
              </div>
            </div>
          )}
          {error && (
            <div className="form-group col-md-12">
              <div className="alert alert-warning" role="alert">
                {error}
              </div>
            </div>
          )}
          <div className="form-group col-md-12">
            <button
              type="submit"
              className="form-control input btn btn-outline-dark"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <div
        className="modal fade"
        id="location"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-full modal-dialog-centered mt-0 mb-0"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Add your Location
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="col-md-12">
                <LocationSearchModal changePosition={changePosition} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentSignup;
