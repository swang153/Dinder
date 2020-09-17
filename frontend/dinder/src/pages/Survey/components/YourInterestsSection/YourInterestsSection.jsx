import React, { Component } from "react";
import "../../Survey.css"

class YourInterestsSection extends Component {
  	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div id="survey-container">
				<div className="survey-field-group">
					<label htmlFor="profilePicture">I want to meet my pal for...</label>
					<div className="survey-row-thirds">
						<label className="survey-checkbox-container">
							<input type="checkbox" name="breakfast" checked={this.props.surveyState['breakfast']} onChange={e => this.props.handleUpdateField(e.target.name, e.target.checked)}/>
							<label for="breakfast">Breakfast</label>
							<span className="survey-checkmark"></span>
						</label>
						<label className="survey-checkbox-container">
							<input type="checkbox" name="lunch" checked={this.props.surveyState['lunch']} onChange={e => this.props.handleUpdateField(e.target.name, e.target.checked)}/>
							<label for="lunch">Lunch</label>
							<span className="survey-checkmark"></span>
						</label>
						<label className="survey-checkbox-container">
							<input type="checkbox" name="dinner" checked={this.props.surveyState['dinner']} onChange={e => this.props.handleUpdateField(e.target.name, e.target.checked)}/>
							<label for="dinner">Dinner</label>
							<span className="survey-checkmark"></span>
						</label>
					</div>
				</div>
				<div className="survey-row-halves">
					<div className="survey-field-half-group">
						<label htmlFor="diningHall">Favorite dining hall</label>
						<select className="survey-field-half survey-field-select" name="diningHall" value={this.props.surveyState['diningHall']} onChange={e => this.props.handleUpdateField(e.target.name, e.target.value)}>
							<option label=" " style={{display:"none"}} disabled selected></option>
							<option value="Andrews">Andrews</option>
							<option value="Blue Room">Blue Room</option>
							<option value="Ivy Room">Ivy Room</option>
							<option value="Jo's">Jo's</option>
							<option value="Ratty">Ratty</option>
							<option value="VDub">VDub</option>
						</select>
					</div>
					<div className="survey-field-half-group">
						<label htmlFor="thayer">Favorite place on Thayer</label>
						<select className="survey-field-half survey-field-select" name="thayer" value={this.props.surveyState['thayer']} onChange={e => this.props.handleUpdateField(e.target.name, e.target.value)}>
							<option label=" " style={{display:"none"}} disabled selected></option>
							<option value="Andreas">Andreas</option>
							<option value="Antonios Pizza">Antonio's Pizza</option>
							<option value="Baja's Tex Mex Grill">Baja's Tex Mex Grill</option>
							<option value="by Chloe.">by Chloe.</option>
							<option value="Caleinte Mexican Grill">Caleinte Mexican Grill</option>
							<option value="Chinatown">Chinatown</option>
							<option value="Chipotle">Chipotle</option>
							<option value="Den Den Fried Chicken">Den Den Fried Chicken</option>
							<option value="Durk's Bar-B-Q">Durk's Bar-B-Q</option>
							<option value="East Side Pockets">East Side Pockets</option>
							<option value="Flatbread Company">Flatbread Company</option>
							<option value="Ganko Ittetsu Ramen">Ganko Ittetsu Ramen</option>
							<option value="Heng Thai & Rotisserie">Heng Thai & Rotisserie</option>
							<option value="Kabob and Curry">Kabob and Curry</option>
							<option value="Meeting Street Cafe">Meeting Street Cafe</option>
							<option value="Mikes Calzones">Mike's Calzones</option>
							<option value="Pokeworks">Pokeworks</option>
							<option value="Shake Shack">Shake Shack</option>
							<option value="Shaking Crab">Shaking Crab</option>
							<option value="Soban">Soban</option>
							<option value="Subway">Subway</option>
							<option value="Sushi Xpress">Sushi Xpress</option>
							<option value="Wongs Kitchen">Wong's Kitchen</option>
						</select>
					</div>
				</div>
				<div className="survey-row-halves">
					<div className="survey-field-half-group">
						<label htmlFor="pineapple">Pineapple on pizza?</label>
						<select className="survey-field-half survey-field-select" name="pineapple" value={this.props.surveyState['pineapple']} onChange={e => this.props.handleUpdateField(e.target.name, e.target.value)}>
							<option label=" " style={{display:"none"}} disabled selected></option>
							<option value="yes">#TeamPineapple!</option>
							<option value="no">What's wrong with you</option>
						</select>
					</div>
					<div className="survey-field-half-group">
						<label htmlFor="eggs">How do you like your eggs?</label>
						<select className="survey-field-half survey-field-select" name="eggs" value={this.props.surveyState['eggs']} onChange={e => this.props.handleUpdateField(e.target.name, e.target.value)}>
							<option label=" " style={{display:"none"}} disabled selected></option>
							<option value="hard boiled">Hard boiled</option>
							<option value="scrambled">Scrambled</option>
							<option value="quiche">Quiche</option>
							<option value="over easy">Over easy</option>
							<option value="sunny side up">Sunny side up</option>
							<option value="poached">Poached</option>
						</select>
					</div>
				</div>
				<div className="survey-row-halves">
                   <div className="survey-field-half-group">
                       <label htmlFor="coffee">Coffee style?</label>
                       <select className="survey-field-half survey-field-select" name="coffee" value={this.props.surveyState['coffee']} onChange={e => this.props.handleUpdateField(e.target.name, e.target.value)}>
                           <option label=" " style={{display:"none"}} disabled selected></option>
                           <option value="black">Black</option>
                           <option value="frappuccino">Frappuccino</option>
                           <option value="pumpkin spiced latte">Pumpkin Spiced Latte</option>
                           <option value="iced">Iced</option>
                           <option value="cappuccino">Cappuccino</option>
                           <option value="tea/no coffee">Tea/no coffee</option>
                       </select>
                   </div>
                   <div className="survey-field-half-group">
                       <label htmlFor="takeout">Favorite takeout?</label>
                       <select className="survey-field-half survey-field-select" name="takeout" value={this.props.surveyState['takeout']} onChange={e => this.props.handleUpdateField(e.target.name, e.target.value)}>
                           <option label=" " style={{display:"none"}} disabled selected></option>
                           <option value="Sushi">Sushi</option>
                           <option value="Pizza">Pizza</option>
                           <option value="Lo mein">Lo mein</option>
                           <option value="Saag paneer">Saag paneer</option>
                           <option value="Penne alla vodka">Penne alla vodka</option>
                           <option value="Quesadilla">Quesadilla</option>
                       </select>
                   </div>
               </div>
				<div className="survey-field-group" style={{marginBottom: "0px"}}>
					<label htmlFor="introMessage">Intro Message <span>// Say Hi to your pal! (max. 50 chars)</span></label>
					<input type="text" name="introMessage" className="survey-field" value={this.props.surveyState['introMessage']} placeholder="Looking for a dessert fanatic!" onChange={e => this.props.handleUpdateField(e.target.name, e.target.value)}/>
				</div>
				<div style={{width: "100%"}}>
					<div className="error-message">
						{this.props.surveyState['errorMessages']}
					</div>
					<div className="survey-button-row">
						<button className="survey-prev-button" onClick={this.props.handlePrev}>Previous</button>
						<button className="survey-next-button" id={this.props.completedYourInterestSection() ? "" : "disabled"} disabled={!this.props.completedYourInterestSection()} onClick={this.props.handleSubmitSurvey}>Submit</button>
					</div>
				</div>
			</div>
		)
	}
}

export default YourInterestsSection;