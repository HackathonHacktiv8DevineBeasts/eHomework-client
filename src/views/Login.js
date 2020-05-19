import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { teacherLogin } from '../store/actions';
import { useHistory } from 'react-router-dom';
import Loading from '../components/Loading';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = useSelector(state => state.isLoading);

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

  async function onSubmit(event) {
    event.preventDefault();
    dispatch(teacherLogin(email, password))
      .then(_ => {
        checkLogin()
      })
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div style={{ padding: "1% 0 1% 0", boxShadow: "0 10px 10px 5px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} className="login">
      <h1 style={{marginLeft: "5%"}}>
        Login Teacher
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
        <Button type="submit" variant="primary">
          Login
        </Button>
      </Form>
    </div>
  )
}