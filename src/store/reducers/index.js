import { FETCH_TASKS } from '../actions';

const initialState = {
  teacher: {
    email: "",
    token: ""
  },
  tasks: []
}

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case (FETCH_TASKS): {
      return {...state, tasks: payload};
    }
    default:
      return state;
  }
}