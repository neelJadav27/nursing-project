import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/Form.css";
import { useNavigate } from 'react-router-dom';
const AddYear = () => {
    const navigate = useNavigate();
    const [Year, setYear] = useState({
        year:""
    });
    const onInputChange = e => {
        setYear({ ...Year, [e.target.name]: e.target.value })
    };

    const submitData = async e => {
        e.preventDefault();
        try {
            let res = await fetch('http://localhost:3000/addYear', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  year:Year.year
                })
            })
            let result = await res.json();
            alert(result.msg);
            navigate('/Year');
        }
        catch (e) {
            console.log(e);
            alert("Retry");
        }
    }

    return (
        <div class="body1">
            <div class="center">
                <h1> Add Year</h1>
                <form onSubmit={e => submitData(e)}> 
                    <div class="inputbox">
                        <input type="number"
                            name='year'
                            required="required"
                            value={Year.year}
                            onChange={e => onInputChange(e)} />
                        <span>Year</span>
                    </div>
                    <div class="inputbox">
                        <input type="submit" value="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddYear;