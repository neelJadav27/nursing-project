import React, { useState, useEffect } from 'react';
import "./css/nav.css";
import "./css/button.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { confirm } from "react-confirm-box";
const Instructors = () => {
    const [instructors, setInstructors] = useState([]);
    useEffect(() => {
        load_data();
    }, []);
    const deleteinstructors = async (e) => {
        const result = await confirm("Are you sure do you want to delete?");
        if (result) {
            var id = e;
            try {
                let res = await fetch(`http://localhost:3000/InstructorDelete/${id}`, {
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
            let res = await fetch('http://localhost:3000/load_instructors', {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            let result = await res.json();
            setInstructors(result.data);
        }
        catch (e) {
            console.log(e);
            this.resetForm();
        }
    }

    return (
        <div>
            <div style={{margin: "10px"}}>
                <Link to='/AddInstructors' class='btn btn-primary'>Add Instructors</Link>
            </div>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Sr. No</th>
                        <th>Instructor Number</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>University E-mail Id</th>
                        <th>Comments</th>
                        <th colspan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {instructors.map((instructors, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{instructors.Instructor_number}</td>
                            <td>{instructors.First_name}</td>
                            <td>{instructors.Last_name}</td>
                            <td>{instructors.Email}</td>
                            <td>{instructors.Comments}</td>
                            <td><Link to={`/EditInstructors/${instructors.Id}`} class='fa fa-pencil-square'></Link></td>
                            <td onClick={e => deleteinstructors(instructors.Id)}><i class="fa fa-trash" aria-hidden="true"></i></td>
                        </tr>

                    ))}
                </tbody>
            </Table>
        </div>
    );
}
export default Instructors;