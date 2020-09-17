import React, { Component } from "react";
import "../../Survey.css"

class AccountSection extends Component {
  	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div id="survey-container">
				<div className="survey-row-halves">
					<div className="survey-field-half-group">
						<label htmlFor="firstName">First Name</label>
						<input type="text" name="firstName" className="survey-field-half" value={this.props.surveyState['firstName']} onChange={e => this.props.handleUpdateField(e.target.name, e.target.value)}/>
					</div>
					<div className="survey-field-half-group">
						<label htmlFor="lastName">Last Name</label>
						<input type="text" name="lastName" className="survey-field-half" value={this.props.surveyState['lastName']} onChange={e => this.props.handleUpdateField(e.target.name, e.target.value)}/>
					</div>
				</div>
				<div className="survey-field-group">
					<label htmlFor="email">Email</label>
					<input type="text" name="email" className="survey-field" id={this.props.registering ? "" : "disabled-text"} disabled={!this.props.registering} value={this.props.surveyState['email']} onChange={e => this.props.handleUpdateField(e.target.name, e.target.value)}/>
				</div>
				<div className="survey-field-group">
					<label htmlFor="password">Password</label>
					<input type="password" name="password" className="survey-field" value={this.props.surveyState['password']} onChange={e => this.props.handleUpdateField(e.target.name, e.target.value)}/>
				</div>
				<div className="survey-field-group" style={{marginBottom: "0px"}}>
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input type="password" name="confirmPassword" className="survey-field" value={this.props.surveyState['confirmPassword']} onChange={e => this.props.handleUpdateField(e.target.name, e.target.value)}/>
				</div>
				<div style={{width: "100%"}}>
					<div className="error-message">
						{this.props.surveyState['errorMessages']}
					</div>
					<div className="survey-button-row">
						<button className="survey-next-button" id={this.props.completedAccountSection() ? "" : "disabled"} disabled={!this.props.completedAccountSection()} onClick={this.props.handleContinueToYourInfo}>Next</button>
					</div>
				</div>
			</div>
		)
	}
}

export default AccountSection;