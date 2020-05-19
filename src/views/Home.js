import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchTasks, updateTask } from '../store/actions';
import { Form, Button } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import swal from 'sweetalert';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const tasks = useSelector(state => state.tasks);
  const [task, setTask] = useState({name: '', description: '', file: '', students: []});
  // const [editStatus, setEditStatus] = useState({});
  
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
    swal("Good job!", "You clicked the button!", "success");
    history.push('/form');
  }

  // function toEdit(event) {
  //   event.preventDefault();
  //   history.push('/form', {task});
  // }

  function taskDescription(event, value){
    setTask(value);
  }

  // function editStudent(event) {

  // }

  function changeTitile(event) {

  }

  function changeDescription(event) {
    
  }

  function submitEditStudent(student) {
    swal("Congratulations!", "You have success update score!", "success");
    dispatch(updateTask(student));
  }

  function editEmailStudent(event, index) {
    let students = task.students;
    students[index].emailStudent = event.target.value;
    setTask({...task, students });
  }

  function editScoreStudent(event, index) {
    let students = task.students;
    students[index].score = event.target.value;
    setTask({...task, students });
  }

  function editURLStudent(event, index) {
    let students = task.students;
    students[index].url = event.target.value;
    setTask({...task, students });
  }

  console.log("task", task)
  return (
    <div style={{display: "flex", width: "100%", height: "100%"}}>
      {/* Tasks List */}
      <Navbar />
      <div style={{width: "30vw", height: "auto", justifyContent: "center", backgroundColor: "#e5e5e5", margin: "6% auto"}}>
        <h3 style={{textAlign: "center", marginTop: "10px", textDecoration: "underline"}} className="task">Tasks List</h3>
        <div>
          {tasks.map((el, index) => {
            return (
              <h5 className="task-list" variant="light" style={{textAlign:"center", width: "80%", boxShadow: "0 0 10px 5px grey", margin: "6% auto", padding: "5%", borderRadius: "5px", cursor: "pointer"}} key={index} onClick={(event) => taskDescription(event, el)}>{el.name}</h5>
            )
          })}
        </div>
      </div>
      {/* Task Description */}
      <div style={{width: "70vw", height: "100%", margin: "7% auto", backgroundColor: "#ffffff", borderRadius: "5px"}}>
        <h3 style={{textAlign: "center", marginTop: "10px", textDecoration:"underline"}} className="task">Task</h3>
        <div>
          <Form style={{margin: "5% 5%"}}>
            <div className="btn-home" style={{display: "flex", justifyContent: "space-between", marginBottom: "3%"}}>
              <Button variant="primary" onClick={toAdd}>
                Add
              </Button>
              {/* <Button variant="secondary" onClick={toEdit}>
                Edit
              </Button> */}
            </div>
            <Form.Group controlId="Title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter Title" value={task.name} onChange={changeTitile} readOnly/>
            </Form.Group>
            <Form.Group controlId="Title">
              <Form.Label>URL</Form.Label>
              <Form.Control type="url" placeholder="Enter Title" value={task.file} onChange={changeTitile} readOnly/>
            </Form.Group>
            <Form.Group controlId="Description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows="3" placeholder="Enter Description" value={task.description} onChange={changeDescription} readOnly />
            </Form.Group>
            <Form.Group controlId="Title">
              <Form.Label>Assign to</Form.Label>
              <table style={{width: "100%"}} border="1">
                <thead>
                  <tr>
                    <th style={{textAlign: "center", width: "70%"}}>Student</th>
                    <th style={{textAlign: "center"}}>Progress</th>
                    <th style={{textAlign: "center"}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {task.students.map((student, index) => {
                    return (
                      <tr key={student._id}>
                        <td style={{padding: "0 5%"}}> 
                            <Form.Group controlId="Title">
                              <Form.Label>Email:</Form.Label>
                              <Form.Control type="text" placeholder="Enter Title" value={student.emailStudent} onChange={(event) => editEmailStudent(event, index)} readOnly />
                            </Form.Group>
                            <Form.Group controlId="Title">
                              <Form.Label>URL:</Form.Label>
                              <Form.Control type="text" placeholder="Enter Title" value={student.url} onChange={(event) => editURLStudent(event, index)} readOnly />
                            </Form.Group>
                            <Form.Group controlId="Title">
                              <Form.Label>Score:</Form.Label>
                              <Form.Control type="text" placeholder="Enter Title" value={student.score} onChange={(event) => editScoreStudent(event, index)} readOnly={!student.status} />
                            </Form.Group>
                        </td>
                        <td style={{textAlign: "center"}}>{student.status ? "Done" : "Not Complete"}</td>
                        <td style={{textAlign: "center"}}>
                        {/* <Button variant="info" onClick={() => editStudent(index)}>
                          Edit
                        </Button> */}
                        <Button variant="primary" onClick={() => submitEditStudent(student)}>
                          Update
                        </Button>
                        </td>
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