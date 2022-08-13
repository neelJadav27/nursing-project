const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const Router = require("./Router");
const cookieParser = require("cookie-parser");

var cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log("Testing server");
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
//database
const db = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "nursing_schedular",
});

db.connect(function (err) {
  if (err) {
    console.log("DB ERROr");
    throw err;

    return false;
  } else {
    console.log("Connected");
  }
});

const sessionStore = new MySQLStore(
  {
    expiration: 1825 * 86400 * 1000,
    endConnectionOnClose: false,
  },
  db
);

app.use(
  session({
    secret: "sagjfguy4yret384",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1_300_000,
      httpOnly: true,
    },
  })
);

///////////

// const checkIfUserLoggedIn = function (req, res, next) {
//   if (req.session.userID) {
//     console.log("Got here");
//     next();
//   } else {
//     res.send("User not logged in");
//   }
// };

// app.get("/setsess", (req, res) => {
//   req.session.userID = 10;

//   res.send("set");
// });

// app.get("/testprofile", [checkIfUserLoggedIn], (req, res) => {
//   console.log("Hello there", req.session.userID);
//   res.send("Cool There");
// });

// app.get("/getsess", (req, res) => {
//   console.log(req.session);
//   res.send("Ok");
// });

// app.get("/destroysess", (req, res) => {
//   req.session.destroy();

//   res.send("Session destoyed");
// });

//////////

//app.use(cookieParser());

app.get("/test", function (req, res) {
  console.log("session", req.sessionID);
  res.send("heeladfsd");
});

new Router(app, db);
app.options("*", cors());

// app.get("/", function (req, res, next) {
//   console.log(req.session);
//   res.send("Hello World!");
// });
// app.get('/',cors(corsOptions),function(req,res){
//     res.sendFile(path.join(__dirname,'build','index.html'));
// });
app.listen(3002);
