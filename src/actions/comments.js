const API_URL = process.env.REACT_APP_API_URL;

export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILED = 'FETCH_COMMENTS_FAILED';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILED = 'ADD_COMMENT_FAILED';

export const fetchComments = () => dispatch => {
  return fetch(`${API_URL}/comments`)
    .then(r => r.json())
    .then(comments => dispatch({ type: FETCH_COMMENTS_SUCCESS, comments }))
    .catch(err => dispatch({ type: FETCH_COMMENTS_FAILED, err }));
}

export const addComment = (comment) => dispatch => {
  const body = JSON.stringify(comment);
  const headers = { 'Content-Type': 'application/json' };
  return fetch(`${API_URL}/comments`, { method: 'POST', body, headers })
    .then(r => r.json())
    .then(comment => dispatch({ type: ADD_COMMENT_SUCCESS, comment }))
    .catch(err => dispatch({ type: ADD_COMMENT_FAILED, err }));
}
