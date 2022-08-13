import React, { useState, useEffect } from 'react';
import "./css/nav.css";
import "./css/button.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { confirm } from "react-confirm-box";
const Year = () => {
    const [Years, setYears] = useState([]);
    useEffect(() => {
        loadYearData();
    }, []);
    const deleteYear = async (e) => {
        const result = await confirm("Are you sure do you want to delete? If you delete it all the terms related to this year will be deleted");
        if (result) {
            var id = e;
            try {
                let res = await fetch(`http://localhost:3000/deleteYear/${id}`, {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                });
                let result = await res.json();
                alert(result.msg);
                loadYearData();
            }
            catch (e) {
                console.log(e);
            }
            return;
        }
    }
    const loadYearData = async () => {
        try {
            let res = await fetch('http://localhost:3000/loadYearData', {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            let result = await res.json();
            setYears(result.data);


        }
        catch (e) {
            console.log(e);
            this.resetForm();
        }
    }
    return (
        <div>
            <div style={{margin: "10px"}}>
                <Link to='/AddYear' class='btn btn-primary'>Add Data</Link>
            </div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Sr. No</th>
                        <th>Year</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Years.map((Year, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{Year.year}</td>
                            <td><Link to={`/EditYear/${Year.Id}`} class='fa fa-pencil-square'></Link></td>
                            <td  onClick={e => deleteYear(Year.Id)} ><i class="fa fa-trash" aria-hidden="true"></i></td>
                           
                        </tr>

                    ))}
                </tbody>
            </Table>
        </div>
    );
}
export default Year;