const API_URL = process.env.REACT_APP_API_URL;

export const ADD_COMMENT = 'ADD_COMMENT';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILED = 'FETCH_COMMENTS_FAILED';

export const addComment = (comment) => dispatch => {
  dispatch({ type: ADD_COMMENT, comment });
}

export const fetchComments = () => dispatch => {
  fetch(`${API_URL}/comments`)
    .then(r => r.json())
    .then(comments => dispatch({
      type: FETCH_COMMENTS_SUCCESS,
      comments,
    }))
    .catch(err => dispatch({
      type: FETCH_COMMENTS_FAILED,
      err,
    }));
}
