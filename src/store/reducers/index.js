import { FETCH_TASKS, ISLOADING } from '../actions';
// import { LOGIN } from '../actions';

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
    default:
      return state;
  }
}