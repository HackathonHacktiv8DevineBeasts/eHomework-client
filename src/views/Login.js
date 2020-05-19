import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { teacherLogin } from '../store/actions';
import { useHistory } from 'react-router-dom';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(checkLogin, []);

  function changeEmail(event) {
    setEmail(event.target.value);
  }

  function changePassword(event) {
    setPassword(event.target.value);
  }

  function checkLogin() {
    const token = localStorage.getItem('token');
    console.log("Login", token)
    if (token) {
      history.push('/');
    } else {
      localStorage.removeItem('token');
      setEmail('');
      setPassword('');
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    dispatch(teacherLogin(email, password))
      .then(() => {
        checkLogin();
      })
  }

  return (
    <div style={{margin: "10% 35%", boxShadow: "0 10px 10px 5px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
      <h1 style={{marginLeft: "5%"}}>
        Login
      </h1>
      <Form style={{margin: "5% 5%"}} onSubmit={onSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={changeEmail} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={changePassword} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  )
}