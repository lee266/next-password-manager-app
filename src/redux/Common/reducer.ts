import { createSlice } from "@reduxjs/toolkit";

interface commonState {
  openSettingDialog: boolean
  sideBarPosition: "left" | "right"
  openNavigation: boolean
}

const initialState: commonState = {
  openSettingDialog: false,
  sideBarPosition: "left",
  openNavigation: false,
}

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    openSettingDialog: (state) => { state.openSettingDialog = true; },
    closeSettingDialog: (state) => { state.openSettingDialog = false; },
    setSideBarPosition: (state, actions) => {state.sideBarPosition = actions.payload},
    toggleNavigation: (state) => { state.openNavigation = !state.openNavigation},
  }
})

export const {
  openSettingDialog, closeSettingDialog,
  toggleNavigation,
  setSideBarPosition,
} = commonSlice.actions;

export default commonSlice.reducer;
