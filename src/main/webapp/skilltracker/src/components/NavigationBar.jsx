import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
class NavigationBar extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Link to={""} className="navbar-brand">
            <img
              src="https://img.icons8.com/nolan/64/development-skill.png"
              width="25"
              hight="25"
              alt="brand"
            />
            Skill Tracker
          </Link>

          <Nav className="mr-auto">
            <Link to={""} className="nav-link">
              Home
            </Link>
            <Link to={"list"} className="nav-link">
              employee list
            </Link>
            <Link to={"add"} className="nav-link">
              Add Employee
            </Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavigationBar;
