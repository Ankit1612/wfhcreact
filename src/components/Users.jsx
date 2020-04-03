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

export class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mailids: [],
      subject: "",
      message: "",
      modal: false,
      isData: false,
      data: [],
      valueSet: false,
      checkedItems: new Map()
    };

    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log("hello");
    let loginUrl = "https://pvronline.herokuapp.com/activity/allUsers";
    axios.get(loginUrl).then(
      function(response) {
        if (response.status === 200) {
          console.log(response.data);
          this.setState({ isData: true, data: response.data });
        }
      }.bind(this)
    );
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.handleClick();
  }

  toggle() {
    if (this.state.valueSet) {
      this.setState({
        mailids: []
      });
    }
    this.setState({
      modal: !this.state.modal
    });
  }

  onClick() {
    this.state.checkedItems.forEach((value, key) => {
      console.log(`key: ${key}, value: ${value}`);
      if (value) {
        this.state.mailids.push(key);
      }
      console.log("list of ", this.state.mailids);
    });
    this.setState({
      modal: !this.state.modal,
      valueSet: true
    });
  }

  handleClick(event) {
    var sendMailUrl = "https://pvronline.herokuapp.com/activity/sendmail";
    var payload = {
      to: this.state.mailids,
      message: this.state.message,
      subject: this.state.subject
    };
    axios.post(sendMailUrl, payload).then(
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

  onChangeHandler(e) {
    const isChecked = e.target.checked;
    const mailId = e.target.name;
    this.setState(prevState => ({
      checkedItems: prevState.checkedItems.set(mailId, isChecked)
    }));
    console.log(isChecked, mailId, this.state.checkedItems);
  }

  render() {
    this.count = 0;
    return (
      <div className="container">
        <h3>List of Users</h3>
        <br />
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>City</th>
              <th>Email Id</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((item, i) => {
              return [
                <tr key={i}>
                  <th scope="row">{++this.count}</th>
                  <td>{item.fullname}</td>
                  <td>{item.city}</td>
                  <td>{item.mailid}</td>
                  <td>
                    <input
                      type="checkbox"
                      name={item.mailid}
                      checked={this.state.checkedItems.get(item.mailid)}
                      onChange={this.onChangeHandler}
                    />
                  </td>
                </tr>
              ];
            })}
          </tbody>
        </Table>
        <Button color="success" onClick={this.onClick}>
          Sent Mail
        </Button>{" "}
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
                      onChange={this.handleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="subjectMail" sm={2}>
                    Subject
                  </Label>
                  <Col sm={10}>
                    <Input
                      name="subject"
                      id="subjectMail"
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
                Send
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
