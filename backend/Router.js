const { json } = require("express");
const userLengthValidator = require("./validators/user/user-length.validator");
const loginGuard = require("./guard/login.guard");

class Router {
  constructor(app, db) {
    this.login(app, db);
    this.logout(app, db);
    this.isLoggedIn(app, db);
    this.Hospital(app, db);
    this.Hospital_Add(app, db);
    this.LoadHospitalData(app, db);
    this.Hospital_Update(app, db);
    this.HospitalDeleteData(app, db);
    this.SchoolLocations(app, db);
    this.updateSchoolLocation(app, db);
    this.School_Location_Add(app, db);
    this.deleteschoollocations(app, db);
    this.LoadSchoolData(app, db);
    this.load_instructors(app, db);
    this.AddInstructors(app, db);
    this.InstructorDelete(app, db);
    this.LoadInstructorsData(app, db);
    this.Instructor_Update(app, db);
    this.load_placement_location(app, db);
    this.LoadHospitalNameData(app, db);
    this.loadInstructorNameData(app, db);
    this.addPlacementLocationData(app, db);
    this.deletePlacementLocation(app, db);
    this.loadTermManagementData(app, db);
    this.deleteTerm(app, db);
    this.addTerm(app, db);
    this.loadtermdata(app, db);
    this.updateTerm(app, db);
    this.loadYearData(app, db);
    this.loadTermData(app, db);
    this.loadYearData(app, db);
    this.deleteYear(app, db);
    this.addYear(app, db);
    this.updateYear(app, db);
    this.loadYear(app, db);
    this.loadSchoolData(app, db);
    this.placementDetails(app, db);
    this.StudentDetails(app, db);
    this.load_student_details(app, db);
    this.addStudentsInfo(app, db);
    this.fetchStudents(app, db);
    this.studentInformation(app, db);
    this.updateYearOfStudy(app, db);
  }

  login(app, db) {
    app.post("/login", (req, res) => {
      let username = req.body.username;
      let password = req.body.password;
      username = username.toLowerCase();
      password = password.toLowerCase();

      const isLengthValid = userLengthValidator(username, password);

      if (!isLengthValid) {
        res.json({
          success: false,
          msg: "An Error Occured, Please Try Again G",
        });
        return;
      }

      let cols = [username];
      db.query(
        "SELECT * FROM user WHERE Username=? LIMIT 1",
        cols,
        (err, data, fields) => {
          if (err) {
            res.json({
              success: false,
              msg: "Username Doesnot Exists",
            });
            return;
          }
          if (data && data.length === 1) {
            if (password === data[0].Password) {
              req.session.userID = data[0].Id;
              console.log(req.sessionID);
              console.log(data);
              console.log("User id is", data[0].Id);
              console.log(req.session);
              res.json({
                success: true,
                username: data[0].username,
              });

              return;
            } else {
              res.json({
                success: false,
                msg: "Please Try again Password Incorrect",
              });
            }
          } else {
            res.json({
              success: false,
              msg: "User Doesnot Exist, Please Try Again",
            });
          }
        }
      );
    });
  }

  logout(app, db) {
    app.post("/logout", (req, res) => {
      if (req.session.userID) {
        req.session.destroy();
        res.json({
          success: true,
        });
        return true;
      } else {
        res.json({
          success: false,
        });
        return false;
      }
    });
  }

  isLoggedIn(app, db) {
    app.get("/isLoggedIn", (req, res) => {
      if (req.session.userID) {
        let cols = [req.session.userID];
        db.query(
          "SELECT * FROM user WHERE Id=? LIMIT 1",
          cols,
          (err, data, fields) => {
            if (data && data.length === 1) {
              res.json({
                success: true,
                username: data[0].username,
              });
              return true;
            } else {
              res.json({
                success: false,
              });
              return false;
            }
          }
        );
      } else {
        res.json({
          success: false,
        });
      }
    });
  }

  Hospital(app, db) {
    app.get("/Hospital", (req, res) => {
      db.query("SELECT * FROM hospital", (err, data, fields) => {
        res.json({
          data,
        });
        return data;
      });
    });
  }

