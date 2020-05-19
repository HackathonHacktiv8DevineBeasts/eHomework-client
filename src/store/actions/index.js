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
  return (dispatch) => {
    axios({
      method: 'post',
      url: baseUrl + '/task',
    })
      .then(({ data }) => {
        console.log("Get tasks", data);
        const groupByName = {};
        const result = data.result;
        for (const index in result) {
          if (groupByName[result[index].taskName]) {
            groupByName[result[index].taskName].students.push(result[index]);
          } else {
            groupByName[result[index].taskName] = {
              name: result[index].taskName,
              description: result[index].description,
              students: [result[index]]
            }
          }
        }
        const newData = Object.values(groupByName);
        console.log("GroupBy", newData);
        return dispatch({ type: ADD_TASK, payload: task });
      })
      .catch(console.log);
  }
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
        const result = data.result;
        for (const index in result) {
          if (groupByName[result[index].taskName]) {
            groupByName[result[index].taskName].students.push(result[index]);
          } else {
            groupByName[result[index].taskName] = {
              name: result[index].taskName,
              description: result[index].description,
              students: [result[index]]
            }
          }
        }
        const newData = Object.values(groupByName);
        console.log("GroupBy", newData);
        return dispatch({ type: FETCH_TASKS, payload: newData});
      })
      .catch(console.log);
  }
}