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
export default class Employee extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = this.initialState;

    this.submitEmployee = this.submitEmployee.bind(this);
    this.empChange = this.empChange.bind(this);
  }

  initialState = {
    id: "",
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
  componentDidMount() {
    const employeeId = this.props.match.params.id;

    if (employeeId != null) {
      this.findById(employeeId);
    }
  }
  findById = (employeeId) => {
    axios
      .get("http://localhost:8080/employees/" + employeeId)
      .then((response) => {
        const currentEmployee = response.data;
        if (currentEmployee != null) {
          this.setState({
            id: currentEmployee.id,
            fname: currentEmployee.firstName,
            lname: currentEmployee.lastName,
            bdate: currentEmployee.birthDate,
            hdate: currentEmployee.hiredDate,
            city: currentEmployee.address.city,
            description: currentEmployee.address.description,
            country: currentEmployee.address.country,
            region: currentEmployee.address.region,
            suite: currentEmployee.address.suite,
            street: currentEmployee.address.street,
            companyEmail: currentEmployee.companyEmail,
            contactEmail: currentEmployee.contactEmail,
            assignedTo: null,
            role: currentEmployee.role,
            bussinessUnit: currentEmployee.businessUnit,
          });
        }
      })
      .catch((error) => {
        console.log("error");
      });
  };

  saveEmp = async (employee) => {
    const result = await axios.post(
      "http://localhost:8080/employees",
      employee
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

  updateEmp = async (employee, id) => {
    const result = await axios.put(
      "http://localhost:8080/employees/" + id,
      employee
    );
    if (result != null) {
      //  alert("success");
      this.setState({ show: true });
      console.log(this.state.show);
      setTimeout(() => {
        this.setState({ show: false });
      }, 3000);
      setTimeout(() => {
        this.employeeList();
      }, 3000);
    } else {
      this.setState({ show: false });
    }
    this.setState(this.initialState);
  };
  submitEmployee = (event) => {
    event.preventDefault();
    const employee = {
      firstName: this.state.fname,
      lastName: this.state.lname,
      birthDate: this.state.bdate,
      hiredDate: this.state.hdate,
      address: {
        city: this.state.city,
        description: this.state.description,
        country: this.state.country,
        region: this.state.region,
        suite: this.state.suite,
        street: this.state.street,
      },
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
  employeeList = () => {
    return this.props.history.push("/list");
  };
  updateEmployee = (event) => {
    event.preventDefault();
    const employee = {
      id: this.state.id,
      firstName: this.state.fname,
      lastName: this.state.lname,
      birthDate: this.state.bdate,
      hiredDate: this.state.hdate,
      address: {
        city: this.state.city,
        description: this.state.description,
        country: this.state.country,
        region: this.state.region,
        suite: this.state.suite,
        street: this.state.street,
      },
      companyEmail: this.state.companyEmail,
      contactEmail: this.state.contactEmail,
      assignedTo: this.state.assignedTo,
      role: this.state.role,
      businessUnit: this.state.bussinessUnit,
    };
    this.updateEmp(employee, this.state.id);
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
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={
              this.state.method === "put"
                ? "Employee Updated Successfully."
                : "Employee Saved Successfully."
            }
            type={"success"}
          />
        </div>
        <div>
          <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>
              <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />
              {this.state.id ? "edit employee info" : "Add Employee"}
            </Card.Header>
            <Form
              onReset={this.resetEmployee}
              id="employeeFormId"
              onSubmit={
                this.state.id ? this.updateEmployee : this.submitEmployee
              }
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
                  onClick={this.employeeList.bind(this)}
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