  Hospital_Add(app, db) {
    app.post("/Hospital_Add", (req, res) => {
      let Id = Number(req.body.pid);
      let Name = req.body.Name;
      let Address = req.body.Address;
      let value = [Name, Address];
      var cols = [value];
      console.log(cols);
      var sql = "INSERT INTO hospital (Name,Address) VALUES ?";
      db.query(sql, [cols], (err, data, fields) => {
        res.json({
          msg: "Hospital Added",
        });
        return;
      });
    });
  }

  LoadHospitalData(app, db) {
    app.get("/LoadHospitalData/:Id", (req, res) => {
      var id = parseInt(req.params.Id);
      db.query(
        "SELECT Id,Name,Address FROM hospital WHERE Id= " + id,
        (err, data, fields) => {
          res.json({
            data,
          });
          return data;
        }
      );
    });
  }

  HospitalDeleteData(app, db) {
    app.get("/HospitalDeleteData/:Id", (req, res) => {
      var id = parseInt(req.params.Id);
      db.query("DELETE FROM hospital WHERE Id= " + id, (err, data, fields) => {
        res.json({
          msg: "Hospital Deleted",
        });
        return;
      });
    });
  }

  Hospital_Update(app, db) {
    app.put("/Hospital_Update", (req, res) => {
      let id = Number(req.body.Id);
      let name = req.body.Name;
      let address = req.body.Address;
      console.log(typeof id);
      let value = [name, address, id];
      var sql = "UPDATE hospital SET Name=?,Address=? WHERE Id=?";
      db.query(sql, value, (err, data, fields) => {
        res.json({
          msg: "Hospital Updated",
        });
        return;
      });
    });
  }

  SchoolLocations(app, db) {
    app.get("/SchoolLocations", (req, res) => {
      db.query("SELECT * FROM school_locations", (err, data, fields) => {
        res.json({
          data,
        });
        return data;
      });
    });
  }

  School_Location_Add(app, db) {
    app.post("/School_Location_Add", (req, res) => {
      let Id = req.body.Id;
      let SchoolName = req.body.SchoolName;
      let Campus = req.body.Campus;
      let value = [SchoolName, Campus];
      var cols = [value];
      console.log(cols);
      var sql = "INSERT INTO school_locations (SchoolName,Campus) VALUES ?";
      db.query(sql, [cols], (err, data, fields) => {
        res.json({
          msg: "School Location Added",
        });
        return;
      });
    });
  }
  updateSchoolLocation(app, db) {
    app.put("/updateSchoolLocation", (req, res) => {
      let id = Number(req.body.Id);
      let SchoolName = req.body.SchoolName;
      let Campus = req.body.Campus;
      let value = [SchoolName, Campus, id];
      var sql = "UPDATE school_locations SET SchoolName=?,Campus=? WHERE Id=?";
      db.query(sql, value, (err, data, fields) => {
        res.json({
          msg: "School Location Updated",
        });
        return;
      });
    });
  }

  deleteschoollocations(app, db) {
    app.get("/deleteschoollocations/:Id", (req, res) => {
      var id = parseInt(req.params.Id);
      db.query(
        "DELETE FROM school_locations WHERE Id= " + id,
        (err, data, fields) => {
          res.json({
            msg: "School Location Data Deleted",
          });
          return;
        }
      );
    });
  }

  LoadSchoolData(app, db) {
    app.get("/LoadSchoolData/:intid", (req, res) => {
      var id = parseInt(req.params.intid);
      db.query(
        "SELECT Id,SchoolName,Campus FROM school_locations WHERE Id= " + id,
        (err, data, fields) => {
          res.json({
            data,
          });
          return data;
        }
      );
    });
  }

  load_instructors(app, db) {
    app.get("/load_instructors", (req, res) => {
      db.query("SELECT * FROM instructors", (err, data, fields) => {
        res.json({
          data,
        });
        return data;
      });
    });
  }

  load_student_details(app, db) {
    app.get("/load_student_details", (req, res) => {
      db.query("SELECT * FROM student", (err, data, fields) => {
        return res.json({
          data,
        });
      });
    });
  }

