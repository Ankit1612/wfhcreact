import React, { Component} from 'react';
import { Redirect } from "react-router-dom";
import axios from "axios";
import ShareUrl from "./ShareUrl";

class Challenge extends Component {

	constructor(props) {
        super(props);
        this.state = {
            option: ' ',
            custom: ' ',
            isRadioSelected: true
        };
    }

    handleChange = (e) => {
        this.setState({
        	option: e.target.value,
        	isRadioSelected: true
        });
        if(e.target.value === 'custom'){
        this.setState({
    		 isRadioSelected: false
    	});	
        }
    }

    handleChangeRadio = (e) => {
    	this.setState({
    		 isRadioSelected: false
    	});
    }

    customHandleChange = (e) => {
        this.setState({
            custom: e.target.value
        });
    }

   handleSubmit = (e) => {
      	e.preventDefault();
    	var customQuestion;
    	if(this.state.option === 'custom'){
    		customQuestion = this.state.custom;
    	} else {
    		customQuestion = this.state.option;
    	}
    	var loginUrl = "https://wfhcfbackend.herokuapp.com/createChallenge";
    	var payload = {
      		name: this.props.location.state.name,
      		challenge: customQuestion
    	};

    	axios({
      	method: "post",
      	url: loginUrl,
      	data: payload,
      	crossDomain: true,
      	headers: {
        "accept": "application/json",
        "content-type": "application/json" 
      	}
    	}).then(
      	function(response) {
      		console.log(payload);
        	console.log(response);
        if (response.status === 200) {
          	this.props.history.push({
          		pathname: `/profile/${payload.name}`, 
          		state: { uniqueCode: response.data,
          				 username: payload.name}}
          		);
        } else if (response.status !== 400) {
          console.log("failed to login");
          return <Redirect to="/welcome" />;
        }
      }.bind(this)
    );
    }

	render() {
		return(
			<form onSubmit={this.handleSubmit}>
			<div>
			<p>hello, {this.props.location.state.name}</p>
			 <div className="form-check">
  				<label className="form-check-label">
    			<input type="radio" className="form-check-input" value="Update your status with the message ‘I’m stupid’."
              		checked={this.state.option === "Update your status with the message ‘I’m stupid’."}
              		onChange={this.handleChange}/>Update your status with the message ‘I’m stupid’.
    			</label>
			 </div>
			 <div className="form-check">
  				<label className="form-check-label">
    			<input type="radio" className="form-check-input" value="Cook egg maggie and update on your's status."
              		checked={this.state.option === "Cook egg maggie and update on your's status."}
              		onChange={this.handleChange}/>Cook egg maggie and update on your's status.
  				</label>
			 </div>
			 <div className="form-check">
  				<label className="form-check-label">
    			<input type="radio" className="form-check-input" value="Update you'r status with your's childhood pics."
              		checked={this.state.option === "Update you'r status with your's childhood pics."}
              		onChange={this.handleChange} />Update you'r status with your's childhood pics.
  				</label>
			 </div> 
			 <div className="form-check">
  				<label className="form-check-label">
    			<input type="radio" className="form-check-input" value="custom"
              		checked={this.state.option === "custom"}
              		onChange={this.handleChange} />Create your own challenge.
  				</label>
  				<textarea className="form-control" rows="3" value={this.state.custom} 
  					onChange={this.customHandleChange} disabled={this.state.isRadioSelected}></textarea>
			 </div> 
			     <button type="submit" className="btn btn-success btn-sm">Submit</button>
			</div>
			</form>
		);
	}
}

export default Challenge;