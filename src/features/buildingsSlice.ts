import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type building = {
  id: number;
  name: string;
  street: string;
  number: string;
  postalCode: string;
  city: string;
  country: string;
  price: number;
  description: string;
  coordinates: { latitude: number; longitude: number };
  color: string;
};

interface BuildingsState {
  buildings: building[];
}

const initialState: BuildingsState = {
  buildings: [],
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
  },
});

export const { addBuilding, updateBuilding } = buildingsSlice.actions;
export default buildingsSlice.reducer;
