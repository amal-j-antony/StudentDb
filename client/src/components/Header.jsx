import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { IoMdSearch } from "react-icons/io";


function Header({handleShow ,handleClose}) {
    return (
        <>
            <Navbar expand="lg" className="" style={{
                backgroundColor: "#21361c"
            }}>
                <Container className='d-flex gap-3 justify-content-center w-100'>
                    <Navbar.Brand href="#home" className='text-white fw-bold py-3 fs-1' >StudentDb</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <input style={{
                        backgroundColor: "#142e0f",
                        
                    }} type="text" placeholder='Search records' className='py-3 rounded-4 px-4 placeholder:px-4 w-50' />
                    <button style={{
                        // backgroundColor: "#0e170e",
                        color: "white"
                    }} className='fs-3 rounded-2 btn btn-success'><IoMdSearch /></button>
                    <button onClick={handleShow} className='btn py-2 fs-4' style={{
                        backgroundColor: "#399926",
                        color: "white"
                    }}>Add Student data</button>
                </Container>
            </Navbar>
        </>
    )
}

export default Header