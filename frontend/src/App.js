import "./App.css";
import React from "react";
import { observer } from "mobx-react";
import userstore from "./stores/userstore";
import LoginForm from "./LoginForm";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Dashboard";

class App extends React.Component {
  async componentDidMount() {
    try {
      alert("Called");
      let res = await fetch("http://localhost:3002/isLoggedIn", {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      let result = await res.json();
      if (result && result.success) {
        userstore.loading = false;
        userstore.isLoggedIn = true;
        userstore.username = result.username;
      } else {
        userstore.loading = false;
        userstore.isLoggedIn = false;
      }
    } catch (e) {
      userstore.loading = false;
      userstore.isLoggedIn = false;
    }
  }
  // async doLogout() {
  //   try {
  //     let res = await fetch('/logout', {
  //       method: 'post',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       }
  //     });

  //     let result = await res.json();
  //     if (result && result.success) {
  //       userstore.isLoggedIn = false;
  //       userstore.username = '';
  //     }
  //   }
  //   catch (e) {
  //     console.log(e);
  //   }
  // }
  render() {
    console.log(userstore.loading);
    if (userstore.loading) {
      return (
        <div className="app">
          <div className="container">Loading Please..</div>
        </div>
      );
    } else {
      if (userstore.isLoggedIn) {
        console.log("User is logged in");
        return (
          <Dashboard />
          // <div className='app' >
          //   <div className='container'>Welcome {userstore.username}
          //     <SubmitButton
          //       text={'Logout'}
          //       disabled={false}
          //       onClick={() => this.doLogout()}
          //     />
          //   </div>
          // </div>
        );
      }
      console.log("User is not logged in");
      return (
        // //  <Dashboard/>
        // <Dashboard/>
        // <div className="app">
        //   {/* <div className='container'> */}
        <LoginForm />
        //   {/* </div> */}
        // </div>
      );
    }
  }
}
export default observer(App);
