import React, { Component } from "react";
import { Card, Table, ButtonGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
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
      "http://localhost:8080/employees/" + employeeId + "/skills"
    );
    this.setState({ skills: result.data, employeeId: employeeId });
    console.log(result.data);
  }
  async componentDidMount() {
    const employeeId = this.props.match.params.id;

    if (employeeId != null) {
      console.log("id" + employeeId);
      this.loadData(employeeId);
    }
  }

  deleteSKill = async (skillId) => {
    const result = await axios.delete(
      "http://localhost:8080/employees/" +
        this.state.employeeId +
        "/skills/" +
        skillId
    );

    // this.setState({ employees: result.data });
    if (result != null) {
      this.setState({ show: true });
      setTimeout(() => {
        this.setState({ show: false });
      }, 3000);
      this.setState({
        skills: this.state.skills.filter((skill) => skill.id !== skillId),
      });
    } else {
      this.setState({ show: false });
    }
    // console.log(result.data);
  };
  render() {
    return (
      <div>
        <div></div>
        <div>
          <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>
              Skill List for employee with id {this.state.employeeId}
            </Card.Header>
            <Card.Body>
              <Table bordered hover striped variant="dark">
                <thead>
                  <tr>
                    <th>description</th>
                    <th>field Name</th>

                    <th>field type</th>
                    <th>experience</th>
                    <th>summary</th>
                    <th colSpan="2" align="center">
                      actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.skills.length === 0 ? (
                    <tr align="center">
                      <td colSpan="6">
                        {this.state.skills.length} skills Avail{" "}
                      </td>
                    </tr>
                  ) : (
                    this.state.skills.map((skill) => (
                      <tr key={skill.id}>
                        <td>{skill.description}</td>
                        <td>{skill.field.name}</td>
                        <td>{skill.field.type}</td>
                        <td>{skill.experience}</td>
                        <td>{skill.summary}</td>

                        <td>
                          <ButtonGroup>
                            <Link
                              to={
                                "/editSKill/" +
                                skill.id +
                                "/" +
                                this.state.employeeId
                              }
                              className="btn btn-sm btn-outline-primary"
                              size="mm"
                              value="view skills"
                              variant="outline-primary"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Link>

                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={this.deleteSKill.bind(this, skill.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
        >
      </div>
    );
  }
}
