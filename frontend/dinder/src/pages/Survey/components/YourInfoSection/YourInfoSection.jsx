import React, { Component } from "react";
import "../../Survey.css"

class YourInfoSection extends Component {
  	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div id="survey-container">
				<div className="survey-field-group">
					<label htmlFor="profilePicture">Profile Picture <span>// Please upload a square image under 150 KB!</span></label>
					<div className="survey-upload-container">
						<div className="survey-upload-wrapper">
							<button className="survey-upload-button">Upload</button>
							<input type="file" accept="image/*" name="profilePicture" onChange={e => this.props.handleUpdateField(e.target.name, e.target.files[0])}/>
						</div>
						<img id="survey-image-preview" src={this.props.surveyState['profilePicture']}/>
					</div>
				</div>
				<div className="survey-row-halves">
					<div className="survey-field-half-group">
						<label htmlFor="gradYear">Grad Year</label>
						<select className="survey-field-half survey-field-select" name="gradYear" value={this.props.surveyState['gradYear']} onChange={e => this.props.handleUpdateField(e.target.name, e.target.value)}>
							<option label=" " style={{display:"none"}} disabled selected></option>
							<option value="2020">2020</option>
							<option value="2021">2021</option>
							<option value="2022">2022</option>
							<option value="2023">2023</option>
						</select>
					</div>
					<div className="survey-field-half-group">
						<label htmlFor="gender">Gender</label>
						<select className="survey-field-half survey-field-select" name="gender" value={this.props.surveyState['gender']} onChange={e => this.props.handleUpdateField(e.target.name, e.target.value)}>
							<option label=" " style={{display:"none"}} disabled selected></option>
							<option value="Female">Female</option>
							<option value="Male">Male</option>
							<option value="Non-binary">Non-binary</option>
						</select>
					</div>
				</div>
				<div className="survey-row-halves">
				<div className="survey-field-half-group">
					<label htmlFor="concentration">Concentration</label>
					<select className="survey-field survey-field-select" name="concentration" value={this.props.surveyState['concentration']} onChange={e => this.props.handleUpdateField(e.target.name, e.target.value)}>
						<option label=" " style={{display:"none"}} disabled selected></option>
						<option value="Africana Studies">Africana Studies</option>
						<option value="American Studies">American Studies</option>
						<option value="Anthropology">Anthropology</option>
						<option value="Applied Mathematics">Applied Mathematics</option>
						<option value="Applied Mathematics-Biology">Applied Mathematics-Biology</option>
						<option value="Applied Mathematics-Computer Science">Applied Mathematics-Computer Science</option>
						<option value="Applied Mathematics-Economics">Applied Mathematics-Economics</option>
						<option value="Archaeology and the Ancient World">Archaeology and the Ancient World</option>
						<option value="Architecture">Architecture</option>
						<option value="Astronomy">Astronomy</option>
						<option value="Behavioral Decision Sciences">Behavioral Decision Sciences</option>
						<option value="Biochemistry & Molecular Biology">Biochemistry & Molecular Biology</option>
						<option value="Biology">Biology</option>
						<option value="Biomedical Engineering">Biomedical Engineering</option>
						<option value="Biophysics">Biophysics</option>
						<option value="Business, Entrepreneurship and Organizations">Business, Entrepreneurship and Organizations</option>
						<option value="Chemical Physics">Chemical Physics</option>
						<option value="Chemistry">Chemistry</option>
						<option value="Classics">Classics</option>
						<option value="Cognitive Neuroscience">Cognitive Neuroscience</option>
						<option value="Cognitive Science">Cognitive Science</option>
						<option value="Comparative Literature">Comparative Literature</option>
						<option value="Computational Biology">Computational Biology</option>
						<option value="Computer Science">Computer Science</option>
						<option value="Computer Science-Economics">Computer Science-Economics</option>
						<option value="Contemplative Studies">Contemplative Studies</option>
						<option value="Development Studies">Development Studies</option>
						<option value="Early Modern World">Early Modern World</option>
						<option value="East Asian Studies">East Asian Studies</option>
						<option value="Economics">Economics</option>
						<option value="Education Studies">Education Studies</option>
						<option value="Egyptology and Assyriology">Egyptology and Assyriology</option>
						<option value="Engineering">Engineering</option>
						<option value="Engineering and Physics">Engineering and Physics</option>
						<option value="English">English</option>
						<option value="Environmental Studies">Environmental Studies</option>
						<option value="Ethnic Studies">Ethnic Studies</option>
						<option value="French and Francophone Studies">French and Francophone Studies</option>
						<option value="Gender and Sexuality Studies">Gender and Sexuality Studies</option>
						<option value="Geological Sciences">Geological Sciences</option>
						<option value="Geology-Biology">Geology-Biology</option>
						<option value="Geology-Chemistry">Geology-Chemistry</option>
						<option value="Geology-Physics/Mathematics">Geology-Physics/Mathematics</option>
						<option value="German Studies">German Studies</option>
						<option value="Health & Human Biology">Health & Human Biology</option>
						<option value="Hispanic Literatures and Culture">Hispanic Literatures and Culture</option>
						<option value="History">History</option>
						<option value="History of Art and Architecture">History of Art and Architecture</option>
						<option value="Independent Concentration">Independent Concentration</option>
						<option value="International and Public Affairs">International and Public Affairs</option>
						<option value="International Relations">International Relations</option>
						<option value="Italian Studies">Italian Studies</option>
						<option value="Judaic Studies">Judaic Studies</option>
						<option value="Latin American and Caribbean Studies">Latin American and Caribbean Studies</option>
						<option value="Linguistics">Linguistics</option>
						<option value="Literary Arts">Literary Arts</option>
						<option value="Mathematics">Mathematics</option>
						<option value="Mathematics-Computer Science">Mathematics-Computer Science</option>
						<option value="Mathematics-Economics">Mathematics-Economics</option>
						<option value="Medieval Cultures">Medieval Cultures</option>
						<option value="Middle East Studies">Middle East Studies</option>
						<option value="Modern Culture and Media">Modern Culture and Media</option>
						<option value="Music">Music</option>
						<option value="Neuroscience">Neuroscience</option>
						<option value="Philosophy">Philosophy</option>
						<option value="Physics">Physics</option>
						<option value="Physics and Philosophy">Physics and Philosophy</option>
						<option value="Political Science">Political Science</option>
						<option value="Portuguese and Brazilian Studies">Portuguese and Brazilian Studies</option>
						<option value="Psychology">Psychology</option>
						<option value="Public Health">Public Health</option>
						<option value="Public Policy">Public Policy</option>
						<option value="Religious Studies">Religious Studies</option>
						<option value="Science, Technology, and Society">Science, Technology, and Society</option>
						<option value="Slavic Studies">Slavic Studies</option>
						<option value="Social Analysis and Research">Social Analysis and Research</option>
						<option value="Sociology">Sociology</option>
						<option value="South Asian Studies">South Asian Studies</option>
						<option value="Statistics">Statistics</option>
						<option value="Theatre Arts and Performance Studies">Theatre Arts and Performance Studies</option>
						<option value="Urban Studies">Urban Studies</option>
						<option value="Visual Art">Visual Art</option>
					</select>
				</div>
				<div className="survey-field-half-group">
               <label htmlFor="vegetarian">Vegetarian?</label>
                   <select className="survey-field survey-field-select" name="vegetarian" value={this.props.surveyState['vegetarian']} onChange={e => this.props.handleUpdateField(e.target.name, e.target.value)}>
                       <option label=" " style={{display:"none"}} disabled selected></option>
                       <option value="yes">Yes, I prefer vegetarian pals</option>
                       <option value="no">Not vegetarian/does not matter</option>
                       </select>  
               </div>
			   </div>
				<div className="survey-field-group" style={{marginBottom: "0px"}}>
					<label htmlFor="classes">Current Classes</label>
					<input type="text" name="classes" className="survey-field" value={this.props.surveyState['classes']} placeholder="ex: CSCI 0320, ENGL 0930, VISA 0100, LITR 0110B" onChange={e => this.props.handleUpdateField(e.target.name, e.target.value)}/>
				</div>
				<div style={{width: "100%"}}>
					<div className="error-message">
						{this.props.surveyState['errorMessages']}
					</div>
					<div className="survey-button-row">
						<button className="survey-prev-button" onClick={this.props.handlePrev}>Previous</button>
						<button className="survey-next-button" id={this.props.completedYourInfoSection() ? "" : "disabled"} disabled={!this.props.completedYourInfoSection()} onClick={this.props.handleContinueToYourInterest}>Next</button>
					</div>
				</div>
			</div>
		)
	}
}

export default YourInfoSection;