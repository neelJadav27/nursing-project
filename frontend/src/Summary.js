import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./css/Form.css";
import "./css/dashboard.css";

const Summary = () => {
  return (
    <div class="body1">
      <div class="studentInformation">
        <h4 style={{ margin: 10, color: "black" }}>Student Information</h4>
        <div class="studentDetails">
          <Link to={{ pathname: `/StudentInfoPage/${1}`, state: "1" }}>
            <div class="studentYear">
              <h3>1st Year</h3>
            </div>
          </Link>
          <Link to={{ pathname: `/StudentInfoPage/${2}`, state: "2" }}>
            <div class="studentYear">
              <h3>2nd Year</h3>
            </div>
          </Link>
          <Link to={{ pathname: `/StudentInfoPage/${3}`, state: "3" }}>
            <div class="studentYear">
              <h3>3th Year</h3>
            </div>
          </Link>
          <Link to={{ pathname: `/StudentInfoPage/${4}`, state: "4" }}>
            <div class="studentYear">
              <h3>4th Year</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Summary;
