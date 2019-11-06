import { takeLatest, put, delay } from 'redux-saga/effects';

import { LOAD_MEMBERS_ACTION } from './constants';
import { loadMembersSuccessAction } from './actions';
import { members, pagination } from './members.json';

function* loadMembers(action) {
  try {
    yield delay(Math.random() * 5000);
    if (Math.random() < 0.5) throw new Error('Error');
    yield put(loadMembersSuccessAction(members, pagination));
    action.resolve();
  } catch (error) {
    action.reject(error);
  }
}

export default function* membersPageSaga() {
  yield takeLatest(LOAD_MEMBERS_ACTION, loadMembers);
}
