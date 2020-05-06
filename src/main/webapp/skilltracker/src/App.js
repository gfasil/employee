import React from "react";

import "./App.css";
import NavigationBar from "./components/NavigationBar";
import { Container, Row, Col } from "react-bootstrap";
import Welcome from "./components/welcome";
import Footer from "./components/Footer";
import Employee from "./components/Employee";
import EmployeeList from "./components/EmployeeList";
import Skills from "./components/SKills";
import SkillList from "./components/SKillList";
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
              <Route path="/edit/:id" exact component={Employee}></Route>
              <Route path="/list" exact component={EmployeeList}></Route>
              <Route path="/:id/skillsList" exact component={SkillList}></Route>
              <Route path="/:id/addSkill" exact component={Skills}></Route>
              <Route
                path="/editSKill/:skillId/:employeeId"
                exact
                component={Skills}
              ></Route>
            </Switch>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </Router>
  );
}

export default App;
