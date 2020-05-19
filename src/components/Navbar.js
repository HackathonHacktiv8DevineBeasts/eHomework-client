import React from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default () => {

  const history = useHistory();
  function handleLogout (e) {
    e.preventDefault()
    localStorage.clear()
    history.push('/login')
  }

  return (
    <div style={{ width: "100%", position: "fixed"}}>
      <Navbar bg="transparent" expand="lg">
        <Navbar.Brand className="task" href="/">Teacher Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Button inline className="ml-auto" onClick={handleLogout} variant="outline-danger">Logout</Button>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}