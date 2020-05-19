import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default () => {
  const history = useHistory();

  function goBack(event) {
    event.preventDefault();
    history.push('/');
  }

  return (
    <div style={{margin: "5% 20%", boxShadow: "0 10px 10px 5px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
      <h1 style={{marginLeft: "5%"}}>
        Add Task
      </h1>
      <Form style={{margin: "5% 5%"}} onReset={goBack}>
        <Form.Group controlId="Title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter Title" />
        </Form.Group>
        <Form.Group controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows="3" placeholder="Enter Description" />
        </Form.Group>
        <Form.Group controlId="Title">
          <Form.Label>Assign to</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <Button variant="primary" type="submit">
            Add
          </Button>
          <Button variant="secondary" type="reset">
            Back
          </Button>
        </div>
      </Form>
    </div>
  )
}