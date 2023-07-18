import { PayloadAction } from "@reduxjs/toolkit";
import { getUser } from "api/users/crud";
import { call, put, takeLatest } from "redux-saga/effects";
import { logoutCookies, saveCookie } from "utils/auth";
import { clearUser, fetchUserDataRequest, loginError, loginSuccess } from "./reducer";
import { User } from "./types";

function* loginUserSaga(action: PayloadAction<User>):Generator<any, any, any> {
  // console.log("Active loginUserSaga function");
  // console.log('action', action);
  const token = action.payload.token;
  try {
    // Data is string if getUser success
    const response = yield call(getUser,token);
    // console.log('response',response);
    yield put(loginSuccess(response));
    // User information save to cookie 
    saveCookie(JSON.stringify(response));
  }catch(error){
    if (error instanceof Error) {
      yield put(loginError(error.message))
    }else if(typeof error === 'string') {
      yield put(loginError(error))
    }else{
      yield put(loginError('unexpected error'))
    }
  }
}

function* logoutSaga() {
  logoutCookies();
}

export function* userSaga() {
  yield takeLatest(clearUser.type,logoutSaga);
  yield takeLatest(fetchUserDataRequest.type, loginUserSaga);
}