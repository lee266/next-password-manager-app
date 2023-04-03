import { combineReducers } from "@reduxjs/toolkit";
import  counterReducer  from "./counter/reduser";
import userReducer from "./users/reducer";
import alertReducer from "./Feedback/reducer";
import passwordManageReducer from "./passwordManage/reducer";


export const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  alert: alertReducer,
  passwordManage: passwordManageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
