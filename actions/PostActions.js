import request from 'superagent-bluebird-promise';
import { POST_LOAD_PAGE_PENDING, POST_LOAD_PAGE_FULFILLED, POST_LOAD_PAGE_REJECTED } from '../constants/ActionTypes';
export const postLoadPage = function (page) {
  let range = [(page - 1) * 10, page * 10];
  return {
    types: [
      POST_LOAD_PAGE_PENDING,
      POST_LOAD_PAGE_FULFILLED,
      POST_LOAD_PAGE_REJECTED
    ],
    payload: request('http://localhost:8080/api/posts').set('range', range.join('-')).promise()
  };
};


