import React, { useState, useEffect } from "react";
import "./css/nav.css";
import "./css/button.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { confirm } from "react-confirm-box";
import "mdbreact/dist/css/mdb.css";
import { MDBDataTable } from "mdbreact";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";

const StudentManagement = () => {
  //const [placementLocation, setPlacementLocation] = useState([]);
  const [studentInfo, setStudentInfo] = useState([]);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    load_data();
  }, []);

  const data = {
    columns: [
      {
        label: "ID",
        field: "id",
      },
      {
        label: "Student Number",
        field: "sno",
      },
      {
        label: "Last Name",
        field: "lname",
      },
      {
        label: "First Name",
        field: "fname",
      },
      {
        label: "Year of study",
        field: "yos",
      },
      {
        label: "Email",
        field: "email",
      },
      {
        label: "Phone number",
        field: "phone",
      },
    ],
    rows: rows,
  };

  const deletePlacementLocation = async (e) => {
    const result = await confirm("Are you sure do you want to delete?");
    if (result) {
      var id = e;
      try {
        let res = await fetch(
          `http://localhost:3000/deletePlacementLocation/${id}`,
          {
            method: "get",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        let result = await res.json();
        alert(result.msg);
        load_data();
      } catch (e) {
        console.log(e);
      }
      return;
    }
  };
  const load_data = async () => {
    try {
      console.log("first");
      let res = await fetch("http://localhost:3002/load_student_details", {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      let result = await res.json();
      console.log(result);
      if (result.loggedIn && result.loggedIn == false) {
        //navigate("/login");
        console.log("kaidadadsa");
      }
      console.log(result.data);
      setStudentInfo(result.data);
      const rows = [];
      result.data.map((student) => {
        rows.push({
          id: student.Id,
          sno: student.StudentNumber,
          lname: student.LastName,
          fname: student.FirstName,
          yos: "2020-01-01",
          email: student.Email,
          phone: "3456-444-555",
        });
      });
      setRows(rows);
    } catch (e) {
      console.log(e);
      this.resetForm();
    }
  };

  // using useNavigate() hook
  const navigate = useNavigate();
  const routeChange = () => {
    const path = "/ImportCsv";
    navigate(path);
  };

  return (
    <div>
      <div style={{ margin: "10px" }}>
        <Link to="/AddStudentRecord" className="btn btn-primary">
          Add Student Record
        </Link>

        <button
          className="btn btn-danger float-right"
          style={{ float: "right" }}
          onClick={routeChange}
        >
          Import CSV
        </button>
      </div>
      <hr />
      <div>
        <MDBDataTable
          striped
          bordered
          hover
          variant="dark"
          data={data}
          searching={true}
        />
      </div>
    </div>
  );
};
export default StudentManagement;
