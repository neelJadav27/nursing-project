import React, { useState, useEffect } from 'react';
import "./css/nav.css";
import "./css/button.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { confirm } from "react-confirm-box";
const PlacementLocation = () => {
    const [placementLocation, setPlacementLocation] = useState([]);
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
            let res = await fetch('http://localhost:3000/load_placement_location', {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            let result = await res.json();
            console.log(result.data);
            setPlacementLocation(result.data);
            

        }
        catch (e) {
            console.log(e);
            this.resetForm();
        }
    }
    return (
        <div> 
            <div style={{margin: "10px"}}>
                <Link to='/AddPlacementLocation' class='btn btn-primary'>Add Placement Location</Link>
            </div>
            <Table striped bordered hover variant="dark">
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
                <tbody>
                    {placementLocation.map((placementLocation, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{placementLocation.hospital_name}</td>
                            <td>{placementLocation.unit}</td>
                            <td>{placementLocation.Instructor_name}</td>
                            <td>{placementLocation.section}</td>
                            <td>{placementLocation.day}</td>
                            <td>{placementLocation.comments}</td>
                            {/* <td><Link to={`/EditInstructors/${instructors.Id}`} class='fa fa-pencil-square'></Link></td> */}
                            <td onClick={e => deletePlacementLocation(placementLocation.Id)}><i class="fa fa-trash" aria-hidden="true"></i></td>
                        </tr>

                    ))}
                </tbody>
            </Table>
        </div>
    );
}
export default PlacementLocation;