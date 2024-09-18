import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import mockedBuildings from '../data/buildings.json';

interface BuildingsState {
  buildings: building[];
  selectedBuilding?: building;
}

const initialState: BuildingsState = {
  buildings: mockedBuildings,
  selectedBuilding: mockedBuildings[0],
};

export const buildingsSlice = createSlice({
  name: 'buildings',
  initialState,
  reducers: {
    addBuilding: (state, action: PayloadAction<building>) => {
      state.buildings.push(action.payload);
    },
    updateBuilding: (state, action: PayloadAction<building>) => {
      const index = state.buildings.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.buildings[index] = action.payload;
      }
    },
    setBuildingById: (state, action: PayloadAction<number | string>) => {
      const building = state.buildings.find(b => b.id === action.payload);
      if (building) {
        state.selectedBuilding = building;
      }
    },
  },
});

export const { addBuilding, updateBuilding, setBuildingById } =
  buildingsSlice.actions;
export default buildingsSlice.reducer;
