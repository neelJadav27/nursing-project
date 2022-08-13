import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/Form.css";
import { useNavigate } from 'react-router-dom';


const AddStudentRecord = () => {
    const navigate = useNavigate();
    const [years, setyears] = useState([]);
    const [selectYearId, setSelectYearId] = useState({
        selectYearsId: ""
    })
    const [term, setTerm] = useState([]);
    const [placementLocation, setPlacementLocation] = useState([]);
    const [school, setSchool] = useState([]);
    // const [student, setStudent] = useState({
    //     Id: ""
    // })
    // const[placementdetails,setPlacementDetails]=useState({
    //     Instructor_name:"",
    //     hospital_name:"",
    //     unit:"",
    //     day:"",
    //     comments:"",
    //     section:""
    // });
    const [studentData, setStudentData] = useState({
        Term: "",
        SchoolName: "",
        PlacementId: "",
        FirstName: "",
        LastName: "",
        Email: "",
        StudentNumber: "",
        Comments: "",
    });
    const onSelectInputChange = e => {
        console.log(e);
        setSelectYearId({ selectYearsId: e.target.value })
        loadTermsData(selectYearId.selectYearsId);
    }
    const onInputChange = e => {
        // setStudent({ ...student, Id: e.target.value })
        setStudentData({ ...studentData, [e.target.name]: e.target.value })
        // setPlacementLocation({...placementLocation,[e.target.name]: e.target.value})
    }
    // const submitData = e => {
    //     StudentDetails();
    // }
    useEffect(() => {
        loadYearData().then((data) => setSelectYearId({ selectYearsId: data[0].Id }))
        loadPlacementData();
        loadSchoolData();

    }, []);

    useEffect(() => {
        loadTermsData(selectYearId.selectYearsId);
    }, [selectYearId])

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
            setyears(result?.data);
            return result?.data;
        }
        catch (e) {
            console.log(e);
        }
    }
    const loadSchoolData = async () => {
        try {

            let res = await fetch(`http://localhost:3000/loadSchoolData`, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            let result = await res.json();
            setSchool(result?.data);
            return result?.data;
        }
        catch (e) {
            console.log(e);
        }
    }

    // const placementDetails  = async () => {
    //     try {
    //        const pId=studentData.PlacementId;
    //     //    alert(typeof(pId));
    //         let res = await fetch(`http://localhost:3000/placementDetails`, {
    //             method: 'get',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 Id: pId
    //               })
    //         });
    //         let result = await res.json();
    //         console.log(result.data);
    //         // alert(result);
    //         setPlacementDetails(result?.data);


    //     }
    //     catch (e) {
    //         console.log(e);
    //         this.resetForm();
    //     }
    // }

    const loadPlacementData = async () => {
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

    const loadTermsData = async () => {
        try {

            console.log("hello");
            console.log(selectYearId);
            var selectYearid = Number(selectYearId.selectYearsId)
            console.log("demooooo", selectYearid);
            // alert("Id of Year:", selectYearId);
            let res = await fetch(`http://localhost:3000/loadTermData${selectYearid}`, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            let result = await res.json();
            console.log("term result from back", result);
            setTerm(result?.data);
        }
        catch (e) {
            console.log(e);
        }
    }
    const StudentDetails = async e => {
        e.preventDefault();
        try {
            alert("SUBCALLED");
            let res = await fetch('http://localhost:3000/StudentDetails', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                   
                    Term: studentData.Term,
                    SchoolName: studentData.SchoolName,
                    pid: studentData.PlacementId,
                    FirstName: studentData.FirstName,
                    LastName: studentData.LastName,
                    Email: studentData.Email,
                    StudentNumber: studentData.StudentNumber,
                    Comments: studentData.Comments,

                })
            })
            let result = await res.json();
            alert(result.msg);
            navigate('/StudentManagement');
        }
        catch (e) {
            console.log(e);
            alert("Retry");
        }
    }

    return (
        <div className="body1">
            <div class="center">
                <h1> Add Student Record</h1>
                <form onSubmit={e => StudentDetails(e)}>
                    <div class="row" style={{ margin: "10px" }}>
                        <div class="col">
                            {/* <input type="text" class="form-control" placeholder="First name"/> */}
                            <select style={{ width: "100%" }} name='selectYearsId' id="selectYearId" onChange={e => onSelectInputChange(e)} class="form-select inputbox" aria-label="Default select example">
                                {years.map((year) => (
                                    <option value={year.Id} key={year.Id}>{year.year}</option>
                                ))}
                            </select>
                        </div>
                        <div class="col">
                            {/* <input type="text" class="form-control" placeholder="Last name"/> */}
                            <select style={{ width: "100%" }} name='Term' onChange={e => onInputChange(e)} class="form-select inputbox" aria-label="Default select example">
                                {term.map((terms) => (
                                    <option value={terms.term} key={terms.Id}>{terms.term}</option>
                                ))}
                            </select>
                        </div>
                        <div class="col">
                            {/* <input type="text" class="form-control" placeholder="Last name"/> */}
                            <select style={{ width: "100%" }} name='SchoolName' onChange={e => onInputChange(e)} class="form-select inputbox" aria-label="Default select example">
                                {school.map((schools) => (
                                    <option value={schools.schoolName} key={schools.Id}>{schools.schoolName}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div class="row" style={{ margin: "10px" }}>
                        <div class="col inputbox" style={{ margin: "10px" }}>
                            <input type="text"
                                name='FirstName'
                                value={studentData.FirstName}
                                onChange={e => onInputChange(e)}
                                required="required" />
                            <span>First Name</span>
                        </div>
                        <div class="col inputbox" style={{ margin: "10px" }}>
                            <input type="text"
                                name='LastName'
                                value={studentData.LastName}
                                onChange={e => onInputChange(e)}
                                required="required" />
                            <span>Last Name</span>
                        </div>
                        <div class="col inputbox" style={{ margin: "10px" }}>
                            <input type="email"
                                name='Email'
                                value={studentData.Email}
                                onChange={e => onInputChange(e)}
                                required="required" />
                            <span>UWin E-mail Id</span>
                        </div>
                        <div class="col inputbox" style={{ margin: "10px" }}>
                            <input type="number"
                                name='StudentNumber'
                                value={studentData.StudentNumber}
                                onChange={e => onInputChange(e)}
                                required="required" />
                            <span>Student Number</span>
                        </div>
                    </div>

                    <div class="row" style={{ margin: "10px" }}>
                        <div class="col"  >
                            <select style={{ width: "100%" }} name='PlacementId' onChange={e => onInputChange(e)} class="form-select inputbox" aria-label="Default select example">
                                {placementLocation.map((placement) => (
                                    <option value={placement.Id} key={placement.Id}>{placement.hospital_name} || Unit: {placement.unit} || Instructor: {placement.Instructor_name} || Section: {placement.section} || Day: {placement.day}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div class="row" style={{ margin: "10px" }}>
                        <div class="col" >
                            <textarea type="text"
                                name='Comments'
                                className="input"
                                placeholder="Comments"
                                style={{ width: "100%", height: "80px" }}
                                value={studentData.Comments}
                                onChange={e => onInputChange(e)}
                                required="required" />

                        </div>
                    </div>
                    <div class="row" style={{ margin: "10px", align: "center" }}>
                        <div class="col" >
                            <div class="inputbox">
                                <input type="submit" value="submit" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddStudentRecord;