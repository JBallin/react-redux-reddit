import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILED,
  ADD_POST_SUCCESS,
  ADD_POST_FAILED,
  UPVOTE,
  DOWNVOTE
} from '../actions/posts';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return [...action.posts];
    case FETCH_POSTS_FAILED:
      return action.err;
    case ADD_POST_SUCCESS:
      return [...state, action.post]
    case ADD_POST_FAILED:
      return action.err;
    case UPVOTE:
    case DOWNVOTE:
      return [...state.filter(p => p.id !== action.post.id), action.post];
    default:
      return state;
  }
};
