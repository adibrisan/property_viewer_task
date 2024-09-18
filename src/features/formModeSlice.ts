import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormModeState {
  isEditMode: boolean;
}

const initialState: FormModeState = {
  isEditMode: true,
};

const formModeSlice = createSlice({
  name: 'buildingFormMode',
  initialState,
  reducers: {
    setEditFormMode: (state, action: PayloadAction<boolean>) => {
      state.isEditMode = action.payload;
    },
  },
});

export const { setEditFormMode } = formModeSlice.actions;
export default formModeSlice.reducer;
