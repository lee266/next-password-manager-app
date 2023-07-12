import { createSlice } from "@reduxjs/toolkit";

interface passwordManageState {
  passwords: null
  isLoading: boolean
  tableHeader: object
  openAddDialog: boolean
  openGroupDialog: boolean
  openTagDialog: boolean
  passwordTitles: string[]
  groups: string[]
  tags: string[]
}

const initialState: passwordManageState = {
  passwords: null,
  isLoading: false,
  tableHeader: ["title", ""],
  openAddDialog: false,
  openGroupDialog: false,
  openTagDialog: false,
  passwordTitles: [],
  groups: [],
  tags: []
}

const passwordManageSlice = createSlice({
  name: 'passwordManage',
  initialState,
  reducers: {
    openAddDialog: (state) => {
      state.openAddDialog = true
    },
    closeAddDialog: (state) => {
      state.openAddDialog = false
    },
    openGroupDialog: (state) => {
      state.openGroupDialog = true
    },
    closeGroupDialog: (state) => {
      state.openGroupDialog = false
    },
    openTagDialog: (state) => {
      state.openTagDialog = true
    },
    closeTagDialog: (state) => {
      state.openTagDialog = false
    },
    addPassword: (state, action) => {
      state.passwordTitles.push(action.payload);
    },
    addGroup: (state, action) => {
      state.groups.push(action.payload);
    },
    addTag: (state, action) => {
      state.tags.push(action.payload);
    },
  }
})

export const { 
  openAddDialog, closeAddDialog, 
  openGroupDialog, closeGroupDialog,
  openTagDialog, closeTagDialog,
  addPassword, addGroup, addTag
} = passwordManageSlice.actions;

export default passwordManageSlice.reducer;
