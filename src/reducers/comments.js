import {
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILED,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILED,
} from '../actions/comments';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_SUCCESS:
      return [...action.comments];
    case FETCH_COMMENTS_FAILED:
      return action.comments;
    case ADD_COMMENT_SUCCESS:
      return [...state, action.comment];
    case ADD_COMMENT_FAILED:
      return action.comment;
    default:
      return state;
  }
};
