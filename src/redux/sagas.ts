import { all } from 'redux-saga/effects';
import { watchIncrementAsync } from './sages/counterSage';

export default function* rootSaga() {
  yield all([watchIncrementAsync()]);
}