import axios from 'axios';
const baseUrl = 'https://ehomework-server.herokuapp.com'

export const ADD_TASK = 'ADD_TASK';
export const FETCH_TASKS = 'FETCH_TASKS';
export const LOGIN = 'LOGIN';
export const ISLOADING = 'ISLOADING';

export const setLogin = (data) => {
  return { type: LOGIN, payload: data }
}

export const setIsLoading = (status) => {
  return { type: ISLOADING, payload: status }
}

//Login
export const TEACHER_LOGIN = 'TEACHER_LOGIN';

export function teacherLogin(email, password) {

  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(setIsLoading(true));
      axios.post(`${baseUrl}/login/teacher`, {
        email,
        password,
        role: 'teacher'
      })
        .then(({ data }) => {
          dispatch(setLogin(data));
          localStorage.setItem('token', data.token);
          resolve(data)
        })
        .catch(err => {
          console.log('error login');
          reject(err)
        })
        .finally(_ => {
          setTimeout(() => {
            dispatch(setIsLoading(false));
          }, 3000)
        })
    })
  }
}

//Task
export function addTask(task) {
  return (dispatch) => {
    axios({
      method: 'post',
      url: baseUrl + '/task',
      data: { 
        emailStudent: '-', 
        emailTeacher: 'teacher27@mail.com', 
        score: 0, 
        url: '-', 
        viewURL: task.file, 
        status: false, 
        description: task.description, 
        taskName: task.name 
      },
      headers: {
        token: localStorage.getItem('token')
      }
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
      url: baseUrl + '/task',
      headers: {
        token: localStorage.getItem('token')
      }
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
              file: result[index].viewURL,
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