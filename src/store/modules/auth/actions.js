export function kcSignInRequest() {
  return {
    type: '@auth/KC_SIGN_IN_REQUEST',
  };
}

// export function kcSignInSuccess() {
//   return {
//     type: '@auth/KC_SIGN_IN_SUCCESS',
//   };
// }

// export function kcSignInFailure() {
//   return {
//     type: '@auth/KC_SIGN_IN_FAILURE',
//   };
// }

export function kcSignOut() {
  return {
    type: '@auth/KC_SIGN_OUT',
  };
}

export function kcOnAuth() {
  return {
    type: '@auth/KC_ON_AUTH',
  };
}

export function UpdateStore(user) {
  return {
    type: '@auth/UPDATE_STORE',
    payload: { user },
  };
}

export function cleanStore() {
  return {
    type: '@auth/CLEAN_STORE',
  };
}
