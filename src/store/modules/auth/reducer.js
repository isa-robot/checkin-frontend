import produce from 'immer';

const INICIAL_STATE = {
  // token: null,
  // signed: false,
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
      // case '@auth/KC_SIGN_IN_FAILURE': {
      //   draft.loading = false;
      //   break;
      // }
      // case '@auth/KC_SIGN_OUT_REQUEST': {
      //   draft.loading = true;
      //   break;
      // }
      // case '@auth/KC_SIGN_OUT_SUCCESS': {
      //   draft.token = null;
      //   draft.loading = false;
      //   break;
      // }
      case '@auth/KC_SIGN_OUT': {
        // draft.token = null;
        draft.loading = true;
        break;
      }
      case '@auth/CLEAN_STORE': {
        // draft.token = null;
        // draft.signed = false;
        draft.loading = false;
        break;
      }
      case '@auth/KC_ON_AUTH': {
        draft.loading = true;
        break;
      }
      case '@auth/UPDATE_STORE': {
        // draft.signed = true;
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
