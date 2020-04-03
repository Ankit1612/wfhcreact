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
import axios from "axios";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      username: "",
      fullname: "",
      password: ""
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    console.log("A name was submitted: " + JSON.stringify(this.state));
    event.preventDefault();
    this.handleClick();
  }

  handleClick() {
    var signUpUrl = "https://pvronline.herokuapp.com/activity/signup";
    var payload = {
      username: this.state.username,
      fullname: this.state.fullname,
      password: this.state.password
    };
    console.log(signUpUrl);
    axios({
      method: "post",
      url: signUpUrl,
      data: payload,
      crossDomain: true,
      headers: {
        "accept": "application/json",
        "access-control-allow-origin": "*", 
        "content-type": "application/json" }
    }).then(
      function(response) {
        console.log(response.state);
        if (response.status === 200) {
          console.log("SignUp successful");
          this.toggle();
        } else if (response.status !== 400) {
          console.log("failed to SignUp");
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
        <Button outline color="primary" size="lg" onClick={this.toggle}>
          {this.props.buttonType}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle} close={closeBtn}>
            SignUp
          </ModalHeader>
          <ModalBody>
            <Form row>
              <FormGroup>
                <Label for="signUpUsername" hidden>
                  Username
                </Label>
                <Input
                  name="username"
                  id="signUpUsername"
                  placeholder="Username"
                  onChange={this.handleChange}
                />
              </FormGroup>{" "}
              <FormGroup>
                <Label for="signUpFuname" hidden>
                  Username
                </Label>
                <Input
                  name="fullname"
                  id="signUpFuname"
                  placeholder="Full Name"
                  onChange={this.handleChange}
                />
              </FormGroup>{" "}
              <FormGroup>
                <Label for="signUpPassword" hidden>
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="signUpPassword"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
              </FormGroup>{" "}
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>
              SignUp
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

export { SignUp };
