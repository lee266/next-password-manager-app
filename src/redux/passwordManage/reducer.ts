import { createSlice } from "@reduxjs/toolkit";
import { Password } from "types/models/Password";

interface PasswordWithNonNullID extends Omit<Password, 'id'> {
  id: number;
}

interface passwordManageState {
  passwords: null
  passwordDelete: boolean
  passwordUpdate: boolean
  passwordMove: boolean
  isLoading: boolean
  tableHeader: object
  passwordTitles: string[]
  groups: string[]
  tags: string[]
  selectedPassword: PasswordWithNonNullID | null;
  openAddDialog: boolean
  openDetailDialog: boolean
  openGroupDialog: boolean
  openTagDialog: boolean
}

const initialState: passwordManageState = {
  passwords: null,
  passwordDelete: false,
  passwordUpdate: false,
  passwordMove: false,
  isLoading: false,
  tableHeader: ["title", ""],
  passwordTitles: [],
  groups: [],
  tags: [],
  selectedPassword: null,
  openAddDialog: false,
  openDetailDialog: false,
  openGroupDialog: false,
  openTagDialog: false,
}

const passwordManageSlice = createSlice({
  name: 'passwordManage',
  initialState,
  reducers: {
    addPassword: (state, action) => {
      state.passwordTitles.push(action.payload);
    },
    addGroup: (state, action) => {
      state.groups.push(action.payload);
    },
    addTag: (state, action) => {
      state.tags.push(action.payload);
    },
    openAddDialog: (state) => {
      state.openAddDialog = true;
    },
    closeAddDialog: (state) => {
      state.openAddDialog = false;
    },
    openDetailDialog: (state, action) => {
      state.openDetailDialog = true;
      state.selectedPassword = action.payload;
    },
    closeDetailDialog: (state) => {
      state.openDetailDialog = false;
      state.selectedPassword = null;
    },
    openGroupDialog: (state) => {
      state.openGroupDialog = true;
    },
    closeGroupDialog: (state) => {
      state.openGroupDialog = false;
    },
    openTagDialog: (state) => {
      state.openTagDialog = true;
    },
    closeTagDialog: (state) => {
      state.openTagDialog = false;
    },
    deleteSelectedPassword: (state, action) => {
      state.passwordDelete = action.payload;
    },
    updateSelectedPassword: (state, action) => {
      state.passwordUpdate = action.payload;
    },
    movePassword: (state, action) => {
      state.passwordMove = action.payload;
    },
  }
})

export const { 
  addPassword, addGroup, addTag, 
  openAddDialog, closeAddDialog,
  openDetailDialog, closeDetailDialog, 
  openGroupDialog, closeGroupDialog,
  openTagDialog, closeTagDialog,
  deleteSelectedPassword, updateSelectedPassword, movePassword
} = passwordManageSlice.actions;

export default passwordManageSlice.reducer;