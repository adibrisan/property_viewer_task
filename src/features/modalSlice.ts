import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'buildingModal',
  initialState,
  reducers: {
    showBuildingModal: state => {
      state.isOpen = true;
    },
    closeBuildingModal: state => {
      state.isOpen = false;
    },
  },
});

export const { showBuildingModal, closeBuildingModal } = modalSlice.actions;
export default modalSlice.reducer;
