import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import mockedBuildings from '../data/buildings.json';

interface BuildingsState {
  buildings: building[];
  filteredBuildings: building[];
  selectedBuilding?: building;
}

const initialState: BuildingsState = {
  buildings: mockedBuildings,
  filteredBuildings: mockedBuildings,
  selectedBuilding: mockedBuildings[0],
};

export const buildingsSlice = createSlice({
  name: 'buildings',
  initialState,
  reducers: {
    addBuilding: (state, action: PayloadAction<building>) => {
      state.buildings.push(action.payload);
      state.filteredBuildings.push(action.payload);
    },
    updateBuilding: (state, action: PayloadAction<building>) => {
      const index = state.buildings.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.buildings[index] = action.payload;
        state.filteredBuildings[index] = action.payload;
      }
    },
    selectBuildingById: (state, action: PayloadAction<number | string>) => {
      const building = state.buildings.find(b => b.id === action.payload);
      if (building) {
        state.selectedBuilding = building;
      }
    },
    filterBuildings: (state, action: PayloadAction<string>) => {
      const searchText = action.payload.toLowerCase();
      if (searchText) {
        state.filteredBuildings = state.buildings.filter(building =>
          building.name.toLowerCase().includes(searchText)
        );
      } else {
        state.filteredBuildings = state.buildings;
      }
    },
  },
});

export const {
  addBuilding,
  updateBuilding,
  selectBuildingById,
  filterBuildings,
} = buildingsSlice.actions;
export default buildingsSlice.reducer;
