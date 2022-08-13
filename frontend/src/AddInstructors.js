import React,{useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/Form.css";
import {useNavigate} from 'react-router-dom';
const AddInstructors = () => {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState({
    Id:"NULL",
    Instructor_number: "",
    First_name: "",
    Last_name: "",
    Email: "",
    Comments: ""
  });
  const onInputChange = e => {
    setInstructors({ ...instructors, [e.target.name]: e.target.value })
  };
  const submitData = async e => {
     e.preventDefault();
    try {
      let res = await fetch('http://localhost:3000/AddInstructors', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Id: instructors.Id,
          Instructor_number: instructors.Instructor_number,
          First_name: instructors.First_name,
          Last_name: instructors.Last_name,
          Email: instructors.Email,
          Comments: instructors.Comments
        })
      })
      let result = await res.json();
      alert(result.msg);
      navigate('/Instructors');
    }
    catch (e) {
      console.log(e);
      alert("Retry");
    }
  }
 
  return (
    <div class="body1">
      <div class="center">
        <h1>Adding Instructor Form</h1>
        <form onSubmit={e => submitData(e)}>
          <div class="inputbox form-group">
            <input type="number"
              name='Instructor_number'
              required="required"
              value={instructors.Instructor_number}
              onChange={e => onInputChange(e)} />
            <span>Instructor_number</span>
          </div>
          <div class="inputbox form-group">
            <input type="text"
              name='First_name'
              value={instructors.First_name}
              onChange={e => onInputChange(e)}
              required="required" />
            <span>First Name</span>
          </div>
          <div class="inputbox">
            <input type="text"
              name='Last_name'
              value={instructors.Last_name}
              onChange={e => onInputChange(e)}
              required="required" />
            <span>Last Name</span>
          </div>
          <div class="inputbox">
            <input type="email"
              name='Email'
              value={instructors.Email}
              onChange={e => onInputChange(e)}
              required="required" />
            <span>University Email-Id</span>
          </div>
          <div class="inputbox">
            <input type="textarea"
              name='Comments'
              value={instructors.Comments}
              onChange={e => onInputChange(e)}
              required="required" />
            <span>Comments</span>
          </div>
          <div class="inputbox">
            <input type="submit" value="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddInstructors;