import { createSlice } from "@reduxjs/toolkit";

interface commonState {
  openSettingDialog: boolean
  openNavigation: boolean
  openProfileDialog: boolean
  sideBarPosition: "left" | "right"
}

const initialState: commonState = {
  openSettingDialog: false,
  openNavigation: false,
  openProfileDialog: false,
  sideBarPosition: "left",
}

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    openSettingDialog: (state) => { state.openSettingDialog = true; },
    closeSettingDialog: (state) => { state.openSettingDialog = false; },
    openProfileDialog: (state) => { state.openProfileDialog = true; },
    closeProfileDialog: (state) => { state.openProfileDialog = false; },

    setSideBarPosition: (state, action) => {
      if (state.sideBarPosition !== action.payload) {
        state.sideBarPosition = action.payload;
      }
    },
    toggleNavigation: (state) => { state.openNavigation = !state.openNavigation},
  }
})

export const {
  openSettingDialog, closeSettingDialog,
  openProfileDialog, closeProfileDialog,
  toggleNavigation,
  setSideBarPosition,
} = commonSlice.actions;

export default commonSlice.reducer;