  AddInstructors(app, db) {
    app.post("/AddInstructors", (req, res) => {
      let Id = req.body.Id;
      let Instructor_number = req.body.Instructor_number;
      let First_name = req.body.First_name;
      let Last_name = req.body.Last_name;
      let Email = req.body.Email;
      let Comments = req.body.Comments;
      let value = [Instructor_number, First_name, Last_name, Email, Comments];
      var cols = [value];
      console.log(cols);
      var sql =
        "INSERT INTO instructors (Instructor_number,First_name,Last_name,Email,Comments) VALUES ?";
      db.query(sql, [cols], (err, data, fields) => {
        res.json({
          msg: "Instructors Details Added",
        });
        return;
      });
    });
  }

  InstructorDelete(app, db) {
    app.get("/InstructorDelete/:Id", (req, res) => {
      var id = parseInt(req.params.Id);
      db.query(
        "DELETE FROM instructors WHERE Id= " + id,
        (err, data, fields) => {
          res.json({
            msg: "Instructor Data Deleted Successfully",
          });
          return;
        }
      );
    });
  }

  LoadInstructorsData(app, db) {
    app.get("/LoadInstructorsData/:Id", (req, res) => {
      var id = parseInt(req.params.Id);
      console.log(typeof id);
      db.query(
        "SELECT Id, Instructor_number, First_name, Last_name, Email, Comments FROM instructors WHERE Id= " +
          id,
        (err, data, fields) => {
          res.json({
            data,
          });
          return data;
        }
      );
    });
  }

  Instructor_Update(app, db) {
    app.put("/Instructor_Update", (req, res) => {
      let id = Number(req.body.Id);
      let instructor_number = Number(req.body.Instructor_number);
      let first_name = req.body.First_name;
      let last_name = req.body.Last_name;
      let email = req.body.Email;
      let comment = req.body.Comments;
      let value = [
        instructor_number,
        first_name,
        last_name,
        email,
        comment,
        id,
      ];
      var sql =
        "UPDATE instructors SET Instructor_number=?,First_name=?,Last_name=?, Email=?,Comments=? WHERE Id=?";
      db.query(sql, value, (err, data, fields) => {
        res.json({
          msg: "Instructor Updated",
        });
        return;
      });
    });
  }

  load_placement_location(app, db) {
    app.get("/load_placement_location", (req, res) => {
      var query =
        "SELECT CONCAT(i.First_name,  ' ', i.Last_name) as Instructor_name , h.Name as hospital_name,  p.Id,p.unit, p.section,p.day,p.comments from instructors i JOIN placement_location p on i.Id = p.instructor_id JOIN hospital h on p.hospital_id = h.Id ORDER BY p.hospital_id;";

      db.query(query, (err, data, fields) => {
        res.json({
          data,
        });
        return data;
      });
    });
  }
  LoadHospitalNameData(app, db) {
    app.get("/LoadHospitalNameData", (req, res) => {
      db.query(
        "SELECT Id as hospitalid, Name as hospitalName FROM hospital",
        (err, data, fields) => {
          res.json({
            data,
          });
          return data;
        }
      );
    });
  }

  loadInstructorNameData(app, db) {
    app.get("/loadInstructorNameData", (req, res) => {
      db.query(
        "SELECT Id as instructorId,  CONCAT(First_name,  ' ',Last_name) as InstructorName FROM instructors",
        (err, data, fields) => {
          res.json({
            data,
          });
          return data;
        }
      );
    });
  }

  addPlacementLocationData(app, db) {
    app.post("/addPlacementLocationData", (req, res) => {
      let Id = null;
      let hospital_id = parseInt(req.body.hospitalId);
      let instructor_id = parseInt(req.body.instructorId);
      let unit = req.body.unit;
      let day = req.body.day;
      let section = req.body.section;
      let comments = req.body.comments;
      let value = [
        Id,
        hospital_id,
        instructor_id,
        unit,
        day,
        section,
        comments,
      ];
      var cols = [value];
      var sql =
        "INSERT INTO placement_location (Id,hospital_id,instructor_id,unit,day,section,comments) VALUES ?";
      db.query(sql, [cols], (err, data, fields) => {
        res.json({
          msg: "Placement Location Details Added",
        });
        return;
      });
    });
  }

