import React,{useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/Form.css";
import {useNavigate, useParams} from 'react-router-dom';
const EditTerm = () => {
  const navigate = useNavigate();
  const {Id} = useParams();
  const[id,setId]=useState(Id);
  console.log("msg--",id);
  const [term, setTerm] = useState({
    Id:"",
    term:"",
    yearId:"",
  });
  const[yearData,setYearData]=useState([]);
  console.log(term.yearId);
  useEffect(() =>{
    loadTermData();
    loadYearData();
  },[Id]);

  const onInputChange = e => {
    setTerm({ ...term,Id, [e.target.name]: e.target.value })
  };

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
        setYearData(result?.data)
        console.log("RESULT",result);
    }
    catch (e) {
        console.log(e);
    }
}
 
  const updateTerm = async e => {
    e.preventDefault();
    try {
      let res = await fetch('http://localhost:3000/updateTerm', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Id: term.Id,
          term:term.term,
          yearId: term.yearId
        })
      })
      let result = await res.json();
      alert(result.msg);
      navigate('/TermManagement');
    }
    catch (error) {
      console.log(error)
    }
  }

  const loadTermData= async() =>{
    try {  
      var intid = parseInt(id);
      
        let res = await fetch(`http://localhost:3000/loadtermdata/${intid}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            
            },
        });
        let term = await res.json();
        console.log("TERM DATA",term);
        setTerm({
              ...term.data[0]
        });
        
        term.data.map((term=>{
          setTerm(term)
        }));
        console.log(term.term);
    }
    catch (e) {
        console.log(e);
    }
}
  return (
    <div class="body1">
      <div class="center">
        <h1>Edit Term</h1> 
        <form  onSubmit={e => updateTerm(e)}>
              <select name='yearId' onChange={e => onInputChange(e)} class="form-select inputbox" aria-label="Default select example">
                        {yearData.map((year) => (
                            <option value={year.Id}>{year.year}</option>
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
export default EditTerm;