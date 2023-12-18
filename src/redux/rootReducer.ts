import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counter/reducer';
import userReducer from './users/reducer';
import alertReducer from './Feedback/reducer';
import passwordManageReducer from './passwordManage/reducer';
import commonReducer from './Common/reducer';

export const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  alert: alertReducer,
  passwordManage: passwordManageReducer,
  common: commonReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
