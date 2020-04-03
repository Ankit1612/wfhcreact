import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

export class AddUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      fullname: "",
      mailid: "",
      city: "delhi",
      cityCode: "101",
      cityDetails: [
        { name: "delhi", code: "101" },
        { name: "mumbai", code: "102" },
        { name: "pune", code: "103" },
        { name: "kolkata", code: "104" },
        { name: "chennai", code: "105" },
        { name: "hyderabad", code: "106" },
        { name: "dehradun", code: "107" },
        { name: "bhopal", code: "108" },
        { name: "patna", code: "109" },
        { name: "bangalore", code: "110" }
      ],
      selectedCity: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState(
      {
        [event.target.name]: event.target.value,
        selectedCity: event.target.value
      },
      () => {
        console.log(this.state.selectedCity);
      }
    );
    for (let i = 0; i < this.state.cityDetails.length; i++) {
      if (this.state.selectedCity === this.state.cityDetails[i].name) {
        console.log("hello", this.state.cityDetails[i].code);
        this.setState(prevState => ({
          cityCode: prevState.state.cityDetails[i].code
        }));
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.handleClick();
  }

  handleClick() {
    console.log("respone: " + JSON.stringify(this.state));
    var loginUrl = "https://pvronline.herokuapp.com/activity/addUser";
    var payload = {
      username: this.state.username,
      fullname: this.state.fullname,
      city: this.state.city,
      cityCode: this.state.cityCode,
      mailid: this.state.mailid
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
    }).then(function(response) {
      console.log(response);
      if (response.status === 200) {
        console.log("Login successful", response.data.fullname);
        alert("user created successfully !!!");
      } else if (response.status !== 200) {
        console.log("failed to login");
        return <Redirect to="/users" />;
      }
    });
  }

  render() {
    return (
      <div className="container">
        <h3>Create New User</h3>
        <br />
        <Form>
          <FormGroup>
            <Label for="userName">Username</Label>
            <Input
              name="username"
              id="userName"
              placeholder="@username123"
              onChange={this.handleChange}
            />
            <FormText>Enter unique username eg., @xyz123</FormText>
          </FormGroup>
          <FormGroup>
            <Label for="fullName">Full Name</Label>
            <Input
              name="fullname"
              id="fullName"
              placeholder="eg., John Smith"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="mailid"
              id="exampleEmail"
              placeholder="eg., xyz@gmail.com"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Input
              type="select"
              name="city"
              id="city"
              value={this.state.city}
              onChange={this.handleChange}
            >
              <option value="delhi">Delhi</option>
              <option value="mumbai">Mumbai</option>
              <option value="pune">Pune</option>
              <option value="kolkata">Kolkata</option>
              <option value="chennai">Chennai</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="dehradun">Dehradun</option>
              <option value="bhopal">Bhopal</option>
              <option value="patna">Patna</option>
              <option value="bangalore">Bangalore</option>
            </Input>
          </FormGroup>
          <Button color="primary" onClick={this.handleSubmit}>
            Create
          </Button>
        </Form>
      </div>
    );
  }
}
