import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/Form.css";
import { useNavigate, useParams } from 'react-router-dom';
const EditHospital = () => {
  const navigate = useNavigate();
  const { Id } = useParams();
  const[id,setId]=useState(Id);
  console.log("msg--",id);
  const [hospitalvalue, setHospitalvalue] = useState({
    Id:"",
    Name:"",
    Address: ""
  });
  useEffect(() => {

    LoadHospitalData();
  }, [Id]);

  const onInputChange = e => {
    setHospitalvalue({...hospitalvalue,Id ,[e.target.name]: e.target.value })
  };
  const updateHospitalData = async e => {
     e.preventDefault();
    try {
      let res = await fetch('http://localhost:3000/Hospital_Update', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          Id:hospitalvalue.Id,
          Name:hospitalvalue.Name,
          Address:hospitalvalue.Address
        })
      })
      let result = await res.json();
      alert(result.msg);
      navigate('/Hospital');
    }
    catch (error) {
      console.log(error)
    }
  }
  const LoadHospitalData = async () => {
    try {
      var intid = parseInt(id);

      let res = await fetch(`http://localhost:3000/LoadHospitalData/${intid}`, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'

        },
      });
     
      let hospitals = await res.json();
      console.log(hospitals);
      setHospitalvalue({
        ...hospitals.data[0]
      });
      hospitals.data.map((hospital) => {
        setHospitalvalue(hospital)
      });
    }
    catch (e) {
      console.log(e);
    }
  }
  return (
    <div class="body1">
      <div class="center">
        <h1>Edit Hospital Location</h1>
        <form onSubmit={e => updateHospitalData(e)}>

          <div class="inputbox">
            <input type="text"
              name='Name'
              required="required"
              id="hospital_name"
              value={hospitalvalue.Name}
              onChange={e => onInputChange(e)} />
            <span>Hospital Name</span>

          </div>
          <div class="inputbox">
            <input type="text"
              name='Address'
              id="Address"
              value={hospitalvalue.Address}
              onChange={e => onInputChange(e)}
              required="required" />
            <span>Hospital Address</span>
          </div>
          <div class="inputbox">
            <input type="submit" value="submit" />

          </div>
        </form>
      </div>
    </div>
  );
};
export default EditHospital;