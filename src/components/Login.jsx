import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      modal: false,
      isLoggedIn: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    console.log("A name was submitted: " + JSON.stringify(this.state));
    event.preventDefault();
    this.handleClick();
  }

  toggleLogin() {
    this.setState({ isLoggedIn: !this.state.isLoggedIn });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleClick() {
    console.log("reached");
    var loginUrl = "https://pvronline.herokuapp.com/activity/login";
    var payload = {
      username: this.state.username,
      password: this.state.password
    };

    axios({
      method: "post",
      url: loginUrl,
      data: payload,
      crossDomain: true,
      headers: {
        "accept": "application/json",
        "access-control-allow-origin": "*", 
        "content-type": "application/json" 
      }
    }).then(
      function(response) {
        console.log(response);
        if (response.status === 200) {
          console.log("Login successful");
          this.toggleLogin();
          this.toggle();
          console.log(this.state.isLoggedIn);
          this.props.handleRedirect("/home");
          this.props.handleRedirect();
        } else if (response.status !== 400) {
          console.log("failed to login");
          return <Redirect to="/welcome" />;
        }
      }.bind(this)
    );
  }

  render() {
    const closeBtn = (
      <button className="close" onClick={this.toggle}>
        &times;
      </button>
    );

    return (
      <div>
        <Button outline size="lg" color="primary" onClick={this.toggle}>
          {this.props.buttonType}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle} close={closeBtn}>
            Login
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for="loginUsername" hidden>
                  Username
                </Label>
                <Input
                  type="text"
                  name="username"
                  id="loginUsername"
                  placeholder="Username"
                  onChange={this.handleChange}
                />
              </FormGroup>{" "}
              <FormGroup row>
                <Label for="loginPassword" hidden>
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="loginPassword"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
              </FormGroup>{" "}
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleClick}>
              Login
            </Button>{" "}
            <Button color="danger" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export { Login };
