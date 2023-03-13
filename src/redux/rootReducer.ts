import { combineReducers } from "@reduxjs/toolkit";
import  counterReducer  from "./counter/reduser";
import userReducer from "./users/reducer";
import alertReducer from "./Feedback/reducer";


export const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  alert: alertReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
