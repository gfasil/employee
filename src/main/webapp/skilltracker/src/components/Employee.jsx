import React, { Component } from "react";
import { Card, Form, Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faPlusSquare,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
export default class Employee extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.submitEmployee = this.submitEmployee.bind(this);
    this.empChange = this.empChange.bind(this);
  }
  initialState = {
    fname: "",
    lname: "",
    bdate: "",
    hdate: "",
    city: "",
    description: "",
    country: "",
    region: "",
    suite: "",
    street: "",
    companyEmail: "",
    contactEmail: "",
    assignedTo: null,
    role: "",
    bussinessUnit: "",
  };
  saveEmp = async (employee) => {
    const result = await axios.post(
      "http://localhost:8080/employees",
      employee
    );
    if (result != null) {
      this.setState(this.initialState);
      alert("employee added");
    }
  };
  submitEmployee = (event) => {
    event.preventDefault();
    const employee = {
      firstName: this.state.fname,
      lastName: this.state.lname,
      birthDate: this.state.bdate,
      hiredDate: this.state.hdate,
      city: this.state.city,
      description: this.state.description,
      country: this.state.country,
      region: this.state.region,
      suite: this.state.suite,
      street: this.state.street,
      companyEmail: this.state.companyEmail,
      contactEmail: this.state.contactEmail,
      assignedTo: this.state.assignedTo,
      role: this.state.role,
      businessUnit: this.state.bussinessUnit,
    };
    this.saveEmp(employee);
  };
  resetEmployee = () => {
    console.log("hello");
    this.setState(() => this.initialState);
  };
  empChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      fname,
      lname,
      bdate,
      hdate,
      city,
      description,
      country,
      region,
      suite,
      street,
      companyEmail,
      contactEmail,
      assignedTo,
      role,
      bussinessUnit,
    } = this.state;

    return (
      <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header>
          <FontAwesomeIcon icon={faPlusSquare} />
          Add Employee
        </Card.Header>
        <Form
          onReset={this.resetEmployee}
          id="employeeFormId"
          onSubmit={this.submitEmployee}
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
                  name="fname"
                  value={fname}
                  onChange={this.empChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridLname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  className={"bg-dark text-white"}
                  required
                  type="text"
                  value={lname}
                  onChange={this.empChange}
                  placeholder="last name"
                  name="lname"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridBdate">
                <Form.Label>birth Date</Form.Label>
                <Form.Control
                  className={"bg-dark text-white"}
                  required
                  type="date"
                  placeholder=""
                  value={bdate}
                  onChange={this.empChange}
                  name="bdate"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCompanyEmail">
                <Form.Label>company Email address</Form.Label>
                <Form.Control
                  className={"bg-dark text-white"}
                  required
                  type="email"
                  placeholder="Enter company email"
                  value={companyEmail}
                  onChange={this.empChange}
                  name="companyEmail"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridContactEmail">
                <Form.Label>contact Email address</Form.Label>
                <Form.Control
                  className={"bg-dark text-white"}
                  required
                  type="email"
                  value={contactEmail}
                  onChange={this.empChange}
                  placeholder="Enter company email"
                  name="contactEmail"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridDescription">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  className={"bg-dark text-white"}
                  required
                  value={description}
                  onChange={this.empChange}
                  placeholder="1234 Main St"
                  name="description"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCountry">
                <Form.Label>country</Form.Label>
                <Form.Control
                  className={"bg-dark text-white"}
                  required
                  value={country}
                  onChange={this.empChange}
                  placeholder="country"
                  name="country"
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  className={"bg-dark text-white"}
                  required
                  value={city}
                  onChange={this.empChange}
                  name="city"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridRegion">
                <Form.Label>region</Form.Label>
                <Form.Control
                  className={"bg-dark text-white"}
                  required
                  as="select"
                  value={region}
                  onChange={this.empChange}
                  name="region"
                >
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridSuite">
                <Form.Label>street</Form.Label>
                <Form.Control
                  className={"bg-dark text-white"}
                  required
                  value={street}
                  onChange={this.empChange}
                  name="street"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridSuite">
                <Form.Label>suite</Form.Label>
                <Form.Control
                  className={"bg-dark text-white"}
                  required
                  value={suite}
                  onChange={this.empChange}
                  name="suite"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridHdate">
                <Form.Label>hire Date</Form.Label>
                <Form.Control
                  className={"bg-dark text-white"}
                  type="date"
                  required
                  placeholder="hire date"
                  value={hdate}
                  onChange={this.empChange}
                  name="hdate"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridassignedTo">
                <Form.Label>assigned to</Form.Label>
                <Form.Control
                  className={"bg-dark text-white"}
                  type="text"
                  placeholder="assigned to"
                  value={assignedTo}
                  onChange={this.empChange}
                  name="assignedTo"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  className={"bg-dark text-white"}
                  required
                  as="select"
                  size="small"
                  value={role}
                  onChange={this.empChange}
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
              <Form.Group as={Col} controlId="bussinessUnit">
                <Form.Label>Bussiness Unit</Form.Label>
                <Form.Control
                  className={"bg-dark text-white"}
                  required
                  as="select"
                  size="small"
                  value={bussinessUnit}
                  onChange={this.empChange}
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
              <FontAwesomeIcon icon={faSave} />
              Submit
            </Button>{" "}
            <Button variant="info" name="info" type="reset">
              reset
              <FontAwesomeIcon icon={faUndo} />
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    );
  }
}
