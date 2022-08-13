import React,{useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/Form.css";
import {useNavigate, useParams} from 'react-router-dom';
const EditInstructors = () => {
  const navigate = useNavigate();
  const {Id} = useParams();
  const[id,setId]=useState(Id);
  console.log("msg--",id);
  const [instructors, setInstructors] = useState({
    Id:"",
    Instructor_number: "",
    First_name: "",
    Last_name: "",
    Email: "",
    Comments: ""
  });

  useEffect(() =>{
    LoadInstructorsData();
  },[Id]);

  const onInputChange = e => {
    setInstructors({ ...instructors,Id, [e.target.name]: e.target.value })
  };
 
  const updateData = async e => {
    e.preventDefault();
    console.log("Submit data function called");
    try {
      let res = await fetch('http://localhost:3000/Instructor_Update', {
        method: 'PUT',
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
    catch (error) {
      console.log(error)
    }
  }

  const LoadInstructorsData= async() =>{
    try {  
      var intid = parseInt(id);

        let res = await fetch(`http://localhost:3000/LoadInstructorsData/${intid}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            
            },
        });
        let instructors = await res.json();
        console.log(instructors);
        setInstructors({
              ...instructors.data[0]
        });
        
        instructors.data.map((instructor=>{
          setInstructors(instructor)
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
        <form  onSubmit={e => updateData(e)}>
          <div class="inputbox"> 
          <input type="number"
              name='Instructor_number'
              id="Instructor_number"
              required="required"
              value={instructors.Instructor_number}
              onChange={e => onInputChange(e)} />
            <span>Instructor_number</span>
          </div>
          <div class="inputbox form-group">
            <input type="text"
              name='First_name'
              id="First_name"
              value={instructors.First_name}
              onChange={e => onInputChange(e)}
              required="required" />
            <span>First Name</span>
          </div>
          <div class="inputbox">
            <input type="text"
              name='Last_name'
              id="Last_name"
              value={instructors.Last_name}
              onChange={e => onInputChange(e)}
              required="required" />
            <span>Last Name</span>
          </div>
          <div class="inputbox">
            <input type="email"
              name='Email'
              id="Email"
              value={instructors.Email}
              onChange={e => onInputChange(e)}
              required="required" />
            <span>University Email-Id</span>
          </div>
          <div class="inputbox">
            <input type="textarea"
              name='Comments'
              id="Comments"
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
export default EditInstructors;