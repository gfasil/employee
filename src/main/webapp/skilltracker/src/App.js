import React from "react";

import "./App.css";
import NavigationBar from "./components/NavigationBar";
import { Container, Row, Col } from "react-bootstrap";
import Welcome from "./components/welcome";
import Footer from "./components/Footer";
import Employee from "./components/Employee";
import EmployeeList from "./components/EmployeeList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const marginTop = {
    marginTop: "20px",
  };
  return (
    <Router>
      <NavigationBar />
      <Container>
        <Row>
          <Col lg={12} style={marginTop}>
            <Switch>
              <Route path="/" exact component={Welcome}></Route>
              <Route path="/add" exact component={Employee}></Route>
              <Route path="/list" exact component={EmployeeList}></Route>
            </Switch>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
      <p>hello employee tracker</p>
    </Router>
  );
}

export default App;
