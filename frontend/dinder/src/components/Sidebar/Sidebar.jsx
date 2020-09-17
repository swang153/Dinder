import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import "./Sidebar.css"
import paw from "../../assets/images/paw.svg"
import chatBubble from "../../assets/images/chatbubble.svg"
import gear from "../../assets/images/gear.svg"

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handlePageChange = (targetPage) => {
    switch(targetPage) {
			case "pals":
				this.props.history.push('/pals');
				break;
			case "settings":
				this.props.history.push('/settings');
				break;
			default:
				this.props.history.push('/pals');
		}
  }

  render() {
    return (
      <div id="sidebar-container">
        <div id="sidebar-title">
          Dinder
        </div>
        <div className="tab-wrapper" onClick={() => this.handlePageChange("pals")}>
          <img className="tab-icon" src={paw} alt=""></img>
          <div className="tab-desc" id={this.props.currentPage === "pals" ? "tab-current" : ""}>
            Potential Pals
          </div>
        </div>
        {/* <div className="tab-wrapper" onClick={() => this.handlePageChange("messages")}>
          <img className="tab-icon" src={chatBubble} alt=""></img>
          <div className="tab-desc" id={this.state.currentPage === "messages" ? "tab-current" : ""}>
            Messages
          </div>
        </div> */}
        <div className="tab-wrapper" onClick={() => this.handlePageChange("settings")}>
          <img className="tab-icon" src={gear} alt=""></img>
          <div className="tab-desc" id={this.props.currentPage === "settings" ? "tab-current" : ""}>
            Settings
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Sidebar);