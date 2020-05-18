import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default () => {
  return (
    <div style={{margin: "5% 20%", boxShadow: "0 10px 10px 5px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
      <h1 style={{marginLeft: "5%"}}>
        Add Task
      </h1>
      <Form style={{margin: "5% 5%"}}>
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
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  )
}