  deletePlacementLocation(app, db) {
    app.get("/deletePlacementLocation/:id", (req, res) => {
      var Id = parseInt(req.params.id);
      db.query(
        "DELETE FROM placement_location WHERE Id= " + Id,
        (err, data, fields) => {
          res.json({
            msg: "Placement Location Data Deleted Successfully",
          });
          return;
        }
      );
    });
  }

  loadTermManagementData(app, db) {
    app.get("/loadTermManagementData", (req, res) => {
      db.query(
        "SELECT t.Id,t.term,y.year from year y JOIN term t on t.yearId = y.Id ORDER BY y.year; ",
        (err, data, fields) => {
          res.json({
            data,
          });
          return data;
        }
      );
    });
  }
  deleteTerm(app, db) {
    app.get("/deleteTerm/:id", (req, res) => {
      var Id = parseInt(req.params.id);
      db.query("DELETE FROM term WHERE Id= " + Id, (err, data, fields) => {
        res.json({
          msg: "Term Deleted",
        });
        return;
      });
    });
  }

  addTerm(app, db) {
    app.post("/addTerm", (req, res) => {
      let Id = null;
      let yearId = parseInt(req.body.yearId);
      let term = req.body.term;
      let value = [Id, term, yearId];
      var cols = [value];
      console.log(cols);
      var sql = "INSERT INTO term (Id,term,yearId) VALUES ?";
      db.query(sql, [cols], (err, data, fields) => {
        res.json({
          msg: "Term Added Successfully",
        });
        return;
      });
    });
  }

  loadtermdata(app, db) {
    app.get("/loadtermdata/:intid", (req, res) => {
      var id = parseInt(req.params.intid);
      console.log(id);
      db.query(
        "SELECT t.Id,t.term,y.year,(y.Id) AS yearId FROM year y JOIN term t on t.yearId = y.Id WHERE t.Id= " +
          id,
        (err, data, fields) => {
          res.json({
            data,
          });
          console.log(data);
          return data;
        }
      );
    });
  }

  updateTerm(app, db) {
    app.put("/updateTerm", (req, res) => {
      let id = Number(req.body.Id);
      let yearId = Number(req.body.yearId);
      let term = req.body.term;
      let value = [term, yearId, id];
      console.log(value);
      var sql = "UPDATE term SET term=?, yearId=? WHERE Id=?";
      db.query(sql, value, (err, data, fields) => {
        res.json({
          msg: "Term Data Updated",
        });
        return;
      });
    });
  }

  loadYearData(app, db) {
    app.get("/loadYearData", (req, res) => {
      db.query("SELECT Id , year FROM year", (err, data, fields) => {
        res.json({
          data,
        });
        // console.log(data);
        return data;
      });
    });
  }

  loadTermData(app, db) {
    app.get("/loadTermData:selectYearid", (req, res) => {
      let selectYearId = Number(req.params.selectYearid);
      console.log("term id", selectYearId);
      db.query(
        "SELECT t.Id,t.term,y.year,(y.Id) AS yearId FROM year y JOIN term t on t.yearId = y.Id WHERE y.Id=?",
        selectYearId,
        (err, data, fields) => {
          res.json({
            data,
          });
          console.log(data);
          return data;
        }
      );
    });
  }

  loadYearData(app, db) {
    app.get("/loadYearData", (req, res) => {
      db.query("SELECT * FROM year", (err, data, fields) => {
        res.json({
          data,
        });
        return data;
      });
    });
  }

  deleteYear(app, db) {
    app.get("/deleteYear/:id", (req, res) => {
      var Id = parseInt(req.params.id);
      db.query("DELETE FROM year WHERE Id= " + Id, (err, data, fields) => {
        res.json({
          msg: "Year Deleted",
        });
        return;
      });
    });
  }

  addYear(app, db) {
    app.post("/addYear", (req, res) => {
      let Id = null;
      let year = req.body.year;
      let value = [Id, year];
      var cols = [value];
      var sql = "INSERT INTO year (Id,year) VALUES ?";
      db.query(sql, [cols], (err, data, fields) => {
        res.json({
          msg: "Year Added Successfully",
        });
        return;
      });
    });
  }
  loadYear(app, db) {
    app.get("/loadYear/:intid", (req, res) => {
      var id = parseInt(req.params.intid);
      db.query(
        "SELECT Id,year FROM year WHERE Id= " + id,
        (err, data, fields) => {
          res.json({
            data,
          });
          return data;
        }
      );
    });
  }

