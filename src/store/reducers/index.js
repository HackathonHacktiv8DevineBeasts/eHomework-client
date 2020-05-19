import { FETCH_TASKS, EDIT_TASK, ISLOADING } from '../actions';

const initialState = {
  tasks: [],
  isLoading: false
}

export default (state = initialState, action) => {
  const {type, payload} = action;
  
  switch (type) {
    case (FETCH_TASKS): {
      return { ...state, tasks: payload};
    }
    case (ISLOADING) : {
      return { ...state, isLoading: payload};
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