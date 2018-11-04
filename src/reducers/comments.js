import {
  ADD_COMMENT,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILED,
} from '../actions/comments';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_SUCCESS:
      return [...action.comments];
    case FETCH_COMMENTS_FAILED:
      return action.comments;
    case ADD_COMMENT:
      return [...state, action.comment];
    default:
      return state;
  }
};
