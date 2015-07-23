
import {samplePosts} from '../models/sample.js';

const initialState = {
  list: samplePosts,
  range: [0, 10],
  count: 4000
};

export  function posts(state = initialState, action) {
  switch (action.type) {
    case 'POST_REMOVE':

      let res = [...state.list];
      res.splice(action.payload, 1);

      return {
        ...state,
        list: res
      };
    case 'POST_LOAD_RANGE_FULFILLED':
      // parses our header "posts 30-40/2000"
      let [range, count] = action.payload.headers['content-range'].replace('posts ','').split('/');

      return {
        count: parseInt(count),
        range: range.split('-').map(v=>parseInt(v)),
        list: action.payload.body
      };
    default:
      return state;
  }
}

