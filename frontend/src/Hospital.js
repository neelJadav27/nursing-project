import React, { useState ,useEffect} from 'react';
import "./css/nav.css";
import "./css/button.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { Link} from 'react-router-dom';
import { confirm } from "react-confirm-box";
// import {useNavigate} from 'react-router-dom';
const Hospital=() =>{
  // const navigate = useNavigate();
  const[hospital,setHospital] =useState([]);
  useEffect(() =>{
    load_data();
  },[]);
const deleteHospital =async(e)=> {
          const result = await confirm("Are you sure do you want to delete?");
          if (result) {
            var id =e;
            try {
                let res = await fetch(`http://localhost:3000/HospitalDeleteData/${id}`, {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    
                    },
                });
                let result = await res.json();
                
                alert(result.msg);
                load_data();
            }
            catch (e) {
                console.log(e);
            }
            return;
          }
    }
  const load_data= async() =>{
    try {
        let res = await fetch('http://localhost:3000/Hospital', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        let result = await res.json();
        setHospital(result.data);
    }
    catch (e) {
        console.log(e);
        this.resetForm();
    }
}

  return(
    <div>
    <div style={{margin: "10px"}}>
      <Link to='/addHospital' class='btn btn-primary'>Add Hospital</Link>
    </div>
    
<Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Sr. No</th>
      <th>Name</th>
      <th>Address</th>
      <th colspan="2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {hospital.map((hospital,index)=>(
          <tr>
            <td>{index+1}</td>
            <td>{hospital.Name}</td>
            <td>{hospital.Address}</td>
            <td><Link to={`/EditHospital/${hospital.Id}`} class='fa fa-pencil-square'></Link></td>
            <td onClick={e => deleteHospital(hospital.Id)}><i class="fa fa-trash" aria-hidden="true"></i></td>
          </tr>
   
    ))}
  </tbody>
</Table>

 
    </div>
    
  );
}
export default Hospital;