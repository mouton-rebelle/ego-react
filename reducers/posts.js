import {
  POST_LOAD_PAGE_PENDING,
  POST_LOAD_PAGE_FULFILLED,
  POST_LOAD_PAGE_REJECTED,
  POST_LOAD_BYID_PENDING,
  POST_LOAD_BYID_FULFILLED,
  POST_LOAD_BYID_REJECTED,
  COM_SAVE_FULFILLED
} from '../constants/ActionTypes';

const initialState = {
  count   : 0,
  nbPages : 0,
  byId    : {},
  byPage  : {},
  pending : false
};

export default function posts(state = initialState, action) {

  switch (action.type) {

    case COM_SAVE_FULFILLED:
      let com    = action.payload.body;
      let postId = com.post;
      return {
        ...state,
        byId: {
          ...state.byId,
          [postId]:{
            ...state.byId[postId],
            comments: [...state.byId[postId].comments, com._id]
          }
        }
      };

    case POST_LOAD_PAGE_PENDING:
      return {...state, pending:true};

    case POST_LOAD_PAGE_FULFILLED:      // parses our header "posts 30-40/2000"
      let [, count] = action.payload.headers['content-range'].replace('posts ', '').split('/');
      let nbPerPage = action.meta.nbPerPage;
      let newPostsById = {};
      let byPage = [];
      action.payload.body.forEach(post => {
        newPostsById[post._id] = post;
        byPage.push(post._id);
      });
      return {
        count: parseInt(count),
        pending: false,
        nbPages: parseInt(count / nbPerPage),
        byId: {...state.byId, ...newPostsById},
        byPage: {...state.byPage, [action.meta.page]:byPage}
      };

    case POST_LOAD_BYID_FULFILLED:
      let post = action.payload.body;
      state.byId[post._id] = post;
      return {...state, byId:{...state.byId}};
    default:
      return state;
  }
}

