import {createAction} from 'redux-actions';
import request from 'superagent-bluebird-promise';

export const postLoadRange = function (range) {
  return {
    types: [
      'POST_LOAD_RANGE_PENDING',
      'POST_LOAD_RANGE_FULFILLED',
      'POST_LOAD_RANGE_REJECTED'
    ],
    payload: request('http://localhost:8080/api/posts').set('range',range.join('-')).promise()
  };
};
export const postRemove    = createAction('POST_REMOVE');


