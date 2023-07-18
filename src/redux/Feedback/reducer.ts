import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Alert } from "./types";

interface AlertState {
  alerts: Alert[];
  open: boolean;
}

const initialState: AlertState = {
  alerts: [],
  open: false,
}

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<Alert>) => {
      // console.log("Active addAlert function");
      // console.log("action",action.payload);
      state.alerts.push(action.payload);
      state.open = true;
      // console.log("state.alerts",state.alerts);
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      // console.log("Active removeAlert function");
      const index = state.alerts.findIndex(alert => alert.message === action.payload);
      if (index !== -1) {
        state.alerts.splice(index, 1);
      }
    },
    closeSnackbar: (state) => {
      // console.log("Active closeSnackbar function");
      state.open = false;
    },
  }
})

export const { addAlert, removeAlert, closeSnackbar } = alertSlice.actions;
export default alertSlice.reducer;
