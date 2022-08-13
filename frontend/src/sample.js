import React, { useState, useEffect } from 'react';
import "./css/nav.css";
import "./css/button.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { confirm } from "react-confirm-box";
import 'mdbreact/dist/css/mdb.css';
import MaterialTable from 'material-table';
import { MDBDataTableV5, MDBTableBody, MDBTableHead } from 'mdbreact';
const StudentManagement = () => {
    //const [placementLocation, setPlacementLocation] = useState([]);
    const [studentInfo, setStudentInfo] = React.useState([]);
    useEffect(() => {
        load_data();
    }, []);

    const deletePlacementLocation = async (e) => {
        const result = await confirm("Are you sure do you want to delete?");
        if (result) {
            var id = e;
            try {
                let res = await fetch(`http://localhost:3000/deletePlacementLocation/${id}`, {
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
    const load_data = async () => {
        try {
            let res = await fetch('http://localhost:3000/load_student_details', {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            let result = await res.json();
            console.log(result.data);
            setStudentInfo(result.data);
           
            // setPlacementLocation(result.data1);
            // setPlacementLocation(result.data1);


        }
        catch (e) {
            console.log(e);
            this.resetForm();
        }
    }

//DATA TABLE

// const [datatable, setDatatable] = React.useState({
//  columns: [
//       {
//         label: 'Term',
//         field: 'term',
//         width: 150,
//         attributes: {
//           'aria-controls': 'DataTable',
//           'aria-label': 'Name',
//         },
//       },
//       {
//         label: 'SchoolName',
//         field: 'schoolName',
//         width: 270,
//       },
//       {
//         label: 'FirstName',
//         field: 'firstName',
//         width: 200,
//       },
//       {
//         label: 'LastName',
//         field: 'lastname',
//         sort: 'asc',
//         width: 100,
//       },
//       {
//         label: 'Student Number',
//         field: 'studentNumber',
//         sort: 'disabled',
//         width: 150,
//       },
//       {
//         label: 'Email',
//         field: 'email',
//         sort: 'disabled',
//         width: 100,
//       },
//     ]
//     // rows: [
//     //     {
//     //       firstName: 'Tiger',
//     //       lastName: "Nixon",
//     //       position: 'System Architect',
//     //       office: 'Edinburgh',
//     //       age: '61',
//     //       date: '2011/04/25',
//     //       salary: '$320',
//     //     },
//     //     {
//     //       firstName: 'Garrett Winters',
//     //       position: 'Accountant',
//     //       office: 'Tokyo',
//     //       age: '63',
//     //       date: '2011/07/25',
//     //       salary: '$170',
//     //     },
//     // ],
    
// });

// const [datatable, setDatatable] = React.useState([])
// const columns = [
//     {
//       field: 'term',
//       label: 'Term',
//       width: 150,
//       attributes: {
//         'aria-controls': 'DataTable',
//         'aria-label': 'Name',
//       },
//     },
//     {
//       label: 'SchoolName',
//       width: 270,
//       field: 'schoolName',
//     },
//     {
//       label: 'FirstName',
//       field: 'firstName',
//       width: 200,
//     },
//     {
//       label: 'LastName',
//       field: 'lastname',
//       sort: 'asc',
//       width: 100,
//     },
//     {
//       label: 'Student Number',
//       field: 'studentNumber',
//       sort: 'disabled',
//       width: 150,
//     },
//     {
//       label: 'Email',
//       field: 'email',
//       sort: 'disabled',
//       width: 100,
//     },
// ]
    // useEffect(()=>{
    //     fetch('http://localhost:3000/load_student_details')
    //     .then(resp=>resp.json())
    //     .then(resp=>setStudentInfo(resp))
    // },[])


    return (
        <div>

            <div style={{margin: "10px"}}>
                <Link to='/AddStudentRecord' className='btn btn-primary'>Add Student Record</Link>
            </div>
    <Table striped bordered hover variant="dark" >
  <thead>
    <tr>
      <th>S.no</th>
      <th>ID</th>
      <th>Last Name</th>
      <th>First Name</th>
      <th>Year of Study</th>
      <th>E-Mail</th>
      <th>Phone Number</th>
      <th colspan="2">Actions</th>

    </tr>
    </thead>
    <tbody>
    {studentInfo.map((studentInfo,index)=>(
          <tr>
            <td>{index+1}</td>
            <td>{studentInfo.StudentNumber}</td>
            <td>{studentInfo.LastName}</td>
            <td>{studentInfo.FirstName}</td>
            <td>5</td>
            <td>{studentInfo.Email}</td>
            <td>9999999999</td>
            
          </tr>
    
    ))}
    </tbody>
  
</Table>
            
            
          
               {/* <MDBDataTableV5
      hover
      entriesOptions={[5, 20, 25]}
      entries={5}
      pagesAmount={4}
      data={studentInfo}
      pagingTop
      searchTop
      searchBottom={false}
      barReverse
      title= "Student Data"
            
            columns={columns}
    >
           
            <MDBTableHead color="primary-color">
                <tr>
                    <th>Term</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                <tr>
                    <td>{studentInfo.Term}</td>
                    <td>{studentInfo.First_name}</td>
                    <td>{studentInfo.Last_name}</td> 
                </tr>
            </MDBTableBody>
            </MDBDataTableV5>   */}
            {/* <h1>Hello From PlacementLocation</h1> */}
            {/* <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Sr. No</th>
                        <th>Hospital Name</th>
                        <th>Unit</th>
                        <th>Instructor Name</th>
                        <th>Section</th>
                        <th>Day</th>
                        <th>Comments</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody> */}
            {/* {placementLocation.map((placementLocation, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{placementLocation.hospital_name}</td>
                            <td>{placementLocation.unit}</td>
                            <td>{placementLocation.Instructor_name}</td>
                            <td>{placementLocation.section}</td>
                            <td>{placementLocation.day}</td>
                            <td>{placementLocation.comments}</td>
                            {/* <td><Link to={`/EditInstructors/${instructors.Id}`} class='fa fa-pencil-square'></Link></td> */}
            {/* <td onClick={e => deletePlacementLocation(placementLocation.Id)}><i class="fa fa-trash" aria-hidden="true"></i></td>
                        </tr>

                    ))}
                </tbody>
            // </Table> */}
        </div>
    );
}
export default StudentManagement;