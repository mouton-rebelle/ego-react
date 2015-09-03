import request from 'superagent-bluebird-promise';
import { POST_LOAD_PAGE_PENDING, POST_LOAD_PAGE_FULFILLED, POST_LOAD_PAGE_REJECTED,
POST_LOAD_BYID_PENDING, POST_LOAD_BYID_FULFILLED, POST_LOAD_BYID_REJECTED } from '../constants/ActionTypes';

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
    payload: {
      promise: request('http://pro.local:8080/api/posts').set('range', range.join('-')).promise()
    }
  };
};

export const postLoadById = function (id) {
  return {
    types: [
      POST_LOAD_BYID_PENDING,
      POST_LOAD_BYID_FULFILLED,
      POST_LOAD_BYID_REJECTED
    ],
    payload: {
      promise: request(`http://pro.local:8080/api/post/${id}`).promise()
    }
  };
};
