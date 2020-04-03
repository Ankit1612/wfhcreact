import React, { Component } from 'react';
import axios from "axios";
import { withRouter, Route, Redirect } from "react-router-dom";
import Accept from './Accept';

class User extends Component {

	constructor(props) {
		super(props);
		this.state = {
			uniquecode: this.props.match.params.uniquecode,
			user: {
				challenge: '',
				id: '',
				name: '',
				uri: ''
			},
			accepted: false,
			decline: false
		}

	}

	componentDidMount() {
		var createUrl = "https://wfhcfbackend.herokuapp.com/"+this.state.uniquecode;
    	axios({
      	method: "get",
      	url: createUrl,
      	crossDomain: true,
      	headers: {
        "accept": "application/json",
        "content-type": "application/json" 
      	}
    	}).then(
      	function(response) {
      		console.log(createUrl);
        	console.log(response);
        if (response.status === 200) {
          this.setState({
          	user: response.data
        });
        } else if (response.status !== 400) {
          console.log("failed to login");
        }
      }.bind(this)
    );
  }

  onClickHandle = (e) => {
  	e.preventDefault();
  	    this.setState({
          	accepted: true
        });
		}

  onClickHandleDecline = (e) => {
  	e.preventDefault();
  	  	this.setState({
          	decline: true
        });
	}

	render(){
		return(
			<div>
				<p> hey, {this.state.user.name} has given you a challenge - {this.state.user.challenge}. Please accept 
					the challenge and display it, at your whatsapp status.</p>
				<div>
					<button type="button" class="btn btn-danger btn-sm" onClick={this.onClickHandleDecline}>Decline</button>&nbsp;&nbsp;
					<button type="button" class="btn btn-primary btn-sm" onClick={this.onClickHandle}>Accept</button>
					{(this.state.accepted)?
						<Redirect to={{
            				pathname: '/accept',
           					state: { name: this.state.user.name,
            		 				challenge: this.state.user.challenge }
       				 }} />:null
					}{
					(this.state.decline)?
						<Redirect to={{
            				pathname: '/'
       				 }} />:null
					}
				</div>
			</div>		
		);
	}
}

export default withRouter(User);