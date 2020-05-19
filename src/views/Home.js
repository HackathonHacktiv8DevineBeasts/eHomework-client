import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchTasks } from '../store/actions';
import { Form, Button } from 'react-bootstrap';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const tasks = useSelector(state => state.tasks);
  const [task, setTask] = useState({name: '', description: '', students: []});

  useEffect(() => {
    if (localStorage.token) {
      dispatch(fetchTasks());
    } else {
      history.push('/login');
    }
  }, [dispatch, history]);
  
  useEffect(() => {
    if (tasks[0]) {
      setTask(tasks[0]);
    }
  }, [tasks]);

  function toAdd(event) {
    event.preventDefault();
    history.push('/form');
  }

  console.log("task", task)
  return (
    <div style={{display: "flex", width: "100%", height: "100%"}}>
      {/* Tasks List */}
      <div style={{width: "30vw", height: "100%", backgroundColor: "blue"}}>
        <h3 style={{textAlign: "center"}}>Tasks List</h3>
        <div>
          {tasks.map((el, index) => {
            return (
              <h5 variant="light" style={{width: "100%", boxShadow: "0 0 10px 5px grey", marginTop: "6%", cursor: "pointer"}} key={index}>{el.name}</h5>
            )
          })}
        </div>
      </div>
      {/* Task Description */}
      <div style={{width: "70vw", height: "100%", backgroundColor: "yellow"}}>
        <h3 style={{textAlign: "center"}}>Task</h3>
        <div>
          <Form style={{margin: "5% 5%"}}>
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "2%"}}>
              <Button variant="primary" onClick={toAdd}>
                Add
              </Button>
              <Button variant="secondary" type="submit">
                Edit
              </Button>
            </div>
            <Form.Group controlId="Title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter Title" value={task.name} readOnly/>
            </Form.Group>
            <Form.Group controlId="Description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows="3" placeholder="Enter Description" value={task.description} readOnly />
            </Form.Group>
            <Form.Group controlId="Title">
              <Form.Label>Assign to</Form.Label>
              {/* <Form.Control type="text" /> */}
              <table style={{width: "100%"}} border="1">
                <thead>
                  <tr>
                    <th style={{textAlign: "center", width: "70%"}}>Student</th>
                    <th style={{textAlign: "center"}}>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {task.students.map((student, index) => {
                    console.log("student"+ index, student)
                    return (
                      <tr key={index}>
                        <td style={{padding: "0 5%"}}>{student.emailStudent}</td>
                        <td style={{textAlign: "center"}}>{student.status ? "Done" : "Not Complete"}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  )
}