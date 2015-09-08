import {reducer as formReducer} from 'redux-form';
import {COM_SAVE_FULFILLED} from '../constants/ActionTypes';

export default formReducer.plugin({
  contact: (state, action) => {
    switch(action.type) {
      case COM_SAVE_FULFILLED:
        let postId = action.payload.body.post;
        return {
          ...state,
          [postId]: {
            ...state[postId],
            text: {}
          }
        };
      default:
        return state;
    }
  }
});
