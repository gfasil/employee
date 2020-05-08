import React, { Component } from "react";
import { Card, Table, ButtonGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faEdit,
  faTrash,
  faPlus,
  faStreetView,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyToast from "./MyToast";

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

  deleteEmployee = async (employeeId) => {
    const result = await axios.delete(
      "http://localhost:8080/employees/" + employeeId
    );

    // this.setState({ employees: result.data });
    if (result != null) {
      this.setState({ show: true });
      setTimeout(() => {
        this.setState({ show: false });
      }, 3000);
      this.setState({
        employees: this.state.employees.filter(
          (employee) => employee.id !== employeeId
        ),
      });
    } else {
      this.setState({ show: false });
    }
  };
  render() {
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={
              this.state.method === "delete"
                ? "employee deleted Successfully."
                : "employee updated Successfully."
            }
            type={"delete"}
          />
        </div>
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
                          <Link
                            to={employee.id + "/skillsList"}
                            className="btn btn-sm btn-outline-primary"
                            size="mm"
                            value="view skills"
                            variant="outline-primary"
                          >
                            <FontAwesomeIcon icon={faStreetView} />
                          </Link>

                          <Link
                            to={employee.id + "/addSkill"}
                            className="btn btn-sm btn-outline-primary"
                            size="mm"
                            value="add skills"
                            variant="outline-primary"
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </Link>
                        </ButtonGroup>
                      </td>
                      <td>
                        <ButtonGroup>
                          <Link
                            to={"edit/" + employee.id}
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
                            onClick={this.deleteEmployee.bind(
                              this,
                              employee.id
                            )}
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
    );
  }
}
