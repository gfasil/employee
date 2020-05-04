import React, { Component } from "react";
import { Card, Form, Button, Col } from "react-bootstrap";
export default class Employee extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header>Add Employee</Card.Header>
        <Form id="employeeFormId">
          <Card.Body>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  className={"bg-dark text-white"}
                  type="text"
                  placeholder="first name"
                  name="fname"
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  className={"bg-dark text-white"}
                  type="text"
                  placeholder="last name"
                  name="lname"
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>birth Date</Form.Label>
                <Form.Control
                  className={"bg-dark text-white"}
                  type="date"
                  placeholder=""
                  name="bdate"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>company Email address</Form.Label>
                <Form.Control
                  className={"bg-dark text-white"}
                  type="email"
                  placeholder="Enter company email"
                  name="companyEmail"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>contact Email address</Form.Label>
                <Form.Control
                  className={"bg-dark text-white"}
                  type="email"
                  placeholder="Enter company email"
                  name="contactEmail"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  className={"bg-dark text-white"}
                  placeholder="1234 Main St"
                  name="description"
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>country</Form.Label>
                <Form.Control
                  className={"bg-dark text-white"}
                  placeholder="country"
                  name="country"
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>City</Form.Label>
                <Form.Control className={"bg-dark text-white"} name="city" />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>region</Form.Label>
                <Form.Control
                  className={"bg-dark text-white"}
                  as="select"
                  value="Choose..."
                  name="region"
                >
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>suite</Form.Label>
                <Form.Control className={"bg-dark text-white"} name="suite" />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>hire Date</Form.Label>
                <Form.Control
                  className={"bg-dark text-white"}
                  type="date"
                  placeholder="hire date"
                  name="hdate"
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>assigned to</Form.Label>
                <Form.Control
                  className={"bg-dark text-white"}
                  type="text"
                  placeholder="assigned to"
                  name="assignedTo"
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Role</Form.Label>
                <Form.Control
                  className={"bg-dark text-white"}
                  as="select"
                  size="small"
                  name="role"
                  custom
                >
                  <option>TECHNICAL_CONSULTANT</option>
                  <option>PROJECT_MANAGEMENT</option>
                  <option>DIRECTOR</option>
                  <option>CHIEF</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Bussiness Unit</Form.Label>
                <Form.Control
                  className={"bg-dark text-white"}
                  as="select"
                  size="small"
                  name="bussinessUnit"
                  custom
                >
                  <option>DIGITAL_EXPERIENCE_GROUP</option>
                  <option>ADOBE</option>
                  <option>IBM_NBU</option>
                  <option>API_MANAGEMENT</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </Card.Body>
          <Card.Footer style={{ textAlign: "right" }}>
            <Button variant="success" name="submit" type="submit">
              Submit
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    );
  }
}
