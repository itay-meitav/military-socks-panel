import { Button, Dropdown, Form, Tooltip } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useLocation, useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import logo from "../assets/logo.png";
import config from "../assets/config";
import React, { useContext, useState } from "react";
import { PageContext } from "../App";
import styled from "@emotion/styled";
import SearchBox from "./SearchBox";

function LeftNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useContext(PageContext);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="nav-link">
            <img
              src={logo}
              width="24"
              height="30"
              className="d-inline-block align-top"
              style={{ marginRight: 10 }}
            />
            Socks Panel
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Link to="/socks" className="nav-link">
                Socks
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/officers" className="nav-link">
                Officers
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/locations" className="nav-link">
                Locations
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/history" className="nav-link">
                History
              </Link>
            </Nav.Item>
            <NavDropdown
              style={{ transition: "all 2s linear" }}
              title="Tools"
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item
                as={Link}
                to={`/${
                  // loc.pathname.replace(/^\//g, "").split("/")[0] || "socks"
                  page
                }/add`}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                Add New Item
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="button-tooltip-2">
                    Important note - <br></br>
                    This action may take several seconds. <br></br>
                    When finished, the page will refresh.
                  </Tooltip>
                }
              >
                <NavDropdown.Item
                  onClick={() => {
                    fetch(config.apiHost + "api/reset", {
                      method: "put",
                    })
                      .then((res) => {
                        if (res.ok) return res.json();
                      })
                      .then(() => {
                        console.log("reloading");
                        const href = window.location.href.split(
                          window.location.host
                        )[1];
                        navigate(
                          href + (location.search ? "&" : "?") + "reload=true"
                        );
                        setTimeout(() => {
                          navigate(href);
                        });
                        // window.location.reload(false);
                        // location.pathname = location.pathname;
                      })
                      .catch((e) => {
                        console.error(e);
                      });
                  }}
                >
                  Reset Data
                </NavDropdown.Item>
              </OverlayTrigger>
            </NavDropdown>
          </Nav>
          <SearchBox />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default LeftNav;
