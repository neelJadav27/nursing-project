import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/Form.css";
import { useNavigate } from 'react-router-dom';
const AddTerm = () => {
    const navigate = useNavigate();
    const [term, setTerm] = useState({
        term: "",
        yearId:""
    });
    const [years, setyears] = useState([]);
    const onInputChange = e => {
        setTerm({ ...term, [e.target.name]: e.target.value })
    };
    useEffect(() => {
        loadYearData();
    }, []);

    const loadYearData = async () => {
        try {

            let res = await fetch(`http://localhost:3000/loadYearData`, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            let result = await res.json();
            setyears(result?.data)
        }
        catch (e) {
            console.log(e);
        }
    }

    const submitData = async e => {
        e.preventDefault();
        try {
            let res = await fetch('http://localhost:3000/addTerm', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    term: term.term,
                    yearId:term.yearId
                })
            })
            let result = await res.json();
            alert(result.msg);
            navigate('/TermManagement');
        }
        catch (e) {
            console.log(e);
            alert("Retry");
        }
    }

    return (
        <div class="body1">
            <div class="center">
                <h1> Add Term</h1>
                <form onSubmit={e => submitData(e)}>
                    <select name='yearId' onChange={e => onInputChange(e)} class="form-select inputbox" aria-label="Default select example">
                        {years.map((year) => (
                            <option value={year.Id} key={year.Id}>{year.year}</option>
                        ))}
                    </select>
                    
                    <div class="inputbox">
                        <input type="text"
                            name='term'
                            required="required"
                            value={term.term}
                            onChange={e => onInputChange(e)} />
                        <span>Term</span>

                    </div>
                    <div class="inputbox">
                        <input type="submit" value="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddTerm;