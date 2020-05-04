import React, { Component } from "react";
import { Card, Table } from "react-bootstrap";

export default class EmployeeList extends Component {
  state = {};
  render() {
    return (
      <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header>Employee List</Card.Header>
        <Card.Body>
          <Table bordered hover striped variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr align="center">
                <td colSpan="6">No Employee Avail </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}
