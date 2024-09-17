import { useState } from 'react';
import ReactMapGL, { Marker, ViewStateChangeEvent } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'antd';
import { HomeFilled } from '@ant-design/icons';

import { RootState } from '../store';

import BuildingForm from './BuildingForm';

import 'mapbox-gl/dist/mapbox-gl.css';

const MapDisplay = () => {
  const buildings = useSelector(
    (state: RootState) => state.buildingsReducer.buildings
  );
  const [viewState, setViewState] = useState({
    latitude: 45.760696,
    longitude: 21.226788,
    zoom: 10,
  });
  const [isOpenBuildingModal, setIsOpenBuildingModal] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<building>();

  return (
    <ReactMapGL
      {...viewState}
      onMove={(event: ViewStateChangeEvent) => setViewState(event.viewState)}
      style={{ width: '100%', height: '100vh' }}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/adrianbrisan/cm16fsas2020b01qu9lyv01ar"
    >
      {buildings.map(building => (
        <Marker
          key={building.id}
          latitude={building.coordinates.latitude}
          longitude={building.coordinates.longitude}
          offset={[0, -10]}
        >
          <Button
            onClick={() => {
              setIsOpenBuildingModal(true);
              setSelectedBuilding(building);
            }}
            style={{
              background: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: 0,
              height: 'auto',
              lineHeight: 'normal',
              fontSize: 'inherit',
              color: `black`,
              cursor: 'pointer',
            }}
            icon={
              <HomeFilled
                style={{ fontSize: '26px', color: `${building.color}` }}
              />
            }
          />
        </Marker>
      ))}
      <Modal
        open={isOpenBuildingModal}
        onCancel={() => setIsOpenBuildingModal(false)}
        width="90%"
        footer={null}
        destroyOnClose={true}
        style={{ maxWidth: '600px' }}
      >
        <BuildingForm
          selectedBuilding={selectedBuilding}
          setOpen={setIsOpenBuildingModal}
        />
      </Modal>
    </ReactMapGL>
  );
};

export default MapDisplay;
