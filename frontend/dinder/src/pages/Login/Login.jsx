import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import "./Login.css"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",

      errorMessage: "",
    };
  }

  handleEmailField = (value) => {
    this.setState({
      email : value
    })
  }

  handlePasswordField = (value) => {
    this.setState({
      password : value
    })
  }

  isValidEmail = () => {
    // Regex source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(this.state.email.toLowerCase());
  }

  completedLogin = () => {
    return this.isValidEmail();
  }

  handleLogIn = async(e) => {
    e.preventDefault();

    const loginData = new URLSearchParams();
    loginData.append("email", this.state.email);
    loginData.append("password", this.state.password);

    const url = "http://localhost:4567/login";
    try {
      const response = await fetch(url, {
        method: "post",
        body: loginData
      });
  
      switch (response.status) {
        case 200:
          const data = await response.json();
          this.props.setUser(data);
          this.props.history.push('/pals');
          break;
        case 400:
          this.setState({
            errorMessage: "Please check your email and password and try again."
          })
          break;
        default:
          alert("Server is busy, please try again later.");
          break;
      }
    } catch (error) {
      alert("Server is busy, please try again later.");
    }
  }

  render() {
    return(
      <div id="login-container">
        <div id="login-welcome-title">
            <div id="login-welcome">
            Welcome to
            </div>
            <div id="login-title">
            Dinder
            </div>
        </div>
        <div id="login-content-container">
            <form action="">
                <input type="text" className="login-field" onChange={e => this.handleEmailField(e.target.value)} placeholder="Email"/>
                <input type="password" className="login-field" onChange={e => this.handlePasswordField(e.target.value)} placeholder="Password"/>
                <div className="error-message">
                  {this.state.errorMessage}
                </div>
                <input type="submit" id={this.completedLogin() ? "" : "disabled"} disabled={!this.completedLogin()} onClick={(e) => this.handleLogIn(e)} className="login-button" value="Sign In"/>
            </form>
            <div id="login-divider"></div>
            <a href="/survey"><button className="login-button" style={{marginBottom: "0px"}} href="/survey">Make an Account</button></a>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);