const API_URL = process.env.REACT_APP_API_URL;

export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILED = 'ADD_POST_FAILED';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILED = 'FETCH_POSTS_FAILED';

export const fetchPosts = () => dispatch => {
  fetch(`${API_URL}/posts`)
    .then(r => r.json())
    .then(posts => dispatch({ type: FETCH_POSTS_SUCCESS, posts }))
    .catch(err => dispatch({ type: FETCH_POSTS_FAILED, err }));
}

export const addPost = (post) => dispatch => {
  const body = JSON.stringify(post);
  const headers = { 'Content-Type': 'application/json' };
  fetch(`${API_URL}/posts`, { method: 'POST', body, headers })
    .then(r => r.json())
    .then(post => dispatch({ type: ADD_POST_SUCCESS, post }))
    .catch(err => dispatch({ type: ADD_POST_FAILED, err }));
}
