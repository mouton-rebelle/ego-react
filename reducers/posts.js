import { samplePosts } from '../models/sample.js';
import { POST_LOAD_PAGE_PENDING, POST_LOAD_PAGE_FULFILLED, POST_LOAD_PAGE_REJECTED } from '../constants/ActionTypes';

const initialState = {
  list: samplePosts,
  nbPages: 250
};
export default function posts(state = initialState, action) {
  switch (action.type) {
    case POST_LOAD_PAGE_FULFILLED:
      // parses our header "posts 30-40/2000"
      let [range, count] = action.payload.headers['content-range'].replace('posts ', '').split('/');
      range = range.split('-').map(v=>parseInt(v));

      // @TODO : won't work for the last page, need to wrap the returned promise
      let nbPerPage = range[1] - range[0];

      return {
        count: parseInt(count),
        nbPages: parseInt(count / nbPerPage),
        range: range,
        list: action.payload.body
      };
    default:
      return state;
  }
}

