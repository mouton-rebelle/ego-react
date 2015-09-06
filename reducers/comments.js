import {
  COM_SAVE_PENDING,
  COM_SAVE_FULFILLED,
  COM_SAVE_REJECTED,
  COM_LOAD_BYPOST_PENDING,
  COM_LOAD_BYPOST_FULFILLED,
  COM_LOAD_BYPOST_REJECTED,
  COM_LOAD_RECENT_PENDING,
  COM_LOAD_RECENT_FULFILLED,
  COM_LOAD_RECENT_REJECTED
} from '../constants/ActionTypes';

const initialState = {
  byId    : {},
  recents : [],
  byPost  : {},
  saving : false
};

export default function comments(state = initialState, action) {
  switch (action.type) {
    case COM_SAVE_PENDING:
      return {...state, saving:true};
    case COM_LOAD_BYPOST_FULFILLED:      // parses our header "posts 30-40/2000"
      return {...state,
          byPost:{...state.byPost,
            [action.meta.postId]:action.payload.body}
      };
    default:
      return state;
  }
}

