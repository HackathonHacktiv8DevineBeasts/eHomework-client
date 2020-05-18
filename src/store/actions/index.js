//Login
export const TEACHER_LOGIN = 'TEACHER_LOGIN';

export function teacherlogin(username, passowrd) {
  return { type: TEACHER_LOGIN, payload: {username, passowrd} };
}

//Task
export const ADD_TASK = 'ADD_TASK';

export function addTask(task) {
  return { type: ADD_TASK, payload: task };
}

export const FETCH_TASKS = 'FETCH_TASKS';

export function fetchTasks(tasks) {
  return { type: ADD_TASK, payload: tasks };
}