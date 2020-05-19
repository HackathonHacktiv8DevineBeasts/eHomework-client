import React from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { storage } from '../firebase';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/actions';
import swal from 'sweetalert';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useLocation().state;
  const [task, setTask] = useState(state ? state.task : {name: '', description: '', file: '', students: []});
  const [image, setImage] = useState({});

  function goBack(event) {
    event.preventDefault();
    history.push('/');
  }

  function changeTaskName(event) {
    setTask({...task, name: event.target.value});
  }

  function changeTaskDescription(event) {
    setTask({...task, description: event.target.value});
  }

  // function deleteStudent(index) {
  //   task.students.splice(index, 1);
  //   setTask(task);
  //   console.log(task)
  // }

  // function addStudent() {
  //   task.students.push('');
  //   setTask(task);
  //   console.log(task)
  // }

  function onSubmit(event) {
    event.preventDefault();
    if (image) {
      const upload = storage.ref(`/${image.name}`).put(image)
      upload.on('state_changed', (snapshot) => {}, (err) => { console.log(err) }, () => {
      storage.ref('/').child(image.name).getDownloadURL()
      .then(url => {
        let newTask = { ...task, file: url}
        console.log("task uploaded", newTask)
        console.log("URL", url)
        dispatch(addTask(newTask));
        swal("Congratulations!", "You have successfully add new task!", "success");
        history.push('/');
      })
      })
    }
  }

  function changeFile(event) {
    setImage(event.target.files[0]);
  }

  console.log("task", task)
  return (
    <div className="formAdd" style={{margin: "5% 20%", width: "100%", borderRadius: "5px", boxShadow: "0 5px 5px 5px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
      <h1 style={{margin: "5% 5%"}}>
        Add Task
      </h1>
      <Form style={{margin: "5% 5%"}} onReset={goBack} onSubmit={onSubmit}>
        <Form.Group controlId="Title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter Title" value={task.name} onChange={changeTaskName} />
        </Form.Group>
        <Form.Group controlId="Title">
          <Form.Label>Task URL</Form.Label>
          <Form.Control type="file" placeholder="Choose file" onChange={changeFile} />
        </Form.Group>
        <Form.Group controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows="3" placeholder="Enter Description" value={task.description} onChange={changeTaskDescription} />
        </Form.Group>
        {/* <Form.Group controlId="Title">
          <Form.Label>Assign to</Form.Label>
          <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between"}}>
            {task.students[0] ? task.students.map((student,index) => {
              return (
                <div key={index} style={{display: "flex", margin: "2px 1px"}}>
                  <Form.Control type="text" value={student.emailStudent} />
                  {(task.students.length - 1 === index) ? 
                  <Button variant="primary" onClick={() => addStudent()}>
                    +
                  </Button>
                  :
                  <Button variant="danger" onClick={() => deleteStudent(index)}>
                    -
                  </Button>
                  }
                </div>
              )
            }) : <Form.Control type="text" />}
          </div>
        </Form.Group> */}
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <Button variant="primary" type="submit">
            {state ? "Update" : "Add"}
          </Button>
          <Button variant="secondary" type="reset" className="btn-back">
            Back
          </Button>
        </div>
      </Form>
    </div>
  )
}