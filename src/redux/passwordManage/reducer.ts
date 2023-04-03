import { createSlice } from "@reduxjs/toolkit";

interface passwordManageState {
  passwords: null
  isLoading: boolean
  tableHeader: object
  openAddDialog: boolean
}

const initialState: passwordManageState = {
  passwords: null,
  isLoading: false,
  tableHeader: ["title", ""],
  openAddDialog: false,
}

const passwordManageSlice = createSlice({
  name: 'passwordManage',
  initialState,
  reducers: {
    OpenAddDialog: (state) => {
      state.openAddDialog = state.openAddDialog ? false : true
    }
  }
})

export const { OpenAddDialog } = passwordManageSlice.actions;
export default passwordManageSlice.reducer;
