import request from 'superagent-bluebird-promise';
import {
  COM_SAVE_PENDING,
  COM_SAVE_FULFILLED,
  COM_SAVE_REJECTED,
  COM_LOAD_BYPOST_PENDING,
  COM_LOAD_BYPOST_FULFILLED,
  COM_LOAD_BYPOST_REJECTED,
  COM_HIDE_BYPOST,
  COM_SHOW_BYPOST,
  COM_LOAD_RECENT_PENDING,
  COM_LOAD_RECENT_FULFILLED,
  COM_LOAD_RECENT_REJECTED
} from '../constants/ActionTypes';

const baseUrl = `http://${window.location.hostname}:8080/api/comments`;

export const showCommentsForPost = function(postId) {
  return {
    type: COM_SHOW_BYPOST,
    payload: {
      postId: postId
    }
  };
};

export const hideCommentsForPost = function(postId) {
  return {
    type: COM_HIDE_BYPOST,
    payload: {
      postId: postId
    }
  };
};

export const getCommentsForPost = function (postId) {
  return {
    types: [
      COM_LOAD_BYPOST_PENDING,
      COM_LOAD_BYPOST_FULFILLED,
      COM_LOAD_BYPOST_REJECTED
    ],
    meta: {
      postId: postId
    },
    payload: {
      promise: request(`${baseUrl}/post/${postId}`).promise()
    }
  };
};

export const saveComment = function (comment) {
  return {
    types: [
      COM_SAVE_PENDING,
      COM_SAVE_FULFILLED,
      COM_SAVE_REJECTED
    ],
    payload: {
      promise: request.post(`${baseUrl}`).send(comment).promise()
    }
  };
};
