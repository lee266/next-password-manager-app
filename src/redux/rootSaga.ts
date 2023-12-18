import { all } from 'redux-saga/effects';
import { userSaga } from './users/saga';

export default function* rootSaga() {
  yield all([
    // Add function of sage file
    userSaga(),
  ]);
}
