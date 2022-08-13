import React,{useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/Form.css";
import {useNavigate, useParams} from 'react-router-dom';
const EditYear= () => {
  const navigate = useNavigate();
  const {Id} = useParams();
  const[id,setId]=useState(Id);
  const [Year, setYear] = useState({
    Id:"",
    year:"",
  });
  useEffect(() =>{
    loadYear();
  },[Id]);

  const onInputChange = e => {
    setYear({ ...Year,Id, [e.target.name]: e.target.value })
  };
 
  const updateYear = async e => {
    e.preventDefault();
    try {
      let res = await fetch('http://localhost:3000/updateYear', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Id: Year.Id,
          year:Year.year,
        })
      })
      let result = await res.json();
      alert(result.msg);
      navigate('/Year');
    }
    catch (error) {
      console.log(error)
    }
  }

  const loadYear= async() =>{
    try {  
      var intid = parseInt(id);
      console.log("loadyearID",intid);
      
        let res = await fetch(`http://localhost:3000/loadYear/${intid}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            
            },
        });
        let result = await res.json();
        console.log(result)
        setYear({
              ...result.data[0]
        });
        
        result.data.map((year=>{
          setYear(year)
        }));
    }
    catch (e) {
        console.log(e);
    }
}
  return (
    <div class="body1">
      <div class="center">
        <h1>Edit Year</h1> 
        <form  onSubmit={e => updateYear(e)}>
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
export default EditYear;