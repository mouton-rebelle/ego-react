import request from 'superagent-bluebird-promise';
import { POST_LOAD_PAGE_PENDING, POST_LOAD_PAGE_FULFILLED, POST_LOAD_PAGE_REJECTED } from '../constants/ActionTypes';

function shouldFetchPost(state, postId) {
  const post = state.postsById && state.postsById[postId];
  // if (!posts) {
  //   return true;
  // } else if (posts.isFetching) {
  //   return false;
  // } else {
  //   return posts.didInvalidate;
  // }
  return !post;
}

export const postLoadPage = function (page, nbPerPage) {
  let range = [(page - 1) * nbPerPage, page * nbPerPage];
  return {
    types: [
      POST_LOAD_PAGE_PENDING,
      POST_LOAD_PAGE_FULFILLED,
      POST_LOAD_PAGE_REJECTED
    ],
    payload: request('http://localhost:8080/api/posts').set('range', range.join('-')).promise()
  };
};

export const fetchPostIfNeeded = function (postId) {
  return (dispatch, getState) => {
    if (shouldFetchPost(getState(), postId)) {
      return dispatch(fetchPost(postId));
    }
  }
};