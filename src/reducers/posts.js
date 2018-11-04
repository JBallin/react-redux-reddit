import {
  ADD_POST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILED,
} from '../actions/posts';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return [...action.posts];
    case FETCH_POSTS_FAILED:
      return action.posts;
    case ADD_POST:
      return [...state, action.post]
    default:
      return state;
  }
};
