import React, { Component } from 'react';
import {Redirect} from 'react-router';
import Challenge from './Challenge';
import {
	withRouter
} from 'react-router-dom';

const hashtag = {
  color: '#1da1f2'
};

class Welcome extends React.Component {
	 constructor(props) {
        super(props);
        this.state = {
            value: ' '
        };

        this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        });
    }

   handleSubmit = (e) => {
      	e.preventDefault();
    	this.props.history.push('/challenge', {name: this.state.value});
    }

    render(){
	return (
		<div>
			<h3 style={hashtag}>#workfromhomechallenge20</h3>
			<form onSubmit={this.handleSubmit}>
  				<label for="usr">Enter your name:</label>
 		 		<input type="text" className="form-control" id="usr"
                        value={this.state.value}
                        onChange={this.handleChange}/>
                <br></br>
				<button type="submit" className="btn btn-primary btn-sm">&nbsp;&nbsp;&nbsp;Enter&nbsp;&nbsp;&nbsp;</button>
			<br></br>
			<br></br>
			<br></br>
			<div class="container">
			<p style={hashtag}>
				#workfromhome #challenge #workfromhomechallenge #timepass #lockdown #qunatine 
			</p>
			</div>
			</form>
		</div>
		);
	}
};

export default Welcome;