import React, { Component } from "react";
import "./WelcomePane.css"
import pawL from "../../../assets/images/largepawL.svg"
import pawR from "../../../assets/images/largepawR.svg"

class WelcomePane extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

	render() {
		return(
			<div id="welcomepane-container">
				<div id="welcomepane-right-paw-container">
					<img src={pawR} alt=""/>
				</div>
				<div id="welcomepane-desc">
					<p>Meet 3 pals everyday!</p>
					<p>Chat with them and grab a meal at your favorite dining place.</p>
					<p>The Algorithm™ matches you to your pals based on common interests or classes.</p>
					<p>Get started today!</p>
				</div>
				<div id="welcomepane-left-paw-container">
					<img src={pawL} alt=""/>
				</div>
			</div>
    )
  }
}

export default WelcomePane;