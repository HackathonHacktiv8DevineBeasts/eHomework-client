import { FETCH_TASKS, EDIT_TASK } from '../actions';

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
    case (EDIT_TASK): {
      const index = state.tasks.findIndex(el => el._id === payload._id);
      state.tasks[index] = payload;
      return state;
    }
    default:
      return state;
  }
}