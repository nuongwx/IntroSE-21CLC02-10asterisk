import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';


const NavbarComponent = () => {
    return (
        <Navbar expand="lg" bg="transparent" style={{zIndex: 1000, position: 'absolute', width: '100%' }}>
            <Container>
                <Navbar.Brand as={Link} to="/" className="text-warning">
                <img src="/logo.svg" width="30" height="30" className="d-inline-block align-top mr-lg-3" alt="Logo" />
                <b>Geo Quiz</b>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="ms-auto">
                        <Nav.Link href="/" className="p-lg-0 mx-lg-3 mt-lg-auto mb-lg-auto"><b>Hướng dẫn sử dụng</b></Nav.Link>
                        <Nav.Link href="#" className="p-lg-0 mx-lg-3 mt-lg-auto mb-lg-auto"><b>Tạo câu chuyện</b></Nav.Link>
                        <Nav.Link href="/help" className="p-lg-0 mx-lg-3 mt-lg-auto mb-lg-auto"><b>Trợ giúp</b></Nav.Link>
                        <Nav.Link href="/login" className="mx-lg-3">
                        <Button variant="outline-warning" className="rounded-pill"><b>Đăng nhập</b></Button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;