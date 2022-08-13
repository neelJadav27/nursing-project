import React,{useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/Form.css";
import {useNavigate} from 'react-router-dom';
const AddSchoolLocations = () => {
  const navigate = useNavigate();
  const [schoollocations, setschoollocations] = useState({
    Id:"NULL",
    SchoolName: "",
    Campus: ""
  });
  const onInputChange = e => {
    setschoollocations({ ...schoollocations, [e.target.name]: e.target.value })
  };
  const submitData = async e => {
     e.preventDefault();
    try {
      let res = await fetch('http://localhost:3000/School_Location_Add', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Id: schoollocations.Id,
          SchoolName: schoollocations.SchoolName,
          Campus: schoollocations.Campus
        })
      })
      let result = await res.json();
      alert(result.msg);
      navigate('/SchoolLocations');
    }
    catch (e) {
      console.log(e);
      alert("Retry");
    }
  }
 
  return (
    <div class="body1">
      <div class="center">
        <h1>School Location</h1>
        <form onSubmit={e => submitData(e)}>
          <div class="inputbox">
            <input type="text"
              name='SchoolName'
              required="required"
              value={schoollocations.SchoolName}
              onChange={e => onInputChange(e)} />
            <span>School Name</span>

          </div>
          <div class="inputbox">
            <input type="text"
              name='Campus'
              value={schoollocations.Campus}
              onChange={e => onInputChange(e)}
              required="required" />
            <span>School Campus</span>
          </div>
          <div class="inputbox">
            <input type="submit" value="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddSchoolLocations;