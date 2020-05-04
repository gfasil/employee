import React, { Component } from "react";
import { Container, Navbar, Col } from "react-bootstrap";
export default class Footer extends Component {
  state = {};
  render() {
    let fullYear = new Date().getFullYear();
    return (
      <Navbar bg="dark" variant="dark" fixed="bottom">
        <Container>
          <Col lg="12" className="text-center text-muted">
            <div>
              {fullYear}- {fullYear + 1}All rights reserved by faya man
            </div>
          </Col>
        </Container>
      </Navbar>
    );
  }
}
