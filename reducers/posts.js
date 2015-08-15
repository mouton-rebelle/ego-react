import { samplePosts } from '../models/sample.js';
import { POST_LOAD_PAGE_PENDING, POST_LOAD_PAGE_FULFILLED, POST_LOAD_PAGE_REJECTED } from '../constants/ActionTypes';

const initialState = {
  list: samplePosts,
  nbPages: 250
};
export default function posts(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case 'POST_REMOVE':

      let res = [...state.list];
      res.splice(action.payload, 1);

      return {
        ...state,
        list: res
      };
    case POST_LOAD_PAGE_FULFILLED:
      // parses our header "posts 30-40/2000"
      let [range, count] = action.payload.headers['content-range'].replace('posts ','').split('/');

      return {
        count: parseInt(count),
        nbPages: parseInt(count/10),
        range: range.split('-').map(v=>parseInt(v)),
        list: action.payload.body
      };
    default:
      return state;
  }
}

