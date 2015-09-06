import {
  POST_LOAD_PAGE_PENDING,
  POST_LOAD_PAGE_FULFILLED,
  POST_LOAD_PAGE_REJECTED,
  POST_LOAD_BYID_PENDING,
  POST_LOAD_BYID_FULFILLED,
  POST_LOAD_BYID_REJECTED
} from '../constants/ActionTypes';

const initialState = {
  list    : [],
  byId    : {},
  nbPages : 0,
  range   : [0, 0],
  pending : false
};

export default function posts(state = initialState, action) {

  switch (action.type) {

    case POST_LOAD_PAGE_PENDING:
      return {...state, pending:true};

    case POST_LOAD_PAGE_FULFILLED:      // parses our header "posts 30-40/2000"

      console.warn('cleanup here', action);

      let [range, count] = action.payload.headers['content-range'].replace('posts ', '').split('/');
      range = range.split('-').map(v=>parseInt(v));

      // @TODO : won't work for the last page, need to wrap the returned promise
      let nbPerPage = range[1] - range[0];
      let newPostsById = {};
      action.payload.body.forEach(post => {
        newPostsById[post._id] = post;
      });
      return {
        count: parseInt(count),
        pending: false,
        nbPages: parseInt(count / nbPerPage),
        range: range,
        byId: {...state.byId, ...newPostsById},
        list: action.payload.body
      };

    case POST_LOAD_BYID_FULFILLED:
      let post = action.payload.body;
      state.byId[post._id] = post;
      return {...state, byId:{...state.byId}};
    default:
      return state;
  }
}

