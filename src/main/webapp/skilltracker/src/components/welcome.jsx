import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";

export default class Welcome extends Component {
  state = {};
  render() {
    return (
      <Jumbotron className="bg-dark text-white">
        <h1> Leading digital change. </h1>
        <h1>Driving real results.</h1>
        <p>track your skills, improve yourself, improve your life.</p>
      </Jumbotron>
    );
  }
}
