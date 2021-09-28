export function newBaselineRequest(data) {
  return {
    type: '@user/NEW_BASELINE_REQUEST',
    payload: { data },
  };
}

export function newStudentBaselineRequest(data) {
  return {
    type: '@user/NEW_STUDENT_BASELINE_REQUEST',
    payload: { data },
  };
}


export function newResponsibleBaselineRequest(responsible) {
  return {
    type: '@user/NEW_RESPONSIBLE_BASELINE_REQUEST',
    payload: { responsible }
  }
}


export function newBaselineSuccess(baseline) {
  return {
    type: '@user/NEW_BASELINE_SUCCESS',
    payload: { baseline },
  };
}

export function newResponsibleBaselineSuccess(baseline) {
  return {
    type: '@user/NEW_BASELINE_SUCCESS',
    payload: { baseline },
  };
}

export function newStudentBaselineSuccess(baseline) {
  return {
    type: '@user/NEW_BASELINE_SUCCESS',
    payload: { baseline },
  };
}

export function newBaselineFailure() {
  return {
    type: '@user/NEW_BASELINE_FAILURE',
  };
}

export function newResponsibleBaselineFailure() {
  return {
    type: '@user/NEW_BASELINE_FAILURE',
  };
}


export function newStudentBaselineFailure() {
  return {
    type: '@user/NEW_BASELINE_FAILURE',
  };
}

export function updateUserRequest(user) {
  return {
    type: '@user/UPDATE_USER_REQUEST',
    payload: { user },
  };
}

export function updateUserSuccess(profile) {
  return {
    type: '@user/UPDATE_USER_SUCCESS',
    payload: { profile },
  };
}

export function updateUserFailure() {
  return {
    type: '@user/UPDATE_USER_FAILURE',
  };
}
