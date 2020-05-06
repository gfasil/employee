import React, { Component } from "react";
import { Card, Form, Button, Col, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyToast from "./MyToast";
import {
  faSave,
  faPlusSquare,
  faUndo,
  faList,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
export default class Skill extends Component {
  state = {};
  initialState = {
    id: "",
    description: "",
    fieldId: "",
    fieldName: "",
    fieldType: "",
    experience: "",
    summary: "",
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;

    this.submitSkill = this.submitSKill.bind(this);
    this.skillChange = this.skillChange.bind(this);
  }

  componentDidMount() {
    const skillId = this.props.match.params.skillId;
    const employeeId = this.props.match.params.id;
    if (employeeId != null && skillId != null) {
      this.findById(employeeId, skillId);
    }
  }

  resetSkill = () => {
    console.log("hello");
    this.setState(() => this.initialState);
  };
  skillChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  skillList = () => {
    return this.props.history.push("/:id/skillsList");
  };

  render() {
    const {
      description,
      fieldName,
      fieldType,
      experience,
      summary,
    } = this.state;
    return (
      <div>
        <div></div>
        <div>
          <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>
              <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />
              {this.state.id ? "edit skill info" : "Add skill"}
            </Card.Header>
            <Form
              onReset={this.resetSkill}
              id="employeeFormId"
              onSubmit={this.state.id ? this.updateSKill : this.submitSkill}
            >
              <Card.Body>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridFname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      className={"bg-dark text-white"}
                      required
                      type="text"
                      placeholder="first name"
                      name="description"
                      value={description}
                      onChange={this.skillChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridLname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      className={"bg-dark text-white"}
                      required
                      type="text"
                      value={fieldName}
                      onChange={this.skillChange}
                      placeholder="last name"
                      name="lname"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridCountry">
                    <Form.Label>country</Form.Label>
                    <Form.Control
                      className={"bg-dark text-white"}
                      required
                      value={fieldType}
                      onChange={this.skillChange}
                      placeholder="country"
                      name="type"
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridBdate">
                    <Form.Label>birth Date</Form.Label>
                    <Form.Control
                      className={"bg-dark text-white"}
                      required
                      type="text"
                      placeholder=""
                      value={experience}
                      onChange={this.skillChange}
                      name="bdate"
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridCompanyEmail">
                    <Form.Label>summary of the skill</Form.Label>
                    <Form.Control
                      className={"bg-dark text-white"}
                      required
                      type="text"
                      placeholder="Enter company email"
                      value={summary}
                      onChange={this.skillChange}
                      name="summary"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridDescription">
                    <Form.Label>description</Form.Label>
                    <Form.Control
                      className={"bg-dark text-white"}
                      required
                      value={description}
                      onChange={this.skillChange}
                      placeholder="1234 Main St"
                      name="description"
                    />
                  </Form.Group>
                </Form.Row>
              </Card.Body>
              <Card.Footer style={{ textAlign: "right" }}>
                <Button variant="success" name="submit" type="submit">
                  <FontAwesomeIcon icon={faSave} />
                  {this.state.id ? "update" : "save"}
                </Button>{" "}
                <Button variant="info" name="info" type="reset">
                  reset
                  <FontAwesomeIcon icon={faUndo} />
                </Button>{" "}
                <Button
                  variant="info"
                  name="info"
                  type="button"
                  onClick={this.skillList.bind(this)}
                >
                  List
                  <FontAwesomeIcon icon={faList} />
                </Button>
              </Card.Footer>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}
