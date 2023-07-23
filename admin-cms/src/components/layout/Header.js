import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Navbar expand="md" variant="dark" className="bg-dark">
        <Container>
          <Link to="/" className="navbar-brand">
            Ecomm Technotronix
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link to="/" className="nav-link">
                Sign In
              </Link>{" "}
              <Link to="/new-admin" className="nav-link">
                Sign Up
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
