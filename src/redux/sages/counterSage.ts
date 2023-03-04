import { takeEvery, put, delay } from 'redux-saga/effects';
import { incrementAsync, increment } from '../actions/counterActions';

export function* incrementAsyncWorker() {
  yield delay(1000);
  yield put(increment());
}

export function* watchIncrementAsync() {
  yield takeEvery(incrementAsync.type, incrementAsyncWorker);
}