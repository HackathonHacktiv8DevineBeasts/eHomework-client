import axios from 'axios';
const baseUrl = 'https://ehomework-server.herokuapp.com'

export const ADD_TASK = 'ADD_TASK';
export const FETCH_TASKS = 'FETCH_TASKS';

//Login
// export const TEACHER_LOGIN = 'TEACHER_LOGIN';

export function teacherLogin(email, passowrd) {
  return (dispatch) => {
    axios({
      method: 'get',
      url: baseUrl + '/login',
      data: {
        email,
        passowrd
      }
    })
      .then(({ data }) => {
        console.log("Get token", data)
        localStorage.setItem('token', data.token);
      })
    // return { type: TEACHER_LOGIN, payload: {email, passowrd} };
  }
}

//Task
export function addTask(task) {
  return { type: ADD_TASK, payload: task };
}

export function fetchTasks() {
  return (dispatch) => {
    axios({
      method: 'get',
      url: baseUrl + '/task'
    })
      .then(({ data }) => {
        console.log("Get tasks", data);
        const groupByName = {};
        for (const index in data.result) {
          if (groupByName[index]) {
            groupByName[index].students.push(data[index]);
          } else {
            groupByName[index] = {
              description: data[index].description,
              students: [data[index]]
            }
          }
        }
        console.log("GroupBy", groupByName);
        return dispatch({ type: FETCH_TASKS, payload: groupByName});
      })
      .catch(console.log);
  }
}