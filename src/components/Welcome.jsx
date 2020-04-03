import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";
import { Login } from "./Login";
import { SignUp } from "./SignUp";

export class Welcome extends Component {
  constructor(props) {
    super(props);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleRedirect(path) {
    this.props.history.push(path);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <br />
          <br />
          <br />
          <div className="row">
            <div className="col">
              <Login
                buttonType={"Login"}
                handleRedirect={this.handleRedirect}
                {...this.props}
              />
            </div>
            <div className="col">
              <SignUp buttonType={"Signup"} />
            </div>
          </div>
        </header>
      </div>
    );
  }
}
