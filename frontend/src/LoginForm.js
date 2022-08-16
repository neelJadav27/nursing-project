import React from "react";
import "./App.css";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import userstore from "./stores/userstore";
import "./css/Login.css";
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      buttonDisabled: false,
    };
  }
  setInputValue(property, val) {
    val = val.trim();
    if (val.length > 12) {
      return;
    }
    this.setState({
      [property]: val,
    });
  }
  resetForm() {
    this.setState({
      username: "",
      password: "",
      buttonDisabled: false,
    });
  }
  async doLogin() {
    if (!this.state.username) {
      return;
    }
    if (!this.state.password) {
      return;
    }
    this.setState({
      buttonDisabled: true,
    });
    try {
      let res = await fetch("http://localhost:3002/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      });
      let result = await res.json();
      if (result && result.success) {
        userstore.isLoggedIn = true;
        userstore.username = result.username;
      } else if (result && result.success === false) {
        this.resetForm();
        alert(result.msg);
      }
    } catch (e) {
      console.log(e);
      this.resetForm();
    }
  }
  render() {
    return (
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form className="login">
              <h3>Nursing Schedular login</h3>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <InputField
                  type="text"
                  placeholder="Username"
                  value={this.state.username ? this.state.username : ""}
                  onChange={(val) => this.setInputValue("username", val)}
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <InputField
                  type="password"
                  placeholder="Password"
                  value={this.state.password ? this.state.password : ""}
                  onChange={(val) => this.setInputValue("password", val)}
                />
              </div>

              {/* <input type ="submit">Submit</input> */}
              <SubmitButton
                className="submitButton"
                text="Log In"
                disabled={this.state.buttonDisabled}
                onClick={() => this.doLogin()}
              >
                <i className="button__icon fas fa-chevron-right"></i>
              </SubmitButton>
            </form>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginForm;
