import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";

export default class Welcome extends Component {
  state = {};
  render() {
    return (
      <Jumbotron className="bg-dark text-white">
        <h1>Welcome to Employee tracker system</h1>
        <p>
          track your skills, improve yourself, improve your life. Profiecient
        </p>
      </Jumbotron>
    );
  }
}
