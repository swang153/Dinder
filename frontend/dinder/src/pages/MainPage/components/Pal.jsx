import React, { Component } from "react";
import { Card, Button, Popover, OverlayTrigger, Modal } from "react-bootstrap";
import "./Pal.css";
import pawWhite from "../../../assets/images/pawWhite.svg"
import bear from "../../../assets/images/bear.svg"
import leaf from "../../../assets/images/leaf.png"


class Pal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    };
  }

  showClasses() {
    const splitClasses = this.props.classes.split(', ').map((line, index) =>
      <React.Fragment key={index}>
        <span-r>{line}</span-r><br />
      </React.Fragment>
    );
    return (
      <div className="card-info-row"><span-l>Classes</span-l>{splitClasses}</div>
    )
  }

  showAvailableTime() {
    let meals = [this.props.breakfast, this.props.lunch, this.props.dinner];
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
    return (<div className="card-sub">{newText}</div>)
  }

  openModal = () => {
    this.setState({ modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    return (
      <Card bsPrefix="pal-card">

        <Button bsPrefix="pal-btn" onClick={this.openModal}>
          <img className="card-icon" src={pawWhite} alt="Paw Icon"></img>
        </Button>
        <Modal
          dialogClassName="pal-modal"
          show={this.state.modalOpen}
          closeOnOuterClick={true}
          show={this.state.modalOpen}
          aria-labelledby="pal-modal"
          centered
          onHide={this.closeModal}
        >
          <Modal.Body bsPrefix="pal-modal-body">
            <img className="card-icon" src={bear} alt="Bear Icon"></img>
            <div className="card-text">You are now pals with</div>
            <div className="card-title">{this.props.firstName}</div>
            <div className="card-text">Contact them at<br />
              <b>{this.props.email}</b><br />
              to get a meal!</div><br />
            <Button bsPrefix="pal-modal-button" onClick={this.closeModal}>Back</Button>
          </Modal.Body>
        </Modal>

        <Card.Img bsPrefix="pal-img" src={this.props.profilePicture} />
        <Card.Body bsPrefix="pal-card-body">
          <div className="card-top">
            {this.showAvailableTime()}
            <OverlayTrigger delay={{ show: 100, hide: 200 }} placement="bottom" overlay={
              <Popover bsPrefix="pal-popover">
                <Popover.Title><b>About {this.props.firstName} {this.props.vegetarian === "yes" ? <span style={{color: "#98CC5C"}}>(Vegetarian)</span> : ""}</b></Popover.Title>
                <Popover.Content>
                  <div className="card-info-row"><span-l>Concentration</span-l><span-r>{this.props.concentration}</span-r></div><br />
                  <div className="card-info-row"><span-l>Grad Year</span-l><span-r>{this.props.gradYear}</span-r></div><br />
                  {this.showClasses()}
                  <div className="card-info-row"><span-l>Fav. Dining Hall</span-l><span-r>{this.props.favDining}</span-r></div><br />
                  <div className="card-info-row"><span-l>Fav. Restaurant</span-l><span-r>{this.props.favRestaurant}</span-r></div><br />
                </Popover.Content>
              </Popover>
            }>
              <Button bsPrefix="info-btn">i</Button>
            </OverlayTrigger>
          </div>
          <div className="card-title">{this.props.firstName} {this.props.vegetarian === "yes" ? <img className="card-leaf" src={leaf} alt="Paw Icon"></img> : ""}</div>
          <div className="card-text">{this.props.introMessage}</div>
        </Card.Body>
      </Card>
    )
  }
}

export default Pal;
