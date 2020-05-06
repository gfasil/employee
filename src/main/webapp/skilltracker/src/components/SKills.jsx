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
    employeeId: "",
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
    const employeeId = this.props.match.params.employeeId;
    this.setState({ employeeId: employeeId, skillId: skillId });
    if (employeeId != null && skillId != null) {
      console.log(
        "inside at componenet mount empdi:" + employeeId + "skill id" + skillId
      );
      this.findById(employeeId, skillId);
    }
  }
  saveSKill = async (skill, employeeId) => {
    const result = await axios.post(
      "http://localhost:8080/employees/" + employeeId + "/skills",
      skill
    );
    if (result != null) {
      //  alert("success");
      this.setState({ show: true });
      console.log(this.state.show);
      setTimeout(() => {
        this.setState({ show: false });
      }, 3000);
    } else {
      this.setState({ show: false });
    }
    this.setState(this.initialState);
  };
  submitSKill = (event) => {
    event.preventDefault();
    const skill = {
      description: this.state.description,
      field: {
        name: this.state.fieldName,
        type: this.state.fieldType,
      },
      experience: this.state.experience,
      summary: this.state.summary,
    };
    this.saveSKill(skill, this.state.employeeId);
  };

  updateSKill = (event) => {
    event.preventDefault();
    const skill = {
      description: this.state.description,
      field: {
        name: this.state.fieldName,
        type: this.state.fieldType,
      },
      experience: this.state.experience,
      summary: this.state.summary,
    };
    this.putSKill(skill, this.state.employeeId, this.state.skillId);
  };

  putSKill = async (skill, employeeId, skillId) => {
    const result = await axios.put(
      "http://localhost:8080/employees/" + employeeId + "/skills/" + skillId,
      skill
    );
    if (result != null) {
      //  alert("success");
      this.setState({ show: true });
      console.log(this.state.show);
      setTimeout(() => {
        this.setState({ show: false });
      }, 3000);
    } else {
      this.setState({ show: false });
    }
    this.setState(this.initialState);
  };

  findById = (employeeId, skillId) => {
    axios
      .get(
        "http://localhost:8080/employees/" + employeeId + "/skills/" + skillId
      )
      .then((skill) => {
        const currentSkill = skill.data;
        if (currentSkill != null) {
          console.log("skill found" + currentSkill);
          this.setState({
            id: currentSkill.id,
            description: currentSkill.description,
            fieldId: currentSkill.field.id,
            fieldName: currentSkill.field.name,
            fieldType: currentSkill.field.type,
            experience: currentSkill.experience,
            summary: currentSkill.summary,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        <div styles={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={
              this.state.method === "put"
                ? "skill Updated Successfully."
                : "skill Saved Successfully."
            }
            type={"success"}
          />
        </div>
        <div>
          <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>
              <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />
              {this.state.id ? "edit skill info" : "Add skill"} for{" "}
              {this.state.employeeId}
            </Card.Header>
            <Form
              onReset={this.resetSkill}
              id="employeeFormId"
              onSubmit={this.state.id ? this.updateSKill : this.submitSkill}
            >
              <Card.Body>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      className={"bg-dark text-white"}
                      required
                      type="text"
                      placeholder="description"
                      name="description"
                      value={description}
                      onChange={this.skillChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridfieldName">
                    <Form.Label>field Name</Form.Label>
                    <Form.Control
                      className={"bg-dark text-white"}
                      required
                      type="text"
                      value={fieldName}
                      onChange={this.skillChange}
                      placeholder="Field name"
                      name="fieldName"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridFieldType">
                    <Form.Label>field Type</Form.Label>
                    <Form.Control
                      className={"bg-dark text-white"}
                      required
                      value={fieldType}
                      onChange={this.skillChange}
                      placeholder="field type"
                      name="fieldType"
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridExperience">
                    <Form.Label>Experience</Form.Label>
                    <Form.Control
                      className={"bg-dark text-white"}
                      required
                      type="text"
                      placeholder="years of experience"
                      value={experience}
                      onChange={this.skillChange}
                      name="experience"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridSummary">
                    <Form.Label>summary of the skill</Form.Label>
                    <Form.Control
                      className={"bg-dark text-white"}
                      required
                      type="text"
                      placeholder="short summary of skill"
                      value={summary}
                      onChange={this.skillChange}
                      name="summary"
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
