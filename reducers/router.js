import { routerStateReducer } from 'redux-react-router';

export default function router(state = {}, action) {
  return {
    router: routerStateReducer(state.router, action)
  };

}

