import { configureStore } from '@reduxjs/toolkit';
import buildingsReducer, {
  addBuilding,
  updateBuilding,
  selectBuildingById,
  filterBuildings,
} from '../buildingsSlice';
import mockedBuildings from '../../data/buildings.json';

describe('test the buildingsSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({ reducer: { buildings: buildingsReducer } });
  });

  it('should handle initial state with the provided default values', () => {
    // @ts-ignore
    const state = store.getState().buildings;
    expect(state.buildings).toEqual(mockedBuildings);
    expect(state.filteredBuildings).toEqual(mockedBuildings);
    expect(state.selectedBuilding).toEqual(mockedBuildings[0]);
  });

  it('should handle addBuilding slice feature', () => {
    const newBuilding = {
      id: 999,
      name: 'New Building',
      street: 'New Street',
      number: '5',
      postalCode: '300699',
      city: 'Mocked City',
      country: 'Mocked Country',
      price: 10,
      description: 'A mocked description for a mocked building',
      coordinates: { latitude: 0, longitude: 0 },
      color: '#FF0000',
    };

    store.dispatch(addBuilding(newBuilding));

    // @ts-ignore
    const state = store.getState().buildings;
    expect(state.buildings).toContainEqual(newBuilding);
  });

  it('should handle updateBuilding slice feature', () => {
    const updatedBuilding = {
      ...mockedBuildings[0],
      name: 'Updated Building Name',
    };

    store.dispatch(updateBuilding(updatedBuilding));

    // @ts-ignore
    const state = store.getState().buildings;
    expect(
      state.buildings.find((b: { id: number }) => b.id === updatedBuilding.id)
        ?.name
    ).toBe('Updated Building Name');
  });

  it('should handle selectBuildingById slice feature', () => {
    const buildingId = mockedBuildings[1].id;
    store.dispatch(selectBuildingById(buildingId));

    // @ts-ignore
    const state = store.getState().buildings;
    expect(state.selectedBuilding).toEqual(mockedBuildings[1]);
  });

  it('should handle filterBuildings slice feature', () => {
    const searchText = 'Building Name';
    store.dispatch(filterBuildings(searchText));

    // @ts-ignore
    const state = store.getState().buildings;
    expect(state.filteredBuildings).toEqual(
      mockedBuildings.filter(b =>
        b.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  });

  it('should handle filterBuildings slice feature with empty string', () => {
    store.dispatch(filterBuildings(''));
    // @ts-ignore
    const state = store.getState().buildings;
    expect(state.filteredBuildings).toEqual(mockedBuildings);
  });
});
