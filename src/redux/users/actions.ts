import { createAction } from "@reduxjs/toolkit";
import { User } from "./types";


export const fetchUserRequest = createAction('user/fetchUsersRequest');
export const fetchUserSuccess = createAction<User[]>('user/fetchUserSuccess');
export const  fetchUserFailure = createAction('user/fetchUserFailure');
