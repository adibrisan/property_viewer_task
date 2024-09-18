import { useState } from 'react';
import ReactMapGL, { Marker, ViewStateChangeEvent } from 'react-map-gl';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { HomeFilled } from '@ant-design/icons';

import { RootState } from '../../store';
import { setBuildingById } from '../../features/buildingsSlice';
import { showBuildingModal } from '../../features/modalSlice';

import styles from './BuildingsMap.style.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapDisplay = () => {
  const dispatch = useDispatch();
  const buildings = useSelector(
    (state: RootState) => state.buildingsReducer.buildings
  );

  const [viewState, setViewState] = useState({
    latitude: 45.760696,
    longitude: 21.226788,
    zoom: 10,
  });

  return (
    <ReactMapGL
      {...viewState}
      onMove={(event: ViewStateChangeEvent) => setViewState(event.viewState)}
      style={{
        width: '100%',
        height: '100vh',
      }}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/adrianbrisan/cm16fsas2020b01qu9lyv01ar"
    >
      {buildings.map(building => (
        <Marker
          key={building.id}
          latitude={building.coordinates.latitude}
          longitude={building.coordinates.longitude}
        >
          <Button
            className={styles.markerBtn}
            style={{ backgroundColor: 'transparent', border: 'none' }}
            onClick={() => {
              dispatch(showBuildingModal());
              dispatch(setBuildingById(building.id));
            }}
            icon={
              <HomeFilled
                style={{ fontSize: '26px', color: `${building.color}` }}
              />
            }
          />
        </Marker>
      ))}
    </ReactMapGL>
  );
};

export default MapDisplay;
