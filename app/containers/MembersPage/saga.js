import { takeLatest, put } from 'redux-saga/effects';
import request from 'utils/request';
import config from 'config';

import { LOAD_MEMBERS_ACTION } from './constants';
import { loadMembersSuccessAction } from './actions';

const { endpointHost } = config;

function* loadMembers(action) {
  try {
    const requestURL = `${endpointHost}/svc/v1/controller/members`;
    const members = yield request(requestURL);
    yield put(loadMembersSuccessAction(members));
    action.resolve();
  } catch (error) {
    action.reject(error);
  }
}

export default function* membersPageSaga() {
  yield takeLatest(LOAD_MEMBERS_ACTION, loadMembers);
}
