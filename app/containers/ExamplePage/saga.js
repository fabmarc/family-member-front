import { takeEvery, delay, put } from 'redux-saga/effects';
import { defaultSuccessAction } from './actions';
import { DEFAULT_ACTION } from './constants';

function* execDefaultAction(action) {
  try {
    yield delay(Math.random() * 5000);
    if (Math.random() < 0.5) throw new Error('Error');
    yield put(defaultSuccessAction());
    action.resolve();
  } catch (error) {
    action.reject(error);
  }
}

export default function* homePageSaga() {
  yield takeEvery(DEFAULT_ACTION, execDefaultAction);
}
