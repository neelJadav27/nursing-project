import React, { useState, useEffect } from 'react';
import "./css/nav.css";
import "./css/button.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { confirm } from "react-confirm-box";
const TermManagement = () => {
    const [termManagement, setTermManagement] = useState([]);
    useEffect(() => {
        loadTermManagementData();
    }, []);
    const deleteTerm = async (e) => {
        const result = await confirm("Are you sure do you want to delete?");
        if (result) {
            var id = e;
            try {
                let res = await fetch(`http://localhost:3000/deleteTerm/${id}`, {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                });
                let result = await res.json();
                alert(result.msg);
                loadTermManagementData();
            }
            catch (e) {
                console.log(e);
            }
            return;
        }
    }
    const loadTermManagementData = async () => {
        try {
            let res = await fetch('http://localhost:3000/loadTermManagementData', {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            let result = await res.json();
            console.log(result.data);
            setTermManagement(result.data);
        }
        catch (e) {
            console.log(e);
            this.resetForm();
        }
    }
    return (
        <div>
            <div style={{marginBlock: "10px"}}>
                <Link style={{margin: "5px"}} to='/AddTerm' class='btn btn-primary'>Add Term Data</Link>
                <Link to='/Year' class='btn btn-primary'>Add Year Data</Link>
                </div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Sr. No</th>
                        <th>Term</th>
                        <th>Year</th>
                        <th colspan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {termManagement.map((termManage, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{termManage.term}</td>
                            <td>{termManage.year}</td>
                            <td><Link to={`/EditTerm/${termManage.Id}`} class='fa fa-pencil-square'></Link></td>
                            <td onClick={e => deleteTerm(termManage.Id)} ><i class="fa fa-trash" aria-hidden="true"></i></td>
                        </tr>

                    ))}
                </tbody>
            </Table>
        </div>
    );
}
export default TermManagement;