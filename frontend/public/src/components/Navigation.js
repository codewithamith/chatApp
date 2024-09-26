import React from "react";
import { useState } from "react";
import {
  Nav,
  Navbar,
  Container,
  Button,
  NavDropdown,
  Modal,
} from "react-bootstrap";
import { useLogoutUserMutation } from "../services/appApi";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo.png";
function Navigation() {
  const user = useSelector((state) => state.user);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [logoutUser] = useLogoutUserMutation();
  async function handleLogout(e) {
    e.preventDefault();
    await logoutUser(user);
    // redirect to home page
    window.location.replace("/");
  }

  return (
    <>
      <Navbar expand="lg" className="border-bottom mb-2 mb-lg-4">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} style={{ width: 150 }} />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!user && (
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to="/chat">
                <Nav.Link>Chat</Nav.Link>
              </LinkContainer>
              {user && (
                <NavDropdown
                  title={
                    <>
                      <img
                        src={user.picture}
                        style={{
                          width: 30,
                          height: 30,
                          marginRight: 10,
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                      {user.name}
                    </>
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item onClick={handleShow}>
                    View Profile
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="border-0 p-4" closeButton></Modal.Header>
        <Modal.Body className="text-center py-4">
          {user && (
            <>
              <img
                src={user.picture}
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: "50%",
                  marginBottom: 20,
                }}
              />
              <p className="m-0">Name: {user.name}</p>
              <p className="m-0">Email: {user.email}</p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Navigation;
