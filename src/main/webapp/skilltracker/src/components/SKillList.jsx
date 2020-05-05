import React, { Component } from "react";
import { Card, Table, ButtonGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faSave,
  faPlusSquare,
  faEdit,
  faTrash,
  faPlus,
  faStreetView,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyToast from "./MyToast";

export default class SkillList extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      employeeId: "",
      skills: [],
    };
  }
  async loadData(employeeId) {
    const result = await axios.get(
      "http://localhost:8080/employees" + employeeId + "/skills"
    );
    this.setState({ employees: result.data });
    console.log(result.data);
  }
  async componentDidMount() {
    const employeeId = this.props.match.params.id;

    if (employeeId != null) {
      console.log("id" + employeeId);
      this.loadData(employeeId);
    }
  }
  render() {
    return <div>hello world</div>;
  }
}
