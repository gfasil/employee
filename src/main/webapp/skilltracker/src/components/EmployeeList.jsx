import React, { Component } from "react";
import { Card, Table, ButtonGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faPlusSquare,
  faEdit,
  faTrash,
  faPlus,
  faStreetView,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default class EmployeeList extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
    };
  }
  async loadData() {
    const result = await axios.get("http://localhost:8080/employees");
    this.setState({ employees: result.data });
    console.log(result.data);
  }
  async componentDidMount() {
    this.loadData();
  }
  render() {
    return (
      <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header>Employee List</Card.Header>
        <Card.Body>
          <Table bordered hover striped variant="dark">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>

                <th>Role</th>
                <th>Birth Date</th>
                <th colSpan="1" align="center">
                  Skills
                </th>
                <th colSpan="2" align="center">
                  actions
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.employees.length === 0 ? (
                <tr align="center">
                  <td colSpan="6">
                    {this.state.employees.length} Employee Avail{" "}
                  </td>
                </tr>
              ) : (
                this.state.employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.role}</td>
                    <td>{employee.hiredDate}</td>
                    <td>
                      <ButtonGroup>
                        <Button
                          size="mm"
                          value="view skills"
                          variant="outline-primary"
                        >
                          <FontAwesomeIcon icon={faStreetView} />
                        </Button>
                        <Button
                          size="mm"
                          value="add skills"
                          variant="outline-primary"
                          align="right"
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </Button>
                      </ButtonGroup>
                    </td>
                    <td>
                      <ButtonGroup>
                        <Button size="sm" variant="outline-primary">
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>{" "}
                        <Button size="sm" variant="outline-danger">
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
    );
  }
}
