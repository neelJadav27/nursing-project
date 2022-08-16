import React from "react";
import Dashboard from "./Dashboard";
import "./css/nav.css";
import userstore from "./stores/userstore";
import { Link } from "react-router-dom";
export class Navbar extends React.Component {
  async doLogout() {
    try {
      let res = await fetch("http://localhost:3000/logout", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      let result = await res.json();
      if (result && result.success) {
        userstore.isLoggedIn = false;
        userstore.username = "";
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <header class="header">
        <h1 class="logo">
          <Link to="/">
            <i class="fa fa-user-circle-o" aria-hidden="true"></i> Nursing
            Schedular
          </Link>
        </h1>

        <div>
          <ul class="main-nav">
            <Link to="/">Dashboard</Link>
            <Link to="/StudentManagement">Student Management</Link>
            <div class="dropdown">
              <button class="dropbtn">
                <i class="fa fa-cog" aria-hidden="true"></i> EDIT COMPONENTS{" "}
              </button>
              <div class="dropdown-content">
                <Link to="/Hospital">Hospital</Link>
                <div class="dropdown-content">
                  <Link to="/SchoolLocations">School Locations</Link>
                  <div class="dropdown-content">
                    <Link to="/Instructors">Instructors</Link>
                    <div class="dropdown-content">
                      <Link to="/PlacementLocation">Placement Location</Link>
                      <div class="dropdown-content">
                        <Link to="/TermManagement">Term Management</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <li><a href="#">Portfolio</a></li> */}
            <li onClick={() => this.doLogout()}>
              <a href="">
                <i class="fa fa-sign-out" aria-hidden="true"></i> Logout
              </a>
            </li>
          </ul>
          {/* <Routes>
     <Route path="Hospital/addHospital" element={< addHospital />}>
        </Route>
    </Routes> */}
        </div>
      </header>
    );
  }
}
export default Navbar;
