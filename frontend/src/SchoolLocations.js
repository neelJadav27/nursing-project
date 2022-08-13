import React, { useState ,useEffect} from 'react';
import "./css/nav.css";
import "./css/button.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { Link} from 'react-router-dom';
import { confirm } from "react-confirm-box";
const SchoolLocations=() =>{
  const[SchoolLocations,setSchoolLocations] =useState([]);
  useEffect(() =>{
    load_data();
  },[]);
const deleteschoollocations =async(e)=> {
          const result = await confirm("Are you sure do you want to delete?");
          if (result) {
            var id =e;
            try {
                let res = await fetch(`http://localhost:3000/deleteschoollocations/${id}`, {
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
        let res = await fetch('http://localhost:3000/SchoolLocations', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        let result = await res.json();
        setSchoolLocations(result.data);
    }
    catch (e) {
        console.log(e);
        this.resetForm();
    }
}

  return(
    <div>
      <div style={{margin: "10px"}}>
      <Link to='/AddSchoolLocations' class='btn btn-primary'>Add School Locations</Link>
    </div>
    
<Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Sr. No</th>
      <th>Name</th>
      <th>Campus</th>
      <th colspan="2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {SchoolLocations.map((SchoolLocations,index)=>(
          <tr>
            <td>{index+1}</td>
            <td>{SchoolLocations.SchoolName}</td>
            <td>{SchoolLocations.Campus}</td>
            <td><Link to={`/EditSchoolLocations/${SchoolLocations.Id}`} class='fa fa-pencil-square'></Link></td>
            <td onClick={e => deleteschoollocations(SchoolLocations.Id)}><i class="fa fa-trash" aria-hidden="true"></i></td>
          </tr>
   
    ))}
  </tbody>
</Table>

 
    </div>
    
  );
}
export default SchoolLocations;