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

const initialState = {
  recents : [],
  byPost  : {},
  shownForPost:[],
  saving : false
};

export default function comments(state = initialState, action) {
  switch (action.type) {
    case COM_SHOW_BYPOST:
      state.shownForPost = [...state.shownForPost, action.payload.postId];
      return state;

    case COM_HIDE_BYPOST:
      state.shownForPost = state.shownForPost.filter(p => p !== action.payload.postId);
      return state;

    case COM_SAVE_PENDING:
      return {...state, saving:true};

    case COM_SAVE_FULFILLED:
      let com    = action.payload.body;
      let postId = com.post;
      return {
        saving:false,
        byPost:{
          ...state.byPost,
          [postId]: [...state.byPost[postId], com]
        },
        recents:[...state.recents, com]
      };

    case COM_LOAD_BYPOST_FULFILLED:      // parses our header "posts 30-40/2000"
      return {...state,
          byPost:{...state.byPost,
            [action.meta.postId]:action.payload.body}
      };

    default:
      return state;
  }
}

