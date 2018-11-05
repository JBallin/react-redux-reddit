const API_URL = process.env.REACT_APP_API_URL;

export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILED = 'ADD_POST_FAILED';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILED = 'FETCH_POSTS_FAILED';
export const UPVOTE = 'UPVOTE';
export const DOWNVOTE = 'DOWNVOTE';

export const fetchPosts = () => dispatch => {
  return fetch(`${API_URL}/posts`)
    .then(r => r.json())
    .then(posts => dispatch({ type: FETCH_POSTS_SUCCESS, posts }))
    .catch(err => dispatch({ type: FETCH_POSTS_FAILED, err }));
}

export const addPost = (post) => dispatch => {
  const body = JSON.stringify(post);
  const headers = { 'Content-Type': 'application/json' };
  return fetch(`${API_URL}/posts`, { method: 'POST', body, headers })
    .then(r => r.json())
    .then(post => dispatch({ type: ADD_POST_SUCCESS, post }))
    .catch(err => dispatch({ type: ADD_POST_FAILED, err }));
}

export const upVote = (postId) => dispatch => {
  return fetch(`${API_URL}/posts/votes/increase/${postId}`)
    .then(r => r.json())
    .then(post => dispatch({ type: UPVOTE, post }))
}

export const downVote = (postId) => dispatch => {
  return fetch(`${API_URL}/posts/votes/decrease/${postId}`)
    .then(r => r.json())
    .then(post => dispatch({ type: DOWNVOTE, post }))
}
