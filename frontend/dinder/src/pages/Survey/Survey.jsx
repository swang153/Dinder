import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import base64 from 'base64-js'
import "./Survey.css"
import ProgressBar from "./components/ProgressBar/ProgressBar";
import AccountSection from "./components/AccountSection/AccountSection";
import YourInfoSection from "./components/YourInfoSection/YourInfoSection";
import YourInterestsSection from "./components/YourInterestsSection/YourInterestsSection"

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
		currentSection: this.props.startingSection === undefined ? "account" : this.props.startingSection,
		errorMessages: "",
		successSubmitting: false, // true if server is active and email is unique

		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		accountSectionError: [],

		profilePicture: "",
		rawProfilePicture: null, // for checking file size and type
		gradYear: "",
		gender: "",
		concentration: "",
		vegetarian: "",
		classes: "",
		yourInfoError: [],

		breakfast: false,
		lunch: false,
		dinner: false,
		diningHall: "",
		thayer: "",
		pineapple: "",
		eggs: "",
		coffee: "",
		takeout: "",
		introMessage: "",
		yourInterestError: []
    };
  }
	  
  	componentDidMount = () => {
		  if (!this.props.registering) {
			  this.setState({
				firstName: this.props.user.firstName,
				lastName: this.props.user.lastName,
				email: this.props.user.email,
				password: this.props.user.password,
				confirmPassword: this.props.user.password,
		
				profilePicture: this.props.user.profilePicture,
				gradYear: this.props.user.gradYear,
				gender: this.props.user.gender,
				concentration: this.props.user.concentration,
				vegetarian: this.props.user.vegetarian,
				classes: this.props.user.classes,
		
				breakfast: this.props.user.breakfast,
				lunch: this.props.user.lunch,
				dinner: this.props.user.dinner,
				diningHall: this.props.user.diningHall,
				thayer: this.props.user.thayer,
				pineapple: this.props.user.pineapple,
				eggs: this.props.user.eggs,
				coffee: this.props.user.coffee,
				takeout: this.props.user.takeout,
				introMessage: this.props.user.introMessage,
			  })
		  }
	  }

	handleUpdateField = (field, value) => {
		if (field === "profilePicture") {
			this.setState({
				profilePicture : URL.createObjectURL(value),
				rawProfilePicture : value
			})
		} else {
			this.setState({
				[field] : value
			})
		}
	}

	handlePrev = () => {
		this.setState({
			errorMessages: ""
		})
		switch(this.state.currentSection) {
			case "your-information":
				this.setState({
					currentSection : "account"
				})
				break;
			case "your-interests":
				this.setState({
					currentSection : "your-information"
				})
				break;
			default:
				this.setState({
					currentSection : "account"
				})
		}
	}
	
	completedAccountSection = () => {
		return this.state.firstName !== "" && this.state.lastName !== "" &&
						this.state.email !== "" && this.state.password !== "" && this.state.confirmPassword !== ""
	}

	checkValidNames = () => {
		if ((/\d/.test(this.state.firstName) || /\d/.test(this.state.lastName)) &&
					!this.state.accountSectionError.includes("Invalid name! ")) {
			this.state.accountSectionError.push("Invalid name! ");
		}
	}

	checkValidEmail = () => {
		// Regex source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
		let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!regex.test(this.state.email.toLowerCase()) &&
					!this.state.accountSectionError.includes("Invalid email! ")) {
			this.state.accountSectionError.push("Invalid email! ");
		}
	}

	checkPasswordsMatch = () => {
		if ((this.state.password !== this.state.confirmPassword) &&
					!this.state.accountSectionError.includes("Passwords do not match! ")) {
			this.state.accountSectionError.push("Passwords do not match! ");
		}
	}

	handleContinueToYourInfo = (event) => {
		event.preventDefault();
		this.setState({
			accountSectionError : []
		}, () => {
			this.checkValidNames();
			this.checkValidEmail();
			this.checkPasswordsMatch();
		})

		// Wait until error message is correctly set
		setTimeout(() => {
			if (this.state.accountSectionError.length === 0) {
				this.setState({
					errorMessages : ""
				},
					this.setState({
						currentSection:"your-information"
					})
				)
			} else { // else, can't continue
				this.setState({
					errorMessages :
						this.state.accountSectionError.map((message) => {
							return message
						})
				})
			}
		}, 1);
	}

	completedYourInfoSection = () => {
		return this.state.gradYear !== "" && this.state.gender !== "" &&
					this.state.concentration !== "" && this.state.classes !== ""
	}

	checkProfilePicture = () => {
		if (this.state.rawProfilePicture !== null) {
			if (this.state.rawProfilePicture.size > 150000 &&
					!this.state.yourInfoError.includes("Please limit the size of your file to under 150 KB. ")) {
				this.state.yourInfoError.push("Please limit the size of your file to under 150 KB. ")
			} else if (!this.state.rawProfilePicture.type.match(/.(jpg|jpeg|png|gif)$/i) &&
							!this.state.yourInfoError.includes("Please upload an image file (.jpg, .jpeg, .png, .gif)! ")) {
				this.state.yourInfoError.push("Please upload an image file (.jpg, .jpeg, .png, .gif)! ")
			}
		}
	}

	checkClasses = () => {
		if (this.state.classes.split(", ").length !== 4 &&
					!this.state.yourInfoError.includes("Please list 4 courses in the correct format (CSCI 0320, ENGL 0930, VISA 0100, LITR 0110B)! ")) {
			this.state.yourInfoError.push("Please list 4 courses in the correct format (CSCI 0320, ENGL 0930, VISA 0100, LITR 0110B)! ");
		}
	}

	handleContinueToYourInterest = (event) => {
		event.preventDefault();
		this.setState({
			yourInfoError : []
		}, () => {
			this.checkProfilePicture();
			this.checkClasses();
		})

		// Wait until error message is correctly set
		setTimeout(() => {
			if (this.state.yourInfoError.length === 0) {
				this.setState({
					errorMessages : ""
				},
					this.setState({
						currentSection:"your-interests"
					})
				)
			} else { // else, can't continue
				this.setState({
					errorMessages :
						this.state.yourInfoError.map((message) => {
							return message
						})
				})
			}
		}, 1);
	}

	completedYourInterestSection = () => {
		return this.state.diningHall !== "" && this.state.thayer !== "" &&
					this.state.pineapple !== "" && this.state.eggs !== "" &&
						this.state.coffee !== "" && this.state.takeout !== "" &&
							this.state.introMessage !== ""
	}

	checkBreakfastLunchDinner = () => {
		if (!(this.state.breakfast || this.state.lunch || this.state.dinner) &&
					!this.state.yourInterestError.includes("You must be available for at least one meal! ")) {
			this.state.yourInterestError.push("You must be available for at least one meal! ");
		}
	}

	checkIntroMessage = () => {
		if ((this.state.introMessage.length > 50) &&
					!this.state.yourInterestError.includes("Please limit your intro message to under 50 characters. ")) {
			this.state.yourInterestError.push("Please limit your intro message to under 50 characters. ");
		}
	}

	handleSubmitData = async() => {
		if (this.state.rawProfilePicture === null) {
			const surveyData = new URLSearchParams();
			surveyData.append("firstName", this.state.firstName);
			surveyData.append("lastName", this.state.lastName);
			surveyData.append("email", this.state.email);
			surveyData.append("password", this.state.password);
			surveyData.append("profilePicture", this.state.profilePicture);
			surveyData.append("gradYear", this.state.gradYear);
			surveyData.append("gender", this.state.gender);
			surveyData.append("concentration", this.state.concentration);
			surveyData.append("vegetarian", this.state.vegetarian);
			surveyData.append("classes", this.state.classes);
	
			surveyData.append("breakfast", this.state.breakfast ? "yes" : "no");
			surveyData.append("lunch", this.state.lunch ? "yes" : "no");
			surveyData.append("dinner", this.state.dinner ? "yes" : "no");
			surveyData.append("diningHall", this.state.diningHall);
			surveyData.append("thayer", this.state.thayer);
			surveyData.append("pineapple", this.state.pineapple);
			surveyData.append("eggs", this.state.eggs);
			surveyData.append("coffee", this.state.coffee);
			surveyData.append("takeout", this.state.takeout);
			surveyData.append("introMessage", this.state.introMessage);
	
			const url = "http://localhost:4567/survey";
			const response = await fetch(url, {
			  method: this.props.registering ? "post" : "put",
			  body: surveyData
			});
		
			switch (response.status) {
			  case 200:
				this.setState({
				  successSubmitting: true
				})
				const data = await response.json();
				this.props.setUser(data);
				break;
			  case 400:
				alert("A user already exists with that email.");
				break;
			  default:
				alert("Server is busy, please try again later.");
				break;
			}
		} else {
			let reader = new FileReader();
			reader.readAsDataURL(this.state.rawProfilePicture);
			reader.onloadend = async() => {
				const surveyData = new URLSearchParams();
				surveyData.append("firstName", this.state.firstName);
				surveyData.append("lastName", this.state.lastName);
				surveyData.append("email", this.state.email);
				surveyData.append("password", this.state.password);
				surveyData.append("profilePicture", reader.result);
				surveyData.append("gradYear", this.state.gradYear);
				surveyData.append("gender", this.state.gender);
				surveyData.append("concentration", this.state.concentration);
				surveyData.append("vegetarian", this.state.vegetarian);
				surveyData.append("classes", this.state.classes);
		
				surveyData.append("breakfast", this.state.breakfast ? "yes" : "no");
				surveyData.append("lunch", this.state.lunch ? "yes" : "no");
				surveyData.append("dinner", this.state.dinner ? "yes" : "no");
				surveyData.append("diningHall", this.state.diningHall);
				surveyData.append("thayer", this.state.thayer);
				surveyData.append("pineapple", this.state.pineapple);
				surveyData.append("eggs", this.state.eggs);
				surveyData.append("coffee", this.state.coffee);
				surveyData.append("takeout", this.state.takeout);
				surveyData.append("introMessage", this.state.introMessage);
		
				const url = "http://localhost:4567/survey";
				const response = await fetch(url, {
				  method: this.props.registering ? "post" : "put",
				  body: surveyData
				});
			
				switch (response.status) {
				  case 200:
					this.setState({
					  successSubmitting: true
					})
					const data = await response.json();
					this.props.setUser(data);
					break;
				  case 400:
					  alert("A user already exists with that email.");
					  break;
				  default:
					alert("Server is busy, please try again later.");
					break;
				}
			};
		}
	}

	handleSubmitSurvey = (event) => {
		event.preventDefault();
		this.setState({
			yourInterestError : []
		}, () => {
			this.checkBreakfastLunchDinner();
			this.checkIntroMessage();
		})

		// Wait until error message is correctly set
		setTimeout(() => {
			if (this.state.yourInterestError.length === 0) {
				if (this.state.accountSectionError.length + this.state.yourInfoError.length + this.state.yourInterestError.length === 0) {
					this.setState({
						errorMessages : ""
					}, () => {
							this.handleSubmitData();
							if (this.state.successSubmitting) {
								this.props.registering ? this.props.history.push("/pals") : this.props.history.push("/settings")
							}
						}
					)
				} else { // current section is clean but prev sections were corrupted
					this.setState({
						errorMessages : "There are still errors in previous sections, please fix them before continuing."
					})
				}
			} else {// else, can't continue
				this.setState({
					errorMessages :
						this.state.yourInterestError.map((message) => {
							return message
						})
				})
			}
		}, 1);
	}

	render() {
		let currentSection;
		switch(this.state.currentSection) {
			case "account":
				currentSection =
					<AccountSection
						surveyState={this.state}
						handleUpdateField={this.handleUpdateField.bind(this)}
						completedAccountSection={this.completedAccountSection.bind(this)}
						handleContinueToYourInfo={this.handleContinueToYourInfo.bind(this)}
						registering={this.props.registering}
					/>
				break;
			case "your-information":
				currentSection =
					<YourInfoSection
						surveyState={this.state}
						handleUpdateField={this.handleUpdateField.bind(this)}
						completedYourInfoSection={this.completedYourInfoSection.bind(this)}
						handlePrev={this.handlePrev.bind(this)}
						handleContinueToYourInterest={this.handleContinueToYourInterest.bind(this)}
					/>
				break;
			case "your-interests":
				currentSection =
					<YourInterestsSection
						surveyState={this.state}
						handleUpdateField={this.handleUpdateField.bind(this)}
						completedYourInterestSection={this.completedYourInterestSection.bind(this)}
						handlePrev={this.handlePrev.bind(this)}
						handleSubmitSurvey={this.handleSubmitSurvey.bind(this)}
					/>
				break;
			default:
				currentSection =
					<AccountSection
						surveyState={this.state}
						handleUpdateField={this.handleUpdateField.bind(this)}
						completedAccountSection={this.completedAccountSection.bind(this)}
						handleContinueToYourInfo={this.handleContinueToYourInfo.bind(this)}
					/>
		}

		return (
			<div className="page-container">
				<ProgressBar currentSection={this.state.currentSection}/>
				{currentSection}
			</div>
		)
	}
}

export default withRouter(Survey);