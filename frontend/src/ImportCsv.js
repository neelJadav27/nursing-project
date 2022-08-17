import React, { useState, useEffect } from "react";
import { MDBDataTableV5 } from "mdbreact";
import "./css/ImportCsv.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ImportCsv = () => {
  // toast.configure();
  //Data table
  const [datatable, setDatatable] = React.useState({
    columns: [],
    rows: [],
  });

  // React.useEffect(() => {}, callbacks());

  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [studentInfo, setStudentInfo] = useState([]);

  // toggle place students button
  const [toggleButton, setToggleButton] = useState(false);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;

        const temp = csvFileToArray(text);
        const headerKeys = Object.keys(Object.assign({}, ...temp));
        const columns = [];
        headerKeys.forEach((x) => {
          let x_withOutSpaces = x.replace(/ /g, "");
          columns.push({
            field: x_withOutSpaces,
            label: x_withOutSpaces,
          });
        });
        const rows = temp.filter((x) => x != null);
        setDatatable({ columns, rows });
      };

      fileReader.readAsText(file);
    }
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    const array = csvRows.map((i) => {
      const values = i.split(",");

      const obj = csvHeader.reduce((object, header, index) => {
        const header_NoSpace = header.replace(/ /g, "").trim();
        object[header_NoSpace] = values[index];
        return object;
      }, {});
      return obj;
    });
    setArray(array);
    return array;
  };

  // Sending request to store students info
  const addStudentsInfo = async () => {
    //e.preventDefault();
    if (studentInfo.length > 0) {
      try {
        let res = await fetch("http://localhost:3002/addStudentsInfo", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(studentInfo),
        });
        let result = await res.json();
        alert(result.msg);
      } catch (err) {
        console.log(err);
      }
    }
    setToggleButton(!toggleButton);
  };

  //adding the data to the database
  const addStudentData = async (e) => {
    e.preventDefault();
    var bigArr = [];

    if (array.length < 1) {
      return;
    }
    try {
      let res = await fetch("http://localhost:3002/updateYearOfStudy", {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      let result = await res.json();
      console.log(result.msg);
    } catch (err) {
      console.log(err);
    }

    array.forEach((v) => {
      let arr = [
        v.ID,
        v.LastName,
        v.FirstName,
        v.YearofStudy,
        v.Email,
        v.PhoneNumber,
      ];
      bigArr.push(arr);
      // addStudentsInfo(e);
    });
    bigArr.pop();
    setStudentInfo(bigArr);
  };

  useEffect(() => {
    (() => {
      addStudentsInfo();
    })();
  }, [studentInfo]);

  // fetch students
  const fetchStudents = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:3002/fetchStudents", {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      let result = await res.json();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();
  // placing students
  const placeStudents = (e) => {
    e.preventDefault();

    fetchStudents(e);
    alert("Students have been placed!!");
    navigate("/StudentManagement");
  };

  return (
    <div>
      <h2 className="text-center">New Students</h2>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
          className="btn btn-danger"
        >
          IMPORT CSV
        </button>

        <button onClick={(e) => addStudentData(e)} className="btn btn-danger">
          Add New Students
        </button>

        {/* button for place students */}
        <input
          type="submit"
          onClick={(e) => {
            placeStudents(e);
          }}
          value="Place Students"
          className="btn btn-danger"
          disabled={toggleButton}
        />
      </form>

      <div>
        <MDBDataTableV5
          hover
          entriesOptions={[5, 20, 25]}
          entries={5}
          pagesAmount={4}
          data={datatable}
          pagingTop
          searchTop
          searchBottom={false}
          barReverse
        />
      </div>
    </div>
  );
};

export default ImportCsv;
