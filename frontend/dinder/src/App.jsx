import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./pages/Login/Login";
import WelcomePane from "./pages/Login/components/WelcomePane";
import ProgressBar from "./pages/Survey/components/ProgressBar/ProgressBar";
import Survey from "./pages/Survey/Survey";
import Settings from "./pages/Settings/Settings";
import { MyContext, MyProvider } from "./components/User/User"

class App extends Component {
  isNotLoggedIn = (user) => {
    return user.email === ""
  }

  render() {
    return (
      <MyProvider>
        <Router>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/pals">
              <MyContext.Consumer>
                {(userContext) => {
                  if (this.isNotLoggedIn(userContext.user)) {
                    return (
                      <Redirect to={"/"}/>
                    )
                  } else {
                    return (
                      <div className="page-container">
                        <Sidebar currentPage={"pals"}/>
                        <MainPage user={userContext.user} setPals={userContext.setPals} clearUser={userContext.clearUser}/>
                      </div>
                    )
                  }
                }}
              </MyContext.Consumer>
            </Route>

            <Route path="/settings">
              <MyContext.Consumer>
                {(userContext) => {
                  if (this.isNotLoggedIn(userContext.user)) {
                    return (
                      <Redirect to={"/"}/>
                    )
                  } else {
                    return (
                      <div className="page-container">
                        <Sidebar currentPage={"settings"}/>
                        <Settings user={userContext.user} clearUser={userContext.clearUser}/>
                      </div>
                    )
                  }
                }}
              </MyContext.Consumer>
            </Route>
          
            <Route path="/survey">
              <MyContext.Consumer>
                {(userContext) => {
                  if (this.isNotLoggedIn(userContext.user)) {
                    return (
                      <Survey user={userContext.user} registering={true} setUser={userContext.setUser}/>
                    )
                  } else {
                    return (
                      <Redirect to={"/"}/>
                    )
                  }
                }}
              </MyContext.Consumer>
            </Route>

            <Route path="/update/profilepic">
              <MyContext.Consumer>
                {(userContext) => {
                  if (this.isNotLoggedIn(userContext.user)) {
                    return (
                      <Redirect to={"/"}/>
                    )
                  } else {
                    return (
                      <Survey user={userContext.user} startingSection={"your-information"} registering={false} setUser={userContext.setUser}/>
                    )
                  }
                }}
              </MyContext.Consumer>
            </Route>

            <Route path="/update">
              <MyContext.Consumer>
                {(userContext) => {
                  if (this.isNotLoggedIn(userContext.user)) {
                    return (
                      <Redirect to={"/"}/>
                    )
                  } else {
                    return (
                      <Survey user={userContext.user} setUser={userContext.setUser} registering={false}/>
                    )
                  }
                }}
              </MyContext.Consumer>
            </Route>
            
            <Route path="/">
              <MyContext.Consumer>
                {(userContext) => {
                  if (this.isNotLoggedIn(userContext.user)) {
                    return (
                      <div className="page-container">
                        <WelcomePane/>
                        <Login setUser={userContext.setUser}/>
                      </div>
                    )
                  } else {
                    return (
                      <Redirect to={"/pals"}/>
                    )
                  }
                }}
              </MyContext.Consumer>
            </Route>
          </Switch>
        </Router> 
      </MyProvider>
    );
  }
}

export default App;