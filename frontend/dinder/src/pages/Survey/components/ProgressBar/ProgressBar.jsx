import React, { Component } from "react";
import "./ProgressBar.css"
import pawLight from "../../../../assets/images/pawWhite.svg"
import pawDark from "../../../../assets/images/paw.svg"

class ProgressBar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	
	render() {
		return (
	  		<div id="progressbar-container">
				 <div className="progressbar-tab-container">
                    <img className="progressbar-tab-icon" src={this.props.currentSection === "account" ? pawDark : pawLight} alt=""/>
                    <div className="progressbar-tab-text" id={this.props.currentSection === "account" ? "progressbar-current" : ""}>
                        Account
                    </div>
                </div>
                <div className="progressbar-tab-container">
                    <img className="progressbar-tab-icon" src={this.props.currentSection === "your-information" ? pawDark : pawLight} alt=""/>
                    <div className="progressbar-tab-text" id={this.props.currentSection === "your-information" ? "progressbar-current" : ""}>
                        Your Information
                    </div>
                </div>
                <div className="progressbar-tab-container" style={{marginBottom: "0vh"}}>
                    <img className="progressbar-tab-icon" src={this.props.currentSection === "your-interests" ? pawDark : pawLight} alt=""/>
                    <div className="progressbar-tab-text" id={this.props.currentSection === "your-interests" ? "progressbar-current" : ""}>
                        Your Interests
                    </div>
                </div>
			</div>
    	)
  	}
}

export default ProgressBar;