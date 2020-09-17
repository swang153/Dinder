import React, { Component } from "react";
import {withRouter} from "react-router";
import "./MainPage.css";
import Pal from "./components/Pal";
import bear from "../../assets/images/bear.svg"
import fish from "../../assets/images/fish.svg"


class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  palCards() {
    // Map each dictionary in to the stylized cards defined in Pal
    const items = this.props.user.pals.map(pal => {
      return <Pal
        key={pal.email}
        firstName={pal.firstName}
        email={pal.email}
        gradYear={pal.gradYear}
        concentration={pal.concentration}
        gender={pal.gender}
        classes={pal.classes}
        vegetarian={pal.vegetarian}

        breakfast={pal.breakfast}
        lunch={pal.lunch}
        dinner={pal.dinner}

        favDining={pal.diningHall}
        favRestaurant={pal.thayer}
        introMessage={pal.introMessage}
        profilePicture={pal.profilePicture} />
    });
    return items;
  }

  fetchPals = async () => {
    const url = "http://localhost:4567/pals/" + this.props.user.email;
    const response = await fetch(url, {
      method: "get",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json",
      }
    });

    switch (response.status) {
      case 200:
        const data = await response.json();
        let pal1 = data[0];
        let pal2 = data[1];
        let pal3 = data[2];
        const palList = [pal1, pal2, pal3]
        this.props.setPals(palList);
        break;
      default:
        alert("Session has timed out, please log in again.")
        this.props.clearUser();
        this.props.history.push("/");
        break;
    }
  }

  componentDidMount = () => {
    this.fetchPals();
  }

  render() {
    return (
      <div className="background">
        <div className="top-container">
          <div className="top-column-left">
            <div className="subtitle">Hi {this.props.user.firstName}!</div>
            <div className="title">Your Pals Today</div>
          </div>
          {/* <div className="top-column-right">
            <div className="top-row">
              <div className="top-column-icon">
                <img className="top-icon" src={bear} alt="Bear Icon"></img>
                <div className="caption"><span>32</span> <br /> Pals</div>
              </div>
              <div className="top-column-icon">
                <img className="top-icon" src={fish} alt="Fish Icon"></img>
                <div className="caption"><span>15</span> <br /> Meals</div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="person-list">
          {this.palCards()}
        </div>
      </div>
    );
  }
}

export default withRouter(MainPage);