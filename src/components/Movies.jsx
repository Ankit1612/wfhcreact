import React from "react";
import {
  Table,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Form,
  FormGroup,
  Label
} from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

export class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      mailids: [],
      subject: "",
      message: "",
      movieCode: [
        { movieName: "Movie1", code: 301 },
        { movieName: "Movie2", code: 302 },
        { movieName: "Movie3", code: 303 },
        { movieName: "Movie4", code: 304 },
        { movieName: "Movie5", code: 305 }
      ],
      currentCode: null,
      requestCount: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.requestData = this.requestData.bind(this);
    this.setNull = this.setNull.bind(this);
  }

  toggle(event) {
    this.setState({
      modal: !this.state.modal,
      currentCode: event !== undefined ? event.target.name : null
    });
  }

  requestData() {
    if (this.state.modal === true && this.state.currentCode !== null) {
      console.log("calling movie code", this.state.currentCode);
      var mailIdsUrl = `https://pvronline.herokuapp.com/activity/movie?movieCode=${
        this.state.currentCode
      }`;
      axios.get(mailIdsUrl).then(
        function(response) {
          if (response.status === 200) {
            console.log(response.data);
            this.setState({
              mailids: response.data,
              requestCount: false
            });
          }
        }.bind(this)
      );
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    console.log("A name was submitted: " + JSON.stringify(this.state));
    event.preventDefault();
    this.handleClick();
  }

  handleClick(event) {
    var sendMailUrl = "https://pvronline.herokuapp.com/activity/sendmail";
    var payload = {
      to: this.state.mailids,
      message: this.state.message,
      subject: this.state.subject
    };
    axios.get(sendMailUrl, payload).then(
      function(response) {
        console.log(response.data);
        if (response.status === 200) {
          console.log("message sent");
          this.toggle();
        } else if (response.status !== 200) {
          console.log("failed to sent mail");
          alert("Message not sent");
        }
      }.bind(this)
    );
  }

  setNull() {
    this.setState({ currentCode: null });
  }

  render() {
    this.count = 0;
    this.currentCode = this.state.currentCode;
    if (this.currentCode !== null && this.state.requestCount === true) {
      this.requestData();
    }
    return (
      <div className="container">
        <h3>List of Movies</h3>
        <br />
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Movie Name</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movieCode.map((movie, i) => {
              return [
                <tr key={i}>
                  <th scope="row">{++this.count}</th>
                  <td>{movie.movieName}</td>
                  <td>
                    <Button
                      name={movie.code}
                      color="success"
                      onClick={this.toggle}
                    >
                      Sent Mail
                    </Button>{" "}
                  </td>
                </tr>
              ];
            })}
          </tbody>
        </Table>
        <div>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>Email</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup row>
                  <Label for="emailIds" sm={2}>
                    To
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="email"
                      name="to"
                      id="emailIds"
                      value={this.state.mailids.toString()}
                      placeholder="eg., xyz@abc.com,pqr@abc.com"
                      multiple
                      onChange={this.handleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="subject" sm={2}>
                    Subject
                  </Label>
                  <Col sm={10}>
                    <Input
                      name="subject"
                      id="subject"
                      placeholder="Enter subject."
                      onChange={this.handleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="message" sm={2}>
                    Message
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="textarea"
                      name="message"
                      id="message"
                      onChange={this.handleChange}
                    />
                  </Col>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handleSubmit}>
                Sent Mail
              </Button>{" "}
              <Button color="danger" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}
