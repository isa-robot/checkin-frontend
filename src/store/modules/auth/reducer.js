import produce from 'immer';

const INICIAL_STATE = {
  loading: false,
};

export default function auth(state = INICIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/KC_SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/KC_SIGN_IN_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@auth/KC_SIGN_OUT': {
        draft.loading = true;
        break;
      }
      case '@auth/CLEAN_STORE': {
        draft.loading = false;
        break;
      }
      case '@auth/KC_ON_AUTH': {
        draft.loading = true;
        break;
      }
      case '@auth/UPDATE_STORE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
