import produce from 'immer';

const INICIAL_STATE = {
  profile: null,
  loading: false,
};

export default function User(state = INICIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        const { user } = action.payload;
        draft.profile = user;
        break;
      }
      case '@auth/UPDATE_STORE': {
        const { user } = action.payload;
        draft.profile = user.profile;
        break;
      }
      case '@auth/CLEAN_STORE': {
        draft.profile = null;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.profile = null;
        break;
      }
      case '@user/NEW_BASELINE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@user/NEW_BASELINE_SUCCESS': {
        const { baseline } = action.payload;
        draft.profile.baseline = baseline;
        draft.loading = false;
        break;
      }
      case '@user/NEW_BASELINE_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@user/NEW_RESPONSIBLE_BASELINE_REQUEST': {
        draft.laoding = true;
        break
      }
      case '@user/NEW_RESPONSIBLE_BASELINE_SUCCESS': {
        const { responsible } = action.payload;
        draft.profile.responsible = responsible;
        draft.loading = false;
        break
      }
      case '@user/UPDATE_USER_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@user/UPDATE_USER_SUCCESS': {
        const { profile } = action.payload;
        draft.profile = profile;
        draft.loading = false;
        break;
      }
      case '@user/UPDATE_USER_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