  updateYear(app, db) {
    app.put("/updateYear", (req, res) => {
      let id = parseInt(req.body.Id);
      let year = req.body.year;
      let value = [year, id];
      var sql = "UPDATE year SET year=? WHERE Id=?";
      db.query(sql, value, (err, data, fields) => {
        res.json({
          msg: "Year Data Updated",
        });
        return;
      });
    });
  }

  loadSchoolData(app, db) {
    app.get("/loadSchoolData", (req, res) => {
      db.query(
        "SELECT Id as schoolId, SchoolName as schoolName FROM school_locations",
        (err, data, fields) => {
          res.json({
            data,
          });
          return data;
        }
      );
    });
  }

  placementDetails(app, db) {
    app.get("/placementDetails/:pId", (req, res) => {
      var id = parseInt(req.body.Id);
      var query =
        "SELECT CONCAT(i.First_name,  ' ', i.Last_name) as Instructor_name , h.Name as hospital_name,p.unit, p.section,p.day,p.comments from instructors i JOIN placement_location p on i.Id = p.instructor_id JOIN hospital h on p.hospital_id = h.Id WHERE p.Id=?;";
      db.query(query, [id], (err, data, fields) => {
        res.json({
          data,
        });
        console.log(data);
        return data;
      });
    });
  }

  StudentDetails(app, db) {
    app.post("/StudentDetails", (req, res) => {
      //if(req.session.userId)
      console.log("check session", req.session.userID);
      let term = req.body.Term;
      // let id=Number(req.body.Id);
      let SchoolName = req.body.SchoolName;
      let pid = Number(req.body.pid);
      let FirstName = req.body.FirstName;
      let LastName = req.body.LastName;
      let Email = req.body.Email;
      let StudentNumber = parseInt(req.body.StudentNumber);
      let Comments = req.body.Comments;
      let value = [
        term,
        SchoolName,
        FirstName,
        LastName,
        Email,
        StudentNumber,
        Comments,
        pid,
      ];
      var cols = [value];
      console.log(cols);
      var sql =
        "INSERT INTO student (Term,Schoolname,FirstName,LastName,Email,StudentNumber,Comments,pid) VALUES ?";
      db.query(sql, [cols], (err, data, fields) => {
        res.json({
          msg: "Student Details Added",
        });
        return;
      });
    });
  }

  // API for adding students info to the database
  addStudentsInfo(app, db) {
    app.post("/addStudentsInfo", (req, res) => {
      if (req.session.userID) {
        var cols = req.body;
        var sql =
          "INSERT INTO studentinfo (StudentNumber, LastName, FirstName, YearofStudy, Email, PhoneNumber) VALUES ?";
        db.query(sql, [cols], (err, data, fields) => {
          res.json({
            msg: "New Students details have been added to the database",
            success: true,
          });
          return;
        });
      } else {
        res.json({
          success: false,
        });
      }
    });
  }

  // sending students to the front end
  fetchStudents(app, db) {
    app.get("/fetchStudents", (req, res) => {
      if (req.session.userID) {
        db.query("SELECT * FROM student", (err, data, fields) => {
          res.json({
            data,
            success: true,
          });
          return data;
        });
      } else {
        res.json({
          success: false,
        });
      }
    });
  }

  studentInformation(app, db) {
    app.get("/studentInformation/:year", (req, res) => {
      var year = parseInt(req.params.year);
      db.query(
        "SELECT * FROM studentinfo where YearOfStudy = " + year,
        (err, data, fields) => {
          res.json({
            data,
          });
          return data;
        }
      );
    });
  }

  updateYearOfStudy(app, db) {
    app.get("/updateYearOfStudy", (req, res) => {
      db.query(
        "UPDATE studentinfo SET YearOfStudy = CASE WHEN YearOfStudy < 4 THEN YearOfStudy + 1 ELSE 'ALUMNI' END ; ",
        (err, msg, fields) => {
          if (err) {
            console.log(err);
          }
          res.json({
            msg: "Successssssss",
          });
          return msg;
        }
      );
    });
  }
}

module.exports = Router;
