import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export function AppNavbar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="sm" className="mb-4">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          KCNA Exam Quiz
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              New quiz
            </Nav.Link>
            <Nav.Link as={NavLink} to="/history">
              History
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
