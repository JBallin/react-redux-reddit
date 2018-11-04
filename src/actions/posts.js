const API_URL = process.env.REACT_APP_API_URL;

export const ADD_POST = 'ADD_POST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILED = 'FETCH_POSTS_FAILED';

export const addPost = (post) => dispatch => {
  dispatch({ type: ADD_POST, post });
}

export const fetchPosts = () => dispatch => {
  fetch(`${API_URL}/posts`)
    .then(r => r.json())
    .then(posts => dispatch({
      type: FETCH_POSTS_SUCCESS,
      posts,
    }))
    .catch(err => dispatch({
      type: FETCH_POSTS_FAILED,
      err,
    }));
}
