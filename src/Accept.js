import React, { Component } from 'react';
import ReactDOM from "react-dom";

class Accept extends Component {

constructor(props) {
    super(props);
    this.textContent = null;
    this.state = {
      copied: false
    };
  }

  copyToClipboard = async e => {
    window.getSelection().removeAllRanges();
    var range = document.createRange();
    range.selectNode(this.textContent);
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    this.setState({ copied: true });
  };

  initRef = c => (this.textContent = c);

  render() {
    const { copied } = this.state;
    return (
      <div class="positioning">
        <p ref={this.initRef}>
          I have accepted #workfromhaomechallenge given by {this.props.location.state.name}
				and challenge is - {this.props.location.state.challenge} link-> localhost:3000/
        </p>
        { <button type="button" className="btn btn-primary btn-sm" onClick={this.copyToClipboard}>Copy to clipboard</button> }
        {    	copied ?
            	<div style={{"color": "green"}}>
             		 Copied!
            	</div> : null}
        <p> Copy the text and update it on your whatapp and facebook status and let know everyone 
        	you have accepted {this.props.location.state.name} challenge.</p>
      </div>
    );
  }
}

export default Accept;