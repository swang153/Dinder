import React, { Component } from "react";
import {withRouter} from "react-router";
import {Button, Navbar, NavDropdown, Card} from "react-bootstrap";
import edit from "../../assets/images/edit.svg"
import "./Settings.css";
 
class Settings extends Component {
   constructor(props) {
     super(props);
   }
 
   showAvailableTime() {
     let meals = [this.props.user.breakfast, this.props.user.lunch, this.props.user.dinner];
     let text = "";
     let newText = "";
     if (meals[0] === true) {
       text += "Breakfast";
     }
     if (meals[1] === true) {
       text += ", Lunch";
     }
     if (meals[2] === true) {
       text += ", Dinner";
     }
     newText = text;
     if (text.startsWith(",")) {
       newText = text.replace(", ", "");
     }
     return (<div className="info-row"><span-l>Available Meal Times</span-l><span-r>{newText}</span-r></div>)
   }
 
   goToSurvey = (e, link) => {
     e.preventDefault();
     this.props.history.push(link);
   }
 
   render() {
     return(
       <div className="background">
         <div className="two-col-container">
           <div className="one-col-container">
             <div className="setting-title">Your Settings</div><br/>
               <div className="profile-img">
                 <img className="picture" src={this.props.user.profilePicture}/>
               </div>
             <div className="white-box small">
             <div className="info-row"><b>Account</b></div>
               <div className="info-row"><span-l>Email</span-l><span-r>{this.props.user.email}</span-r></div>
               <div className="info-row"><span-l>Password</span-l><span-r>**********</span-r></div>
               <div className="grey-line"></div>
                <a href="/" className="red-link">Log Out ></a>
             </div>
           </div>
           <div className="one-col-container">
             <div className="white-box big">
               <div className="info-row"><span-l>Name</span-l><span-r>{this.props.user.firstName} {this.props.user.lastName}</span-r></div>
               <div className="info-row"><span-l>Grad Year</span-l><span-r>{this.props.user.gradYear}</span-r></div>
               <div className="info-row"><span-l>Gender</span-l><span-r>{this.props.user.gender}</span-r></div>
               <div className="info-row"><span-l>Concentration</span-l><span-r>{this.props.user.concentration}</span-r></div>
               <div className="info-row"><span-l>Classes</span-l><span-r>{this.props.user.classes}</span-r></div>
               <div className="info-row"><span-l>Dietary Preferences</span-l><span-r>{this.props.user.vegetarian === "yes" ? "Vegetarian" : "None"}</span-r></div>
               {this.showAvailableTime()}
               <div className="info-row"><span-l>Favorite Dining Hall</span-l><span-r>{this.props.user.diningHall}</span-r></div>
               <div className="info-row"><span-l>Favorite Place on Thayer</span-l><span-r>{this.props.user.thayer}</span-r></div>
               <div className="info-row"><span-l>Pineapple on pizza?</span-l><span-r style={{textTransform: 'capitalize'}}>{this.props.user.pineapple}</span-r></div>
               <div className="info-row"><span-l>How do you like your eggs?</span-l><span-r style={{textTransform: 'capitalize'}}>{this.props.user.eggs}</span-r></div>
               <div className="info-row"><span-l>Coffee style?</span-l><span-r style={{textTransform: 'capitalize'}}>{this.props.user.coffee}</span-r></div>
               <div className="info-row"><span-l>Favorite takout?</span-l><span-r>{this.props.user.takeout}</span-r></div>
               <div className="info-row"><span-l>Intro Message</span-l><span-r>{this.props.user.introMessage}</span-r></div>
             </div>
             <Button onClick={(e) => this.goToSurvey(e, "/update")} bsPrefix="button-rect"><img className="bottom-icon" src={edit} alt="Edit Icon"/>Edit Your Account or Profile</Button>
           </div>
         </div>
       </div>
     );
   }
}
 
export default withRouter(Settings);