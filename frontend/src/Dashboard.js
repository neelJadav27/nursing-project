import React from "react";
import Hospital from "./Hospital";
import Navbar from "./Navbar";
import AddHospital from "./addHospital";
import EditHospital from "./EditHospital";
import SchoolLocations from "./SchoolLocations";
import AddSchoolLocations from "./AddSchoolLocations";
import { Routes, Route } from "react-router-dom";
import EditSchoolLocations from "./EditSchoolLocations";
import Instructors from "./Instructors";
import AddInstructors from "./AddInstructors";
import Summary from "./Summary";
import EditInstructors from "./EditInstructors";
import PlacementLocation from "./PlacementLocation";
import AddPlacementLocation from "./AddPlacementLocation";
import TermManagement from "./TermManagement";
import AddTerm from "./AddTerm";
import EditTerm from "./EditTerm";
import StudentManagement from "./StudentManagement";
import AddStudentRecord from "./AddStudentRecord";
import Year from "./Year";
import AddYear from "./AddYear";
import EditYear from "./EditYear";
import ImportCsv from "./ImportCsv";

export class Dashboard extends React.Component {
  render() {
    return (
      <>
        {" "}
        <Navbar />{" "}
        <Routes>
          <Route exact path="/" element={<Summary />}></Route>
          <Route
            exact
            path="/StudentManagement/*"
            element={<StudentManagement />}
          ></Route>
          <Route exact path="/Hospital/*" element={<Hospital />}></Route>
          <Route
            exact
            path="/SchoolLocations/*"
            element={<SchoolLocations />}
          ></Route>
          <Route exact path="/Instructors/*" element={<Instructors />}></Route>
          <Route
            exact
            path="/PlacementLocation/*"
            element={<PlacementLocation />}
          ></Route>
          <Route
            exact
            path="/TermManagement/*"
            element={<TermManagement />}
          ></Route>
          <Route path="/Year" element={<Year />}></Route>
          <Route path="/addHospital" element={<AddHospital />}></Route>
          <Route
            path="/AddSchoolLocations"
            element={<AddSchoolLocations />}
          ></Route>
          <Route path="/AddTerm" element={<AddTerm />}></Route>
          <Route path="/AddYear" element={<AddYear />}></Route>
          <Route path="/AddInstructors" element={<AddInstructors />}></Route>
          <Route
            path="/AddStudentRecord"
            element={<AddStudentRecord />}
          ></Route>
          <Route path="/EditHospital/:Id" element={<EditHospital />}></Route>
          <Route path="/EditYear/:Id" element={<EditYear />}></Route>
          <Route path="/EditTerm/:Id" element={<EditTerm />}></Route>
          <Route
            path="/AddPlacementLocation"
            element={<AddPlacementLocation />}
          ></Route>
          <Route
            path="/EditSchoolLocations/:Id"
            element={<EditSchoolLocations />}
          ></Route>
          <Route
            path="/EditInstructors/:Id"
            element={<EditInstructors />}
          ></Route>
          <Route path="/ImportCsv" element={<ImportCsv />}></Route>
        </Routes>
      </>
    );
  }
}
export default Dashboard;
