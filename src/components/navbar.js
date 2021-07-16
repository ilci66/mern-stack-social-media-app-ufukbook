import React from 'react';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'

const NavBar = () => {
  return(
    <div>
      <div className="row">
        <div className=" d-flex flex-column">
          <Navbar className="justify-content-around" bg="dark" variant="dark" expand="md" sticky="top">
              <Navbar.Brand href="/" className="mx-5 p-2">UfukBook</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-5 justify-content-around"/>
              <Navbar.Collapse id="basic-navbar-nav" className="mr-5 justify-content-end">
                  <Nav className="p-2">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/about">About Ufuk</Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown" className="justify-content-around">
                      <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="https://github.com/ilci66">Creator's github page</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="/profile">View Your Profile</Nav.Link>
                  
                  </Nav>
              </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    </div>
    )
} 

export default NavBar