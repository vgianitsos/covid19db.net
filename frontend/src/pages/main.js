import React, { Component } from "react";
// import { LinkContainer } from "react-router-bootstrap";
// import { Button, ButtonGroup } from "react-bootstrap";
import Map from "../components/map";

export default class Main extends Component {
  render() {
    return (
      <div className="App">
        {/* <header
          className="App-header"
          style={{ minHeight: "10rem", padding: "18px" }}
        >
          <h1 style={{ color: "#fff" }}>Main Page</h1>
          <ButtonGroup vertical>
            <LinkContainer className="App-link" to="/about" size="lg">
              <Button variant="outline-secondary">About Page</Button>
            </LinkContainer>
            <LinkContainer className="App-link" to="/countries" size="lg">
              <Button variant="outline-secondary">Countries Page</Button>
            </LinkContainer>
            <LinkContainer className="App-link" to="/cases" size="lg">
              <Button variant="outline-secondary">Cases Page</Button>
            </LinkContainer>
            <LinkContainer className="App-link" to="/risks" size="lg">
              <Button variant="outline-secondary">Risks Page</Button>
            </LinkContainer>
          </ButtonGroup>
        </header> */}
        <Map
          center={[15, 30]}
          zoom={1.95}
          height={window.innerHeight + 420 - 69 - 420} // Perfect value to fit the map on the splash page... nice
          width={'100vw'}
        />
      </div>
    );
  }
}
