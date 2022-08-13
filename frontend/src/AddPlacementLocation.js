import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/Form.css";
import { useNavigate } from 'react-router-dom';
const AddPlacementLocation = () => {
  const navigate = useNavigate();
  const [placementLocation, setPlacementLocation] = useState({
    instructorId:"",
    unit: "",
    day: "",
    section: "",
    comments: "",
    hospitalId:""
  });
  const days = ["MON-Day", "MON-AFTERNOON", "TUES-DAY", "TUES-AFTERNOON", "WED-DAY", "WED-AFTERNOON", "THURS-DAY", "THURS-AFTERNOON", "FRIDAY-DAY", "FRIDAY-AFTERNOON", "SAT-DAY", "SAT-AFTERNOON", "SUN-DAY", "SUN-AFTERNOON"]
  const [hospitalDetails, setHospitalDetails] = useState([]);
  const [instructorsName, setInstructorsName] = useState([]);
  useEffect(() => {
    loadHospitalNameData();
    loadInstructorNameData();
  }, []);
  const onInputChange = e => {
    setPlacementLocation({ ...placementLocation, [e.target.name]:e.target.value })
  };
  const addPlacementLocationData = async e => {
     e.preventDefault();
    try {
      let res = await fetch('http://localhost:3000/addPlacementLocationData', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          hospitalId:placementLocation.hospitalId,
          instructorId:placementLocation.instructorId,
          unit:placementLocation.unit,
          day:placementLocation.day,
          section:placementLocation.section,
          comments:placementLocation.comments
        })
      })
      let result = await res.json();
      alert(result.msg);
      navigate('/PlacementLocation');
    }
    catch (error) {
      console.log(error)
    }
  }

  const loadHospitalNameData = async () => {
    try {

      let res = await fetch(`http://localhost:3000/LoadHospitalNameData`, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      let result = await res.json();
      setHospitalDetails(result.data);
      console.log("RESULT HOSPITAL:---",result);
      console.log("Hospital ID:---",hospitalDetails.hospitalid);
    }
    catch (e) {
      console.log(e);
    }
  }

  const loadInstructorNameData = async () => {
    try {

      let res = await fetch(`http://localhost:3000/loadInstructorNameData`, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      let result = await res.json();
      setInstructorsName(result?.data)
    }
    catch (e) {
      console.log(e);
    }
  }

  return (
    <div class="body1">
      <div class="center">
        <h1>Add Placement Location</h1>
        <form onSubmit={e => addPlacementLocationData(e)}>
          {/* <select  name="hospitalId" onChange={e => onInputChange(e)} class="form-select inputbox" aria-label="Default select example">
            {hospitalDetails.map((hospitalDetail) => (
              <option value={hospitalDetail.hospitalid} key={hospitalDetail.hospitalid}>{hospitalDetail.hospitalName}</option>
            ))}
          </select> */}
           <select name="hospitalId" onChange={e => onInputChange(e)} class="form-select inputbox" aria-label="Default select example" required="required">
            {hospitalDetails.map((hospital) => (
              <option value={hospital.hospitalid} >{hospital.hospitalName}</option>
            ))}
          </select>
          <div class="inputbox">
            <input type="text"
              name='unit'
              required="required"
              id="unit"
              value={placementLocation.unit}
              onChange={e => onInputChange(e)} />
            <span>Unit</span>
          </div>
          <div class="inputbox">
            <input type="text"
              name='section'
              value={placementLocation.section}
              onChange={e => onInputChange(e)}
              required="required" />
            <span>Section</span>
          </div>
          <select name="day" onChange={e => onInputChange(e)} class="form-select inputbox" aria-label="Default select example" required="required">
            {days.map((day, index) => (
              <option key={index}>{day}</option>
            ))}
          </select>
          <select name="instructorId" onChange={e => onInputChange(e)} class="form-select inputbox" aria-label="Default select example" required="required">
            {instructorsName.map((instructorName) => (
              <option value={instructorName.instructorId} key={instructorName.instructorId}>{instructorName.InstructorName}</option>
            ))}
          </select>
          <div class="inputbox">
            <input type="text"
              name='comments'
              value={placementLocation.comments}
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
export default AddPlacementLocation;