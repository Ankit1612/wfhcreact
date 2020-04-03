import React from "react";
import { Table } from "reactstrap";
import axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isData: false,
      data: []
    };
  }

  componentDidMount() {
    let loginUrl = "https://pvronline.herokuapp.com/activity/pvrdetails";
    axios.get(loginUrl).then(
      function(response) {
        if (response.status === 200) {
          this.setState({ isData: true, data: response.data });
        }
      }.bind(this)
    );
  }

  render() {
    console.log(this.state);
    this.count = 0;
    this.output = "";
    return (
      <div>
        <br />
        <Table dark>
          <thead>
            <tr>
              <th>#</th>
              <th>City</th>
              <th>Theater</th>
              <th>Movie</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((item, i) => {
              return [
                <tr key={i}>
                  <th scope="row">{this.count++}</th>
                  <td>{item.city}</td>
                  <td>{item.name}</td>
                  <td>{item.moviename}</td>
                </tr>
              ];
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export { Home };
