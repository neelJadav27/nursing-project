import React,{useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/Form.css";
import {useNavigate} from 'react-router-dom';
const AddHospital = () => {
  const navigate = useNavigate();
  const [hospitalvalue, setHospitalvalue] = useState({
    Id:"",
    Name: "",
    Address: ""
  });
  const onInputChange = e => {
    setHospitalvalue({ ...hospitalvalue, [e.target.name]: e.target.value })
  };
  const submitData = async e => {
     e.preventDefault();
    try {
      let res = await fetch('http://localhost:3000/Hospital_Add', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Id: hospitalvalue.Id,
          Name: hospitalvalue.Name,
          Address: hospitalvalue.Address
        })
      })
      let result = await res.json();
      console.log(res);
      alert(result.msg);
      navigate('/Hospital');
    }
    catch (e) {
      console.log(e);
      alert("Retry");
    }
  }
 
  return (
    <div class="body1">
      <div class="center">
        <h1>Hospital Location</h1>
        <form onSubmit={e => submitData(e)}>
          <div class="inputbox">
            <input type="text"
              name='Name'
              required="required"
              value={hospitalvalue.Name}
              onChange={e => onInputChange(e)} />
            <span>Hospital Name</span>

          </div>
          <div class="inputbox">
            <input type="text"
              name='Address'
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
export default AddHospital;