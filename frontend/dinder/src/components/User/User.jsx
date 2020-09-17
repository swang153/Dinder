import React, { Component } from "react";
import cub from "../../assets/images/cub_gray.jpg"

export const MyContext = React.createContext();

export class MyProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",

      firstName: "",
      lastName: "",

      profilePicture: "",

      gradYear: "",
      gender: "",
      concentration: "",
      vegetarian: false,
      classes: "",

      breakfast: false,
      lunch: false,
      dinner: false,
      diningHall: "",
      thayer: "",
      pineapple: null,
      eggs: "",
      coffee: "",
      takeout: "",
      introMessage: "",

      pals: []
    };
  }

  /**
   * Sets user data on log in/sign up (excluding pals)
   */
  setUser = (json) => {
    this.setState({
      email: json["email"],
      password: json["password"],

      firstName: json["firstName"],
      lastName: json["lastName"],

      profilePicture: json["profilePicture"] === undefined || json["profilePicture"] === "" || json["profilePicture"] === "null" || json["profilePicture"].includes("blob:http://localhost:3000/") ? cub : json["profilePicture"],

      gradYear: json["gradYear"],
      gender: json["gender"],
      concentration: json["concentration"],
      vegetarian: json['vegetarian'],
      classes: json["classes"],

      breakfast: json["breakfast"] === "yes",
      lunch: json["lunch"] === "yes",
      dinner: json["dinner"] === "yes",
      diningHall: json["diningHall"],
      thayer: json["thayer"],
      pineapple: json["pineapple"],
      eggs: json["eggs"],
      coffee: json["coffee"],
      takeout: json["takeout"],
      introMessage: json["introMessage"],
    })
  }

  /**
   * Sets user's pals.
   */
  setPals = (jsonList) => {
    var palList = [];
    jsonList.forEach(json => {
      palList.push({
        email: json["email"],
  
        firstName: json["firstName"],
        lastName: json["lastName"],
  
        profilePicture: json["profilePicture"] === undefined || json["profilePicture"] === "" || json["profilePicture"] === "null" || json["profilePicture"].includes("blob:http://localhost:3000/") ? cub : json["profilePicture"],

        gradYear: json["gradYear"],
        gender: json["gender"],
        concentration: json["concentration"],
        vegetarian: json['vegetarian'],
        classes: json["classes"],
  
        breakfast: json["breakfast"] === "yes",
        lunch: json["lunch"] === "yes",
        dinner: json["dinner"] === "yes",
        diningHall: json["diningHall"],
        thayer: json["thayer"],
        pineapple: json["pineapple"],
        eggs: json["eggs"],
        coffee: json["coffee"],
        takeout: json["takeout"],
        introMessage: json["introMessage"],
      });
    });
    this.setState({
      pals: palList
    })
  }

  /**
   * Clears user data.
   */
  clearUser = () => {
    this.setState({
      email: "",
      password: "",

      firstName: "",
      lastName: "",

      profilePicture: "",

      gradYear: "",
      gender: "",
      concentration: "",
      vegetarian: "",
      classes: "",

      breakfast: false,
      lunch: false,
      dinner: false,
      diningHall: "",
      thayer: "",
      pineapple: null,
      eggs: "",
      coffee: "",
      takeout: "",
      introMessage: "",

      pals: []
    })
  }

  render() {
    return (
      <MyContext.Provider value={{
        user: this.state,
        setUser: this.setUser,
        setPals: this.setPals,
        clearUser: this.clearUser
      }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}