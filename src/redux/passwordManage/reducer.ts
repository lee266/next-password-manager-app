import { createSlice } from "@reduxjs/toolkit";
import { Password, PasswordTag } from "types/models/Password";

interface PasswordWithNonNullID extends Omit<Password, 'id'> {
  id: number;
}

type GetPasswordTag = Omit<PasswordTag, '_id'> & { id: number };

interface passwordManageState {
  passwords: null
  passwordDelete: boolean
  passwordUpdate: boolean
  passwordMove: boolean
  tagUpdate: boolean
  isLoading: boolean
  tableHeader: object
  passwordTitles: string[]
  groups: string[]
  tags: GetPasswordTag[]
  selectedPassword: PasswordWithNonNullID | null;
  openAddDialog: boolean
  openDetailDialog: boolean
  openGroupDialog: boolean
  openTagDialog: boolean
  openSearchDialog: boolean
  openDeleteTagDialog: boolean
  openPlusButtonMenu: boolean
  openMinusButtonMenu: boolean
}

const initialState: passwordManageState = {
  passwords: null,
  passwordDelete: false,
  passwordUpdate: false,
  passwordMove: false,
  tagUpdate: true,
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
  openSearchDialog: false,
  openDeleteTagDialog: false,
  openPlusButtonMenu: false,
  openMinusButtonMenu: false,
}

const passwordManageSlice = createSlice({
  name: 'passwordManage',
  initialState,
  reducers: {
    addPassword: (state, action) => { state.passwordTitles.push(action.payload);},
    addGroup: (state, action) => { state.groups.push(action.payload);},
    addTags: (state, action) => {state.tags = action.payload},
    openAddDialog: (state) => { state.openAddDialog = true; },
    closeAddDialog: (state) => { state.openAddDialog = false; },
    openDetailDialog: (state, action) => {
      state.openDetailDialog = true;
      state.selectedPassword = action.payload;
    },
    closeDetailDialog: (state) => {
      state.openDetailDialog = false;
      state.selectedPassword = null;
    },
    openGroupDialog: (state) => { state.openGroupDialog = true; },
    closeGroupDialog: (state) => { state.openGroupDialog = false; },
    openTagDialog: (state) => { state.openTagDialog = true; },
    closeTagDialog: (state) => { state.openTagDialog = false; },
    openSearchDialog: (state) => { state.openSearchDialog = true; },
    closeSearchDialog: (state) => { state.openSearchDialog = false; },
    openDeleteTagDialog: (state) => { state.openDeleteTagDialog = true; },
    closeDeleteTagDialog: (state) => { state.openDeleteTagDialog = false; },
    openPlusButtonMenu: (state) => {state.openPlusButtonMenu = true; },
    closePlusButtonMenu: (state) => {state.openPlusButtonMenu = false; },
    openMinusButtonMenu: (state) => {state.openMinusButtonMenu = true; },
    closeMinusButtonMenu: (state) => {state.openMinusButtonMenu = false; },
    deleteSelectedPassword: (state, action) => { state.passwordDelete = action.payload; },
    updateSelectedPassword: (state, action) => { state.passwordUpdate = action.payload; },
    movePassword: (state, action) => { state.passwordMove = action.payload; },
    updateTag: (state, action) => { state.tagUpdate = action.payload; },
  }
})

export const { 
  addPassword, addGroup,
  addTags, 
  openAddDialog, closeAddDialog,
  openDetailDialog, closeDetailDialog, 
  openGroupDialog, closeGroupDialog,
  openTagDialog, closeTagDialog,
  openSearchDialog, closeSearchDialog,
  openDeleteTagDialog, closeDeleteTagDialog,
  openPlusButtonMenu, closePlusButtonMenu, 
  openMinusButtonMenu, closeMinusButtonMenu,
  deleteSelectedPassword, updateSelectedPassword, movePassword, updateTag,
} = passwordManageSlice.actions;

export default passwordManageSlice.reducer;