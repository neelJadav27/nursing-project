import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./css/Form.css";
import { CSVLink } from "react-csv";
import { MDBDataTableV5 } from "mdbreact";

const StudentInfoPage = () => {
  const { year } = useParams();
  const [datatable, setDatatable] = React.useState({
    columns: [],
    rows: [],
  });

  useEffect(async () => {
    try {
      console.log("i am here");
      // console.log(studentInfo);
      let res = await fetch(
        `http://localhost:3002/studentInformation/${year}`,
        {
          method: "get",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      let result = await res.json();
      console.log("result", result);
      const headerKeys = Object.keys(Object.assign({}, ...result.data));
      const columns = [];
      headerKeys.forEach((x) => {
        let x_withOutSpaces = x.replace(/ /g, "");
        columns.push({
          field: x_withOutSpaces,
          label: x_withOutSpaces,
        });
      });

      setDatatable({
        rows: result.data,
        columns: columns,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      {datatable.rows.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <CSVLink
              data={datatable.rows}
              filename={`StudentDetails-${year}year.csv`}
              target="_blank"
            >
              <button>
                <h5>Export CSV</h5>
              </button>
            </CSVLink>
          </div>
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
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2>No Records</h2>
        </div>
      )}
    </div>
  );
};

export default StudentInfoPage;
