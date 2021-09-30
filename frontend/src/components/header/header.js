import React from 'react'
//import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav,Navbar} from 'react-bootstrap'
import logo from './../../logo.png'

function header() {
    return (
        <div>
           <Navbar bg="dark" variant="dark" sticky="top"
           expand="md">
               <Navbar.Brand>
                   <img src ={logo} width="40px" height="40px" alt="logo"/>
                   Donate Blood
               </Navbar.Brand>
               <Navbar.Toggle/>
               <Navbar.Collapse className="justify-content-end">
                <Nav>
                   <Nav.Link href='/'>Donor</Nav.Link>
                   <Nav.Link href='/addDonor'>Add Donor</Nav.Link>
                </Nav>
               </Navbar.Collapse>
           </Navbar>

        </div>
    )
}

export default header
