import React,{useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/Form.css";
import {useNavigate, useParams} from 'react-router-dom';
const EditSchoolLocations = () => {
  const navigate = useNavigate();
  const {Id} = useParams();
  const[id,setId]=useState(Id);
  const [schoolLocation, setSchoolLocation] = useState({
    Id:"",
    SchoolName:"",
    Campus:""
  });
  useEffect(() =>{
    LoadSchoolData();
  },[Id]);

  const onInputChange = e => {
    setSchoolLocation({ ...schoolLocation,Id, [e.target.name]: e.target.value })
  };
 
  const updateSchoolLocation = async e => {
    e.preventDefault();
    try {
      let res = await fetch('http://localhost:3000/updateSchoolLocation', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Id: schoolLocation.Id,
          SchoolName:schoolLocation.SchoolName,
          Campus:schoolLocation.Campus
        })
      })
      let result = await res.json();
      alert(result.msg);
      navigate('/SchoolLocations');
    }
    catch (error) {
      console.log(error)
    }
  }

  const LoadSchoolData= async() =>{
    try {  
      var intid = parseInt(id);
      console.log("loadyearID",intid);
      
        let res = await fetch(`http://localhost:3000/LoadSchoolData/${intid}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            
            },
        });
        let result = await res.json();
        console.log(result)
        setSchoolLocation({
              ...result.data[0]
        });
        
        result.data.map((location=>{
          setSchoolLocation(location)
        }));
    }
    catch (e) {
        console.log(e);
    }
}
  return (
    <div class="body1">
      <div class="center">
        <h1>Edit School Location</h1> 
        <form >
          <div class="inputbox"> 
            <input type="text"
              name='SchoolName'
              required="required"
              id="school_name"
              value={schoolLocation.SchoolName}
              onChange={e => onInputChange(e)} />
            <span>School Name</span>

          </div>
          <div class="inputbox">
            <input type="text"
              name='Campus'
              id="campus"
              value={schoolLocation.Campus}
              onChange={e => onInputChange(e)}
              required="required" />
            <span>School Campus</span>
          </div>
          <div class="inputbox">
            <input type="submit"   onClick={e => updateSchoolLocation(e)}  value="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditSchoolLocations;