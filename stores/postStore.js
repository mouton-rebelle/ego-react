
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

    default:
      return state;
  }
}
