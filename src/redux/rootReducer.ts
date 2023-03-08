import { combineReducers } from "@reduxjs/toolkit";
import  counterReducer  from "./counter/reduser";
import userReducer from "./users/reducer";


export const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